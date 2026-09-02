import type { MetadataRoute } from "next";

import { THEME_COLORS } from "../styles/theme-colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MoneyPact",
    short_name: "MoneyPact",
    description:
      "Collaborative budgeting and financial accountability. Make a plan. Keep your commitments.",
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
  };
}
