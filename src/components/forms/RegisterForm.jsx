import Link from "next/link";
import { RiLockPasswordLine, RiUser3Line, RiUserLine } from "react-icons/ri";
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
import { BiRename } from "react-icons/bi";
import { registerService } from "@/service/authentication";

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

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("register");
    reset();

    setIsLoading(true);

    try {
      if (!validateForm()) {
        return;
      }
      const response = await registerService({
        email,
        username,
        fullname,
        password,
      });

      console.log(response);

      if (response.statusCode !== 201) {
        dispatch(
          showToastWithTimeout({
            message: response.message,
            type: "danger",
            duration: 8000,
          })
        );
        return;
      }

      dispatch(
        showToastWithTimeout({
          message: "Registration successful",
          type: "success",
          duration: 8000,
        })
      );
      router.push("/login");
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
    <form className="w-full" action={""}>
      {emptyFieldError && (
        <p className="text-sm text-red-600 text-center mb-4">
          All fields are required
        </p>
      )}
      <AuthInput
        id="email"
        label="Email"
        placeholder="Enter your email"
        icon={<IoMailOutline className="w-4 h-4 text-[#606060]" />}
        value={email}
        errorMessage={emailError}
        type="email"
        setValue={setEmail}
        className="mb-5"
      />
      <AuthInput
        id="username"
        label="Username"
        placeholder="Enter your username"
        icon={<RiUser3Line className="w-4 h-4 text-[#606060]" />}
        value={username}
        errorMessage={usernameError}
        setValue={setUsername}
        className="mb-5"
      />
      <AuthInput
        id="name"
        label="Name"
        placeholder="Enter your name"
        icon={<BiRename className="w-4 h-4 text-[#606060]" />}
        value={fullname}
        errorMessage={fullnameError}
        setValue={setFullname}
        className="mb-5"
      />
      <AuthInput
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        icon={<RiLockPasswordLine className="w-4 h-4 text-[#606060]" />}
        value={password}
        errorMessage={passwordError}
        setValue={setPassword}
        className="mb-5"
      />
      <button
        className="bg-[#D2D2D2] hover:bg-[#bdbdbd] text-white w-full rounded-full py-2 text-sm font-semibold mb-2"
        onClick={(e) => handleRegister(e)}
        disabled={isLoading}
        type="button"
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
