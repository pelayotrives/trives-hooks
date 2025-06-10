import { useState, useCallback } from "react";

export function useToggle(
  initial = false
): [boolean, (value?: boolean) => void] {
  const [isActive, setIsActive] = useState(initial);

  /**
   * Toggles the active state or sets it explicitly.
   *
   * If a boolean value is provided, sets the state to that value.
   * If no value is provided, toggles the current state.
   *
   * @param value - Optional boolean to explicitly set the state. If omitted, the state is toggled.
   */
  const toggle = useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      setIsActive(value);
    } else {
      setIsActive((s) => !s);
    }
  }, []);

  return [isActive, toggle];
}
