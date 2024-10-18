"use client";

import RegisterForm from "@/components/forms/RegisterForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Image from "next/image";

export default function Login() {
  return (
    <AuthLayout>
      <div className="min-h-screen hidden md:flex flex-col justify-center items-center w-[55%]"></div>
      <div className="bg-white py-4 lg:py-6 px-4 md:px-6 lg:px-8 pb-8 w-full md:w-[45%] flex flex-col items-center justify-center shadow min-h-screen">
        <Image
          src={"/images/logo.png"}
          alt="Telkom Marshall Logo"
          width={160}
          height={58.4}
          priority
        />
        <h2 className="font-bold text-2xl mt-3 mb-4">Let Us Know You</h2>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}
