import localFont from "next/font/local";

export const interVariable = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  fallback: ["system-ui", "arial"],
  src: [
    {
      path: "./fonts/InterVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
});

export const paperMono = localFont({
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  src: [
    {
      path: "./fonts/PaperMono-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-paper-mono",
});
