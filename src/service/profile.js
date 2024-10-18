import { setCookies, getCookies } from "@/utils/cookies";
import axios from "axios";
import Cookies from "js-cookie";

//const apiProfile = `http://192.168.90.26:1111/profile/`;
const apiProfile = `${process.env.NEXT_PUBLIC_NEW_API}/users/profile/`;
const apiAuth = `${process.env.NEXT_PUBLIC_NEW_API}/users/auth`;

const refreshToken = async () => {
  const rtoken = getCookies("refresh_token");
  if (rtoken) {
    try {
      const response = await axios.post(`${apiAuth}/refresh`, {
        refresh_token: rtoken,
      });

      if (response.status === 200) {
        const accessToken = response.data.result.access_token;
        setCookies("access_token", accessToken);
        return accessToken;
      }
    } catch (e) {
      throw new Error(e.response?.data?.message || "Failed to refresh token");
    }
  }
  throw new Error("No refresh token found");
};

export const getProfileService = async (token) => {
  console.log("test");
  try {
    const fetchProfile = async (accessToken) => {
      const response = await axios.get(apiProfile, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("profile");
      console.log(response);
      return response;
    };

    let response = await fetchProfile(token);

    if (response.status === 403) {
      const newToken = await refreshToken();
      response = await fetchProfile(newToken);
    }

    return {
      statusCode: response.status,
      message: response.data.message,
      result: response.data.result,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: e.response?.status || 500,
      message: e.response?.data?.message || e.message,
    };
  }
};
