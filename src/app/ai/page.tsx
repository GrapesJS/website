import type { Metadata } from "next";
import { Suspense } from "react";
import AiPage from "./ai";

export const metadata: Metadata = {
  title: "GrapesJS Studio AI Website and Email Builder",
  description:
    "Build websites and emails with GrapesJS Studio AI. Generate with AI, refine with drag and drop, and export clean HTML with full visual control.",
  alternates: {
    canonical: "/ai",
  },
  openGraph: {
    title: "GrapesJS Studio AI Website and Email Builder",
    description:
      "Build websites and emails with GrapesJS Studio AI. Generate with AI, refine with drag and drop, and export clean HTML with full visual control.",
    url: "/ai",
    images: ["/assets/images/grapesjs-og-image-2.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
