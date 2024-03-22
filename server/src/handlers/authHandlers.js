const { promisify } = require("util");
const employeeHandler = require("./employeeHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

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
  const token = signToken(employee.id);
  res.status(200).json({
    status: "success",
    token,
  });
};

async function correctPassword(passToCheck, checkedPass) {
  return await bcrypt.compare(passToCheck, checkedPass);
}

async function changedPassword(JWTTimestamp, id) {
  if (true === true) {
    console.log(
      await employeeHandler.getEmployeePasswordEdit(id),
      JWTTimestamp
    );
    return true;
  }

  return false;
}
exports.protect = async function (req, res, next) {
  //get token, check if  it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please log in to gain access", 401)
    );
  }

  //const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //req.employee = await employeeHandler.getEmployee(decoded.id);
  //next();

  //validate token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {}
  );
  //check if user exists
  const employeeCheck = await employeeHandler.getEmployee(decoded.id);
  if (!employeeCheck) {
    return next(new AppError("The user no longer exists", 401));
  }
  //check if user changed password after JWT was issued
  changedPassword(token, decoded.id);
  next();
};
