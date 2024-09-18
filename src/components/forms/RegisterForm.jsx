import Link from "next/link";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthInput from "../inputs/AuthInput";
import { IoMailOutline } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openToast, showToastWithTimeout } from "@/lib/slices/toastSlice";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/validation";

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    reset();

    setIsLoading(true);

    try {
      setTimeout(() => {}, 3000);
      if (validateForm()) {
        dispatch(
          openToast({
            message: "Register Successful",
            type: "success",
            duration: 6000,
          })
        );
        router.push("/login");
      } else {
        dispatch(
          showToastWithTimeout({
            message: "[Error message from backend]",
            type: "danger",
            duration: 8000,
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    reset();

    let isValid = true;

    if (!email || !username || !fullname || !password) {
      setEmptyFieldError(true);
      if (!email) setEmailError("null");
      if (!username) setUsernameError("null");
      if (!fullname) setFullnameError("null");
      if (!password) setPasswordError("null");

      isValid = false;
    }

    if (email && !validateEmail(email)) {
      setEmailError("Invalid email address");
    }

    if (username && !validateUsername(username)) {
      setUsernameError("Username must be alphanumeric & at least 5 characters");
    }

    if (password && !validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    if (emailError || usernameError || fullnameError || passwordError) {
      isValid = false;
    }

    return isValid;
  };

  const reset = () => {
    setEmptyFieldError(false);
    setEmailError("");
    setUsernameError("");
    setFullnameError("");
    setPasswordError("");
  };

  return (
    <form className="w-full">
      {emptyFieldError && (
        <p className="text-sm text-red-600 text-center mb-4">
          All fields are required
        </p>
      )}
      <AuthInput
        iId="email"
        iLabel="Email"
        iPlaceholder="Enter your email"
        iIcon={<IoMailOutline className="w-4 h-4 text-[#606060]" />}
        iState={email}
        errorMessage={emailError}
        iType="email"
        iSetState={setEmail}
        cClass="mb-5"
      />
      <AuthInput
        iId="username"
        iLabel="Username"
        iPlaceholder="Enter your username"
        iIcon={<IoMailOutline className="w-4 h-4 text-[#606060]" />}
        iState={username}
        errorMessage={usernameError}
        iSetState={setUsername}
        cClass="mb-5"
      />
      <AuthInput
        iId="fullname"
        iLabel="Full Name"
        iPlaceholder="Enter your full name"
        iIcon={<IoMailOutline className="w-4 h-4 text-[#606060]" />}
        iState={fullname}
        errorMessage={fullnameError}
        iSetState={setFullname}
        cClass="mb-5"
      />
      <AuthInput
        iId="password"
        iType="password"
        iLabel="Password"
        iPlaceholder="Enter your password"
        iIcon={<RiLockPasswordLine className="w-4 h-4 text-[#606060]" />}
        iState={password}
        errorMessage={passwordError}
        iSetState={setPassword}
        cClass="mb-5"
      />
      <button
        className="bg-[#D2D2D2] hover:bg-[#bdbdbd] text-white w-full rounded-full py-2 text-sm font-semibold mb-2"
        onClick={(e) => handleRegister(e)}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Register"}
      </button>
      <p className="text-center text-sm text-[#757575]">
        Already have an account?{" "}
        <Link href="/login" className="font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}
