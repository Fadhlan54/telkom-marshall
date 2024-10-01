import Loading from "@/components/common/Loading";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

export default function EbookById() {
  return (
    <MainLayout>
      <ContentLayout>
        <div className="flex flex-col items-center">
          <h1 className="text-center font-semibold text-xl mb-4">
            Processing your e-book
          </h1>

          <Loading />

          <p className="mt-2">Ebook anda sedang diproses</p>
          <Link
            href="/e-book"
            className="py-2 px-6 mt-2 inline-block bg-neutral-200 rounded-full font-semibold text-sm"
          >
            Upload E-Book baru
          </Link>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}
