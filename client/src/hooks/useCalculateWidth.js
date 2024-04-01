import { useEffect, useRef, useState } from "react";

export function useCalculateWidth() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    function handleResize() {
      setWidth(ref.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);

    // Initial width set
    handleResize();

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return { ref, width };
}
