import { IoMailOutline } from "react-icons/io5";
import AuthInput from "../inputs/AuthInput";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import { openToast } from "@/lib/slices/toastSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsError(false);
      dispatch(
        openToast({
          message: "Login Success",
          type: "success",
          duration: 3000,
        })
      );
    } else {
      setIsError(true);
      dispatch(
        openToast({
          message: "Invalid username or password",
          type: "danger",
          duration: 3000,
        })
      );
    }
  };

  return (
    <form className="w-full">
      <AuthInput
        iId="username"
        iLabel="Username"
        iPlaceholder="Enter your username"
        iIcon={<IoMailOutline className="w-4 h-4 text-[#606060]" />}
        iState={username}
        isError={isError}
        iSetState={setUsername}
        cClass="mb-5"
      />

      <AuthInput
        iId="password"
        iType="password"
        iLabel="Password"
        iPlaceholder="Enter your password"
        iIcon={<RiLockPasswordLine className="w-4 h-4 text-[#606060]" />}
        iState={password}
        isError={isError}
        iSetState={setPassword}
      />
      <Link
        href="#"
        className="block text-end border-2 text-sm text-[#757575] font-semibold mt-1 mb-3"
      >
        Forgot password?
      </Link>
      <button
        className="bg-[#D2D2D2] hover:bg-[#bdbdbd] text-white w-full rounded-full py-2 text-sm font-semibold mb-2"
        onClick={(e) => handleLogin(e)}
      >
        Login
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
