import type { Metadata } from "next";
import urls from "@/lib/urls";

const destination = urls.getEmailBuilderUrl();

// GitHub Pages serves a static export, so this compatibility URL uses a native
// browser redirect rather than a server redirect.
export const metadata: Metadata = {
  title: "Email builder | Studio SDK",
  alternates: { canonical: destination },
  robots: { index: false, follow: true },
};

export default function LegacyEmailPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <p className="p-8 text-center">
        The email builder page has moved.{" "}
        <a href={destination} className="underline">
          Explore the AI email builder
        </a>
        .
      </p>
    </>
  );
}
