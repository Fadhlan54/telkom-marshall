import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

export default function ReviewModulePage() {
  return (
    <MainLayout>
      <ContentLayout>
        <h1 className="text-center font-bold text-xl mb-4">Review Module</h1>

        <div className="flex  sm:justify-end text-xs gap-2 mb-2">
          <Link
            href={"/review-module/create"}
            className="py-1 px-6 bg-neutral-200 rounded-full"
          >
            Create Review Module
          </Link>
          <Link href={"/"} className="py-1 px-6 bg-neutral-200 rounded-full">
            Download Review Module
          </Link>
        </div>

        <div className="overflow-x-auto shadow-lg ">
          <table className="w-full text-left rtl:text-right text-gray-500 border-separate border-spacing-0 text-xs">
            <thead className=" text-gray-700 uppercase bg-gray-50 text-center">
              <tr className="bg-neutral-200">
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black rounded-tl-lg font-semibold w-10 whitespace-nowrap"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold"
                >
                  EYD
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold min-w-36"
                >
                  Clarity
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 border border-r-0 border-black font-semibold min-w-[8rem]"
                >
                  Content
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-center border border-black rounded-tr-lg w-28 font-semibold"
                >
                  Approvement
                </th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(even)]:bg-neutral-200">
              <tr>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                  1
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  EYD oke
                </td>
                {/* TODO add -webkit-box-orient: horizontal; */}
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words max-w-72 text-pretty line-clamp-horizontal-3">
                  {`Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas Kalimat tersebut sudah jelas`.slice(
                    0,
                    130
                  ) + "..."}
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words max-w-72 text-pretty line-clamp-horizontal-3">
                  {`Konten sudah oke Konten sudah oke Konten sudah oke Konten sudah oke Konten sudah oke Konten sudah oke`}
                </td>
                <td className="px-3 py-2 text-center border border-t-0 border-black">
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black">
                  2
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  EYD perlu diperbaiki
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Kalimat tidak jelas
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Konten sudah oke
                </td>
                <td className="px-3 py-2 text-center border border-t-0 border-black">
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black rounded-bl-lg">
                  3
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  EYD perlu diperbaiki
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Kalimat tidak jelas
                </td>
                <td className="px-3 py-2 border border-t-0 border-r-0 border-black break-words">
                  Konten sudah oke
                </td>
                <td className="px-3 py-2 text-center border border-t-0 border-black rounded-br-lg">
                  <input type="checkbox" name="" id="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ContentLayout>
    </MainLayout>
  );
}
