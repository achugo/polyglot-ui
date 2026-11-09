export type PrimitiveTokenValue = string | number;
export type TokenGroup = Record<string, PrimitiveTokenValue>;

export interface DesignTokenSet {
  color: TokenGroup;
  spacing: TokenGroup;
  radius: TokenGroup;
  font: TokenGroup;
  shadow: TokenGroup;
}

export const baseTokens: DesignTokenSet = {
  color: {
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
    mutedText: "#475569",
    border: "#cbd5e1",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryText: "#ffffff",
    info: "#1e40af",
    infoSubtle: "#dbeafe",
    success: "#166534",
    successSubtle: "#dcfce7",
    warning: "#92400e",
    warningSubtle: "#fef3c7",
    danger: "#b91c1c",
    dangerSubtle: "#fee2e2"
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem"
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem"
  },
  font: {
    familySans: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    sizeSm: "0.875rem",
    sizeMd: "1rem",
    sizeLg: "1.125rem",
    weightRegular: 400,
    weightSemibold: 600
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(15 23 42 / 0.08)",
    md: "0 2px 8px 0 rgb(15 23 42 / 0.14)"
  }
};

const tokenToCssVariable = (category: string, key: string, value: PrimitiveTokenValue): string =>
  `--ds-${category}-${key}: ${String(value)};`;

export const createCssVariables = (tokens: DesignTokenSet = baseTokens): string =>
  Object.entries(tokens)
    .flatMap(([category, group]) =>
      Object.entries(group as TokenGroup).map(([key, value]) =>
        tokenToCssVariable(category, key, value)
      )
    )
    .join("\n");

export const createThemeCss = (selector = ":root", tokens: DesignTokenSet = baseTokens): string =>
  `${selector} {\n${createCssVariables(tokens)}\n}`;
