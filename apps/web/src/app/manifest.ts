import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CoBudget",
    short_name: "CoBudget",
    description:
      "Collaborative budgeting that helps people build better financial futures together.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#16433c",
  };
}
