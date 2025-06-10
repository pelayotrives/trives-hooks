import { useEffect, useState } from "react";

type Breakpoint =
  | "smartwatch"
  | "mobileSmall"
  | "mobileLarge"
  | "phablet"
  | "tabletSmall"
  | "tabletLarge"
  | "desktopSmall"
  | "desktopMedium"
  | "desktopLarge"
  | "widescreen";

const getBreakpoint = (width: number): Breakpoint => {
  if (width <= 320) return "smartwatch";
  if (width <= 390) return "mobileSmall";
  if (width <= 480) return "mobileLarge";
  if (width <= 600) return "phablet";
  if (width <= 768) return "tabletSmall";
  if (width <= 991) return "tabletLarge";
  if (width <= 1200) return "desktopSmall";
  if (width <= 1440) return "desktopMedium";
  if (width <= 1600) return "desktopLarge";
  return "widescreen";
};

/**
 * Custom React hook to detect the current screen breakpoint.
 *
 * @returns An object with boolean flags for each breakpoint and the current breakpoint name.
 *
 * @example
 * const { isMobileSmall, isTabletLarge, breakpoint } = useBreakpoint();
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined"
      ? getBreakpoint(window.innerWidth)
      : "desktopMedium"
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isSmartwatch: breakpoint === "smartwatch",
    isMobileSmall: breakpoint === "mobileSmall",
    isMobileLarge: breakpoint === "mobileLarge",
    isPhablet: breakpoint === "phablet",
    isTabletSmall: breakpoint === "tabletSmall",
    isTabletLarge: breakpoint === "tabletLarge",
    isDesktopSmall: breakpoint === "desktopSmall",
    isDesktopMedium: breakpoint === "desktopMedium",
    isDesktopLarge: breakpoint === "desktopLarge",
    isWidescreen: breakpoint === "widescreen",
    breakpoint,
  };
}
