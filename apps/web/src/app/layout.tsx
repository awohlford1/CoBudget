import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { THEME_COLORS } from "../styles/theme-colors";
import { themeScript } from "../theme/theme-script";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CoBudget",
    template: "%s | CoBudget",
  },
  description:
    "Collaborative budgeting that helps people build better financial futures together.",
  applicationName: "CoBudget",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // The inline script pins `data-theme` before first paint, so the attribute
    // the server rendered may differ from the one React hydrates against.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
