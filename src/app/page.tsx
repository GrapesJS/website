import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/site";
import SDKPage from "./sdk/SdkPage";

export const metadata: Metadata = {
  title:
    "Embed a Visual Editor for Emails, Landing Pages, Websites & Documents | GrapesJS Studio SDK",
  description:
    "Embed a white-label, AI-powered visual editor in your app for emails, landing pages, websites, and documents. Includes drag-and-drop editing, code editing, reusable components, and clean HTML export.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootPage() {
  return <SDKPage />;
}
