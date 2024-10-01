import LoginForm from "@/components/forms/LoginForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Image from "next/image";

export default function Login() {
  return (
    <AuthLayout>
      <div className="bg-[#E8E8E8] p-6 pb-8  rounded-lg w-full flex flex-col items-center shadow">
        <Image
          src={"/images/logo.png"}
          alt="Telkom Marshall Logo"
          width={160}
          height={58.4}
          priority
        />
        <h2 className="font-bold text-2xl mt-4 mb-6">Welcome Back!</h2>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
