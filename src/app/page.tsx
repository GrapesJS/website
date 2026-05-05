import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/site";
import SDKPage from "./sdk/SdkPage";

export const metadata: Metadata = {
  title: "Embedded Visual Editor SDK for Newsletters, Websites, and Documents",
  description:
    "Embed a white-label, AI-powered visual editor in your app. Build newsletters, websites, and documents with drag and drop, code editing, and HTML output.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Embedded Visual Editor SDK for Newsletters, Websites, and Documents",
    description:
      "Embed a white-label, AI-powered visual editor in your app. Build newsletters, websites, and documents with drag and drop, code editing, and HTML output.",
    url: "/",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootPage() {
  return <SDKPage />;
}
