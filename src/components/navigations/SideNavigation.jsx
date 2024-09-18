import FullSideNavigation from "./FullSideNavigation";
import MiniSideNavigation from "./MiniSideNavigation";
import { useSelector } from "react-redux";
import { selectIsFullSideNavVisible } from "@/lib/slices/navbarSlice";

export default function SideNavigation() {
  const isFullSideNavVisible = useSelector(selectIsFullSideNavVisible);

  return (
    <div>
      {isFullSideNavVisible ? <FullSideNavigation /> : <MiniSideNavigation />}
    </div>
  );
}
