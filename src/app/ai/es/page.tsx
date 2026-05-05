import type { Metadata } from "next";
import { Suspense } from "react";
import "../../ai/ai-globals.css";
import AiPage from "../../es/ai";

export const metadata: Metadata = {
  title: "GrapesJS Studio AI creador de sitios web y emails con IA",
  description:
    "Crea sitios web y emails con GrapesJS Studio AI. Genera con IA, refina con drag and drop y exporta HTML limpio con control visual completo.",
  alternates: {
    canonical: "/ai/es",
    languages: {
      en: "/ai",
      es: "/ai/es",
    },
  },
  openGraph: {
    title: "GrapesJS Studio AI creador de sitios web y emails con IA",
    description:
      "Crea sitios web y emails con GrapesJS Studio AI. Genera con IA, refina con drag and drop y exporta HTML limpio con control visual completo.",
    url: "/ai/es",
    images: ["/assets/images/grapesjs-og-image-2.jpg"],
  },
};

export default function RootPage() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
