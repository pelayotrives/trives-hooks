import { useEffect, useState } from "react";

type BrowserType = "chrome" | "safari" | "edge" | "opera" | "firefox" | "other";

/**
 * Custom React hook to detect the current browser type based on the user agent string.
 *
 * @returns An object containing boolean flags for each supported browser (`isChrome`, `isSafari`, `isEdge`, `isOpera`, `isFirefox`, `isOther`) and the detected browser type as a string (`browser`).
 *
 * @example
 * const { isChrome, isSafari, browser } = useCheckBrowsers();
 * if (isChrome) {
 *   "Chrome-specific logic"
 * }
 */
export const useCheckBrowsers = () => {
  const [browser, setBrowser] = useState<BrowserType>("other");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/Edg\//.test(userAgent)) {
      setBrowser("edge");
    } else if (/OPR\//.test(userAgent) || /Opera/.test(userAgent)) {
      setBrowser("opera");
    } else if (/Firefox\//.test(userAgent)) {
      setBrowser("firefox");
    } else if (
      /Chrome\//.test(userAgent) &&
      !/Edg\//.test(userAgent) &&
      !/OPR\//.test(userAgent)
    ) {
      setBrowser("chrome");
    } else if (
      /Safari\//.test(userAgent) &&
      !/Chrome\//.test(userAgent) &&
      !/OPR\//.test(userAgent) &&
      !/Edg\//.test(userAgent)
    ) {
      setBrowser("safari");
    } else {
      setBrowser("other");
    }
  }, []);

  return {
    isChrome: browser === "chrome",
    isSafari: browser === "safari",
    isEdge: browser === "edge",
    isOpera: browser === "opera",
    isFirefox: browser === "firefox",
    isOther: browser === "other",
    browser,
  };
};
