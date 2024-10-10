import { usePathname, useRouter } from "next/navigation";
import { selectHasChanged, setHasChanged } from "@/lib/slices/hasChangedSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CustomLink({
  href,
  children,
  className = "",
  submit = false,
}) {
  const hasChanged = useSelector(selectHasChanged);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (pathname === href) return;

    if (hasChanged && !submit) {
      const confirmation = window.confirm(
        "Are you sure you want to leave this page? Unsaved changes will be lost."
      );
      if (!confirmation) {
        return;
      }
      dispatch(setHasChanged(false));
      router.push(href);
    } else {
      dispatch(setHasChanged(false));
      router.push(href);
    }
  };

  return (
    <button onClick={(e) => handleClick(e)} className={`${className}`}>
      {children}
    </button>
  );
}
