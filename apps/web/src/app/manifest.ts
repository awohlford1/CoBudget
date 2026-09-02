import type { MetadataRoute } from "next";

import { THEME_COLORS } from "../styles/theme-colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CoBudget",
    short_name: "CoBudget",
    description:
      "Collaborative budgeting that helps people build better financial futures together.",
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
  };
}
