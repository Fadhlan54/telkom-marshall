import LoginForm from "@/components/forms/LoginForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Image from "next/image";

export default function Login() {
  return (
    <AuthLayout>
      <div className="min-h-screen hidden md:flex flex-col justify-center items-center w-[55%]">
        <div className="flex flex-col justify-center items-center max-w-[30rem] px-4">
          <Image
            src={"/images/pana.png"}
            width={300}
            height={300}
            alt="Pana Logo"
          />
          <p className="mt-6 text-white text-sm lg:text-base">
            <span>Marshall</span> adalah sistem yang didesain untuk meningkatkan
            efektifitas proses Learning & Development Modul pada lingkup Telkom
            Corporate University dengan bantuan Artificial Intelligence.
          </p>
        </div>
      </div>
      <div className="bg-white py-4 lg:py-6 px-4 md:px-6 lg:px-8 pb-8 w-full md:w-[45%] flex flex-col items-center justify-center shadow min-h-screen ">
        <Image
          src={"/images/logo.png"}
          alt="Telkom Marshall Logo"
          width={160}
          height={58.4}
          priority
          className="mx-auto"
        />
        <h2 className="font-bold text-2xl mt-6 mb-8 ">Welcome Back!</h2>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
