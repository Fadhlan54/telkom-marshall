"use client";

import { IoMailOutline } from "react-icons/io5";
import AuthInput from "../inputs/AuthInput";
import { RiLoader4Fill, RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import { showToastWithTimeout } from "@/lib/slices/toastSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginService } from "@/service/authentication";
import { useRouter } from "next/navigation";
import { setCookies } from "@/utils/cookies";

import { getProfileService } from "@/service/profile";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      dispatch(
        showToastWithTimeout({
          type: "danger",
          message: "Username and password are required",
          duration: 6000,
        })
      );
      return;
    }

    try {
      const response = await loginService(username, password);
      console.log(response);
      if (response.statusCode === 400) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "Incorrect username or password",
            duration: 6000,
          })
        );
        return;
      }
      if (response.statusCode === 404) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "User not found",
            duration: 6000,
          })
        );
        return;
      }
      if (response.statusCode === 201) {
        await setCookies("access_token", response.result.access_token);
        await setCookies("refresh_token", response.result.refresh_token);
        await setCookies("username", username);

        dispatch(
          showToastWithTimeout({
            type: "success",
            message: "successfully logged in",
            duration: 6000,
          })
        );
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full max-w-[26rem]">
      <AuthInput
        id="username"
        label="Username"
        placeholder="Enter your username"
        icon={<IoMailOutline className="w-4 h-4" />}
        value={username}
        setValue={setUsername}
        className="mb-5"
      />

      <AuthInput
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        icon={<RiLockPasswordLine className="w-4 h-4" />}
        value={password}
        setValue={setPassword}
      />
      <div className="flex justify-end">
        <Link
          href="#"
          className=" text-end text-sm text-grey-primary hover:text-grey-secondary font-semibold mt-1 mb-3"
        >
          Forgot password?
        </Link>
      </div>

      <button
        className="bg-primary-1 hover:bg-primary-1-hover text-white w-full rounded-full py-2 text-sm font-semibold mb-2 flex items-center justify-center gap-1"
        onClick={(e) => handleLogin(e)}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <RiLoader4Fill className=" w-5 h-5 animate-spin" /> Loading...
          </>
        ) : (
          "Login"
        )}
      </button>
      <p className="text-center text-sm text-grey-tertiary">
        don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-grey-primary hover:text-grey-secondary"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
