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
import { setCookies } from "@/utils/setCookies";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

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

    setIsLoading(true);
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
        dispatch(
          showToastWithTimeout({
            type: "success",
            message: "successfully logged in",
            duration: 6000,
          })
        );
        await setCookies("access_token", response.result.access_token);
        await setCookies("refresh_token", response.result.refresh_token);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full">
      <AuthInput
        id="username"
        label="Username"
        placeholder="Enter your username"
        icon={<IoMailOutline className="w-4 h-4 text-[#606060]" />}
        value={username}
        setValue={setUsername}
        className="mb-5"
      />

      <AuthInput
        id="password"
        iType="password"
        label="Password"
        placeholder="Enter your password"
        icon={<RiLockPasswordLine className="w-4 h-4 text-[#606060]" />}
        value={password}
        setValue={setPassword}
      />
      <Link
        href="#"
        className="block text-end border-2 text-sm text-[#757575] font-semibold mt-1 mb-3"
      >
        Forgot password?
      </Link>
      <button
        className="bg-[#D2D2D2] hover:bg-[#bdbdbd] text-white w-full rounded-full py-2 text-sm font-semibold mb-2 flex items-center justify-center gap-1"
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
      <p className="text-center text-sm text-[#757575]">
        don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
