import Button from "@/components/common/Button";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";

export default function ModuleDetailsPage() {
  return (
    <MainLayout>
      <ContentLayout cClass="flex flex-col items-center">
        <Image
          src="/images/marshall logo book.png"
          alt="Marshall Logo"
          width={300}
          height={300}
        />
        <Image
          src={"/images/rafiki.png"}
          width={200}
          height={200}
          alt="loading"
          className="animate-spin-fast-to-slow"
        />
        <p className="text-center">Generating your module</p>
        <p className="text-center">
          Your status request available in Requests Tab. Check{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            {" "}
            here!
          </Link>
        </p>
        <Button variant="primary" className={"mt-2"} size="lg" href={"/module"}>
          Generate another
        </Button>
      </ContentLayout>
    </MainLayout>
  );
}
