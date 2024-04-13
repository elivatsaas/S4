const { promisify } = require("util");
const employeeHandler = require("./employeeHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const sendEmail = require("./../utils/email");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const employeeRoleHandlers = require("./employeeRoleHandlers");
const roleHandlers = require("./roleHandlers");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (password != passwordConfirm)
    return next(new AppError("Passwords don't match", 400));
  else {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
    } = req.body;
    const newEmployee = await employeeHandler.createEmployee(
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
      encryptedPassword
    );

    const token = jwt.sign({ id: newEmployee.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        employee: newEmployee,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and/or password", 400));
  }
  //check if user exists, if password is correct
  const employee = await employeeHandler.getEmployeeByEmail(email);

  if (!employee || !(await correctPassword(password, employee.password))) {
    return next(new AppError("Invalid email or password", 401));
  }
  //if everthing is correct, send token to client
  createSendToken(employee, 201, res);
};

// protect function
exports.protect = async (req, res, next) => {
  try {
    // Get the JWT token from the cookie header
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return next(new AppError("You are not logged in", 401));
    }

    // Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Get the employee associated with the token
    const currentUser = await employeeHandler.getEmployee(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user no longer exists", 401));
    }

    // Check if user changed password after JWT was issued
    const passwordChange = await changedPassword(decoded.iat, currentUser);
    if (passwordChange) {
      return next(new AppError("Please re-log in after password change"));
    }

    // Set the employee data on the request object
    req.employee = currentUser;

    // Call the next middleware
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

// restrictTo function
exports.restrictTo = async (req, res, next, ...roleNames) => {
  try {
    // Fetch role_ids for given roleNames
    const roleIds = await Promise.all(
      roleNames.map((roleName) => roleHandlers.getRoleByName(roleName))
    );

    // Check if the user has any of the roles
    const employeeRoles = await employeeHandler.getEmployeeRoles(
      req.body.employee.id
    );

    let userRoleIds = [];
    if (!employeeRoles || employeeRoles.length === 0) {
      return next(new AppError("Employee has no roles", 403));
    }

    // Extract Role_ids
    userRoleIds = employeeRoles.map((role) => role.Role_id);

    // Compare user roles with allowed roles
    const hasPermission = userRoleIds.some((userRoleId) =>
      roleIds.some((role) => role.id === userRoleId)
    );

    if (!hasPermission) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }

    // If the user has permission, continue to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in restrictTo:", error);
    next(new AppError("Internal server error", 500));
  }
};

exports.forgotPassword = catchASync(async (req, res, next) => {
  //get user based on email
  const employee = await employeeHandler.getEmployeeByEmail(req.body.email);
  if (!employee) {
    return next(new AppError("No employee found with that email", 404));
  }
  //generate reset token
  const resetToken = await createPasswordResetToken(employee.id);
  //send back as email
  const resetURL = `${req.protocal}://${req.get(
    "host"
  )}/authentication/password/reset/${resetToken}`;
  const message = `Forgot your password? Reset your password using the url below. \n  
  ${resetURL} \n
  If you didnt forget your password, ignore this message`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "S4 Scheduling Password Reset (expires in 15 minutes)",
      message,
    });
  } catch (err) {
    await employeeHandler.updateEmployeeResets(null, null, employee.id);
    return next(
      new AppError("Email failed to send, please try again later"),
      500
    );
  }

  res.status(200).json({
    status: "success",
    message: "We have e-mailed the password reset link!",
  });
});

exports.resetPassword = catchASync(async (req, res, next) => {
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (password != passwordConfirm)
    return next(new AppError("Passwords don't match", 400));
  // get user from token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //set new password if token has not expire, and user
  const employee = await employeeHandler.getEmployeeByResetToken(hashedToken);
  if (!employee) {
    return next(new AppError("No employee found with that token", 400));
  }
  if (employee.passwordResetExpire < Date.now()) {
    return next(new AppError("Password reset link has expired", 400));
  }
  await employeeHandler.updateEmployeePassword(req.body.password, employee.id);
  //log the user in, send JWT
  createSendToken(employee, 201, res);
});

exports.updatePassword = catchASync(async (req, res, next) => {
  const newPassword = req.body.newPassword;
  const newPasswordConfirm = req.body.newPasswordConfirm;

  if (newPassword != newPasswordConfirm)
    return next(new AppError("Passwords don't match", 400));
  // get user from sql
  const employee = await employeeHandler.getEmployeeByEmail(req.body.email);
  if (!employee) {
    return next(new AppError("No employee found with that email", 404));
  }
  //check if posted password is correct
  if (req.body.oldPassword !== employee.password) {
    return next(new AppError("Old password is incorrect", 400));
  }
  //if password is correct, update
  await employeeHandler.updateEmployeePassword(newPassword, employee.id);

  //log user in with new password
  createSendToken(employee, 201, res);
});

async function createPasswordResetToken(id) {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpire = Date.now() + 15 * 60 * 1000;

  await employeeHandler.updateEmployeeResets(
    passwordResetToken,
    passwordResetExpire,
    id
  );
  return resetToken;
}

async function correctPassword(passToCheck, checkedPass) {
  return await bcrypt.compare(passToCheck, checkedPass);
}

async function changedPassword(JWTTimestamp, employee) {
  const loginTime = new Date(JWTTimestamp * 1000);
  let sqlDate = employee.passwordChanged.toISOString();
  let t = sqlDate.split(/[- T : .]/);

  let employeeTime = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

  if (employeeTime > loginTime) {
    return true;
  }

  return false;
}

const createSendToken = (employee, statusCode, res) => {
  const token = signToken(employee.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      employee,
    },
  });
};
