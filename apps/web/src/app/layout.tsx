import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
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
  colorScheme: "light",
  themeColor: "#16433c",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
