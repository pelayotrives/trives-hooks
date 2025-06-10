import { useState, useCallback } from "react";

export function useToggle(initial = false): [boolean, (value?: boolean) => void] {
  const [isActive, setIsActive] = useState(initial);

  const toggle = useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      setIsActive(value);
    } else {
      setIsActive((s) => !s);
    }
  }, []);

  return [isActive, toggle];
}
