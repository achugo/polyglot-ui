import { createThemeCss } from "@agnostic-ds/tokens";
import "./components/button.js";
import "./components/card.js";
import "./components/input.js";
import "./components/textarea.js";
import "./components/badge.js";
import "./components/alert.js";

const STYLE_TAG_ATTR = "data-agnostic-ds-theme";

export const injectDefaultTheme = (selector = ":root"): void => {
  if (typeof document === "undefined") {
    return;
  }

  const existingTag = document.querySelector<HTMLStyleElement>(`style[${STYLE_TAG_ATTR}]`);
  if (existingTag) {
    return;
  }

  const styleTag = document.createElement("style");
  styleTag.setAttribute(STYLE_TAG_ATTR, "true");
  styleTag.textContent = createThemeCss(selector);
  document.head.appendChild(styleTag);
};

export const defineDesignSystem = (options?: { injectTheme?: boolean; selector?: string }): void => {
  if (options?.injectTheme ?? true) {
    injectDefaultTheme(options?.selector);
  }
};
