import Image from "next/image";
import Toast from "../common/Toast";

export default function AuthLayout({ children }) {
  return (
    <div className="justify-center min-h-screen bg-primary-1">
      <Toast />
      <div className="w-full flex">{children}</div>
    </div>
  );
}
