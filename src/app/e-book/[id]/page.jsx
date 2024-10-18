"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/common/Loading";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function EbookById() {
  const [dots, setDots] = useState(". ");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === ". . . " ? ". " : prev + ". "));
    }, 500);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <MainLayout>
      <ContentLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <h1 className="text-center font-semibold text-xl mb-4">
            Upload E-book
          </h1>

          <Image
            src={"/images/rafiki.png"}
            width={200}
            height={200}
            alt="loading"
            className="animate-spin duration-100"
          />

          <p className="mt-12 font-medium text-grey-4">
            Uploading Your E-book {dots}
          </p>
          <Link
            href="/e-book"
            className="py-2 px-12 mt-6 inline-block bg-primary-1 hover:bg-primary-2 text-white rounded-full font-semibold text-sm"
          >
            Upload New E-Book
          </Link>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}
