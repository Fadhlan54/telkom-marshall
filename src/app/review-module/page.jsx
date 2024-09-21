import CreateLayout from "@/components/layouts/CreateLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

export default function ReviewModulePage() {
  return (
    <MainLayout>
      <CreateLayout>
        <h1 className="text-center">Review Module</h1>

        <div className="flex justify-end">
          <Link href={"/"}>Review Baru</Link>
          <Link href={"/"}>Download Revisi PPT</Link>
        </div>
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <td>No</td>
              <td>EYD</td>
              <td>Clarity</td>
              <td>Content</td>
              <td>Aprrovement</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>EYD Ok</td>
              <td>Sudah jelas</td>
              <td>Konten sudah oke</td>
              <td className="text-center">
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </CreateLayout>
    </MainLayout>
  );
}
