import axios from "axios";

export const loginService = async (username, password) => {
  try {
    const response = await axios.post(
      `https://api-dev.marshall-teach.web.id/marshall/users/auth/login`,
      {
        username,
        password,
      }
    );

    return {
      statusCode: response.status,
      message: response.data.message,
      result: response.data.result,
    };
  } catch (e) {
    return {
      statusCode: e.response?.status || 500,
      message: e.response?.data?.message || e.message,
    };
  }
};

export const registerService = async ({
  fullname,
  username,
  email,
  password,
}) => {
  try {
    const response = await axios.post(
      "https://api-dev.marshall-teach.web.id/marshall/users/auth/register",
      {
        name: fullname,
        username,
        email,
        password,
        type_user: "Basic",
      }
    );

    console.log(response);
    return {
      statusCode: response.status,
      message: response.data.message,
      result: response.data.result,
    };
  } catch (e) {
    return {
      statusCode: e.response?.status || 500,
      message: e.response?.data?.message || e.message,
    };
  }
};
