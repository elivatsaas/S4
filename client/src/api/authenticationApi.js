import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const authenticationApi = axios.create({
  baseURL:
    "http://ec2-13-52-252-101.us-west-1.compute.amazonaws.com:8080/api/v1",
  withCredentials: true,
});

const authenticationUrlEndpoint = "/auth";

const signup = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  hireDate,
  birthDate,
  payRate,
  password,
  passwordConfirm,
}) => {
  await delay();

  const authResponse = await authenticationApi.post(
    `${authenticationUrlEndpoint}/signup`,
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
      password,
      passwordConfirm,
    }
  );

  return authResponse;
};

const login = async ({ email, password }) => {
  await delay();
  const authResponse = await authenticationApi.post(
    `${authenticationUrlEndpoint}/login`,
    {
      email,
      password,
    }
  );

  return authResponse;
};

const protect = async () => {
  await delay();

  const response = await authenticationApi.get(
    `${authenticationUrlEndpoint}/protect`
  );
  return response.data;
};

const restrictTo = async ({ employee, roleNames }) => {
  await delay();
  const authResponse = await authenticationApi.post(
    `${authenticationUrlEndpoint}/restrictTo`,
    {
      employee,
      roleNames,
    }
  );

  return authResponse;
};

const forgotPassword = async ({ email }) => {
  try {
    await authenticationApi.post(
      `${authenticationUrlEndpoint}/forgotpassword`,
      { email }
    );
    return {
      success: true,
      message: "Password reset email sent successfully.",
    };
  } catch (error) {
    let errorMessage = "Error: Unable to send password reset email.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    return { success: false, message: errorMessage };
  }
};

const resetPassword = async (token, password, passwordConfirm) => {
  await delay();

  const response = await authenticationApi.patch(
    `${authenticationUrlEndpoint}/resetpassword/${token}`,
    { password, passwordConfirm }
  );
  return response.data;
};

const updatePassword = async (
  email,
  oldPassword,
  newPassword,
  newPasswordConfirm
) => {
  await delay();
  const response = await authenticationApi.patch(
    `${authenticationUrlEndpoint}/updatepassword`,
    {
      email,
      oldPassword,
      newPassword,
      newPasswordConfirm,
    }
  );
  return response.data;
};

export {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
};
