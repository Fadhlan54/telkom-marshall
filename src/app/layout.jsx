import { Rubik } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Marshall",
  description: "Marshall Telkom Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${rubik.className} antialiased max-h-screen`}>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
