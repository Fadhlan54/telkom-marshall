import CreateLayout from "@/components/layouts/CreateLayout";
import MainLayout from "@/components/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <CreateLayout>
        <h2 className="text-2xl font-semibold text-center">Menu</h2>
        <div className="mt-4">
          <h4>Create Module</h4>
          <div className="flex justify-around mt-2 mb-4">
            <div className="border-2 shadow-md p-2 w-40 h-40">
              Review Module
            </div>
            <div className="border-2 shadow-md p-2 w-40 h-40">
              Generate Module
            </div>
            <div className="border-2 shadow-md p-2 w-40 h-40">Update Ebook</div>
          </div>
          <h4>Module Manipulation</h4>
          <div className="flex justify-between mt-2">
            <div className="border-2 shadow-md p-2 w-40 h-40">
              Mapping Dirkom 11
            </div>
            <div className="border-2 shadow-md p-2 w-40 h-40">CoQa</div>
            <div className="border-2 shadow-md p-2 w-40 h-40">
              Audio Learning
            </div>
            <div className="border-2 shadow-md p-2 w-40 h-40">
              Video Learning
            </div>
          </div>
        </div>
      </CreateLayout>
    </MainLayout>
  );
}
