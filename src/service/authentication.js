import { setCookies } from "@/utils/cookies";
import axios from "axios";
import Cookies from "js-cookie";

const apiUser = `${process.env.NEXT_PUBLIC_NEW_API}/users/auth`;

export const refreshTokenService = async () => {
  try {
    const token = Cookies.get("refresh_token");

    const response = await axios.post(`${apiUser}/refresh`, {
      refresh_token: token,
    });

    if (response.status === 200) {
      const accessToken = response.data.result.access_token;

      await setCookies("access_token", accessToken);
    }
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

export const loginService = async (username, password) => {
  try {
    const response = await axios.post(`${apiUser}/login`, {
      username,
      password,
    });

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
    const response = await axios.post(`${apiUser}/register`, {
      name: fullname,
      username,
      email,
      password,
      type_user: "Basic",
    });

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

export const logoutService = async (token) => {
  try {
    const response = await axios.post(`${apiUser}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

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
