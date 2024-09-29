import BottomNavigation from "../navigations/BottomNavigation";
import Navbar from "../navigations/Navbar";
import SideNavigation from "../navigations/SideNavigation";
import Toast from "../fragments/Toast";

export default function MainLayout({ children }) {
  return (
    <div className="max-h-screen sm:overflow-hidden">
      <Toast />
      <Navbar />
      <div className="flex">
        <SideNavigation />
        <main className="w-full px-4 py-4 md:p-6 sm:overflow-y-auto max-h-[calc(100vh_-_4rem)]">
          {children}
          <BottomNavigation />
        </main>
      </div>
    </div>
  );
}
