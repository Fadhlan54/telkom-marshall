import Image from "next/image";
import Toast from "../fragments/Toast";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toast />
      <div className="w-full max-w-[28rem] py-4 px-6">{children}</div>
    </div>
  );
}
