import { useEffect } from "react";

export default function useBeforeUnload(hasChanged) {
  useEffect(() => {
    if (!hasChanged) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanged]);
}
