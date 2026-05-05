import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/site";
import { Suspense } from "react";
import AiPage from "./ai";

export const metadata: Metadata = {
  title: "GrapesJS Studio AI Website and Email Builder",
  description:
    "Build websites and emails with GrapesJS Studio AI. Generate with AI, refine with drag and drop, and export clean HTML with full visual control.",
  alternates: {
    canonical: "/ai",
    languages: {
      en: "/ai",
      es: "/ai/es",
    },
  },
  openGraph: {
    title: "GrapesJS Studio AI Website and Email Builder",
    description:
      "Build websites and emails with GrapesJS Studio AI. Generate with AI, refine with drag and drop, and export clean HTML with full visual control.",
    url: "/ai",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function Page() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
