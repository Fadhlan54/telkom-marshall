import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

export default function ReviewDetailsPage() {
  return (
    <MainLayout>
      <ContentLayout cClass="flex flex-col items-center">
        <Image
          src="/images/marshall logo book.png"
          alt="Marshall Logo"
          width={300}
          height={300}
        />
        <BiLoaderCircle className="my-4 w-24 h-24 animate-spin-slow" />
        <p className="text-center">Reviewing your module</p>
        <p className="text-center">
          Your status request available in Requests Tab. Check{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            {" "}
            here!
          </Link>
        </p>
        <Link
          href="/review-module"
          className="px-6 py-2 bg-neutral-400 hover:bg-neutral-600 rounded-lg text-white mt-2"
        >
          Generate another
        </Link>
      </ContentLayout>
    </MainLayout>
  );
}
