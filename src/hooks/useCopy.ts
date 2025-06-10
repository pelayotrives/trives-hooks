import { useState } from "react";

export const useCopy = (resetTimeout = 2000) => {
  const [copied, setCopied] = useState(false);

  /**
   * Copies the provided text to the user's clipboard and updates the copied state.
   *
   * @param text - The string to be copied to the clipboard.
   * @returns A promise that resolves when the text has been copied.
   *
   * @remarks
   * On successful copy, sets the `copied` state to `true` and resets it to `false` after a timeout specified by `resetTimeout`.
   * If the copy operation fails, sets the `copied` state to `false`.
   */
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetTimeout);
    } catch (e) {
      setCopied(false);
    }
  };

  return { copy, copied };
};
