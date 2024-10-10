import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHasChanged } from "../lib/slices/hasChangedSlice";

export default function useBeforeUnload(hasChanged) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasChanged) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      dispatch(setHasChanged(false));
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanged, dispatch]);
}
