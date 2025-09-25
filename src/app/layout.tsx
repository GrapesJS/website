import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import cn from "classnames";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const DOMAIN_URL = "https://grapesjs.com";

export const metadata: Metadata = {
  title: "GrapesJS - Free and Open Source Web Template Editor Framework",
  metadataBase: new URL(DOMAIN_URL),
  description:
    "Free and Open source Web Template Editor - Next generation tool for building templates without coding",
  keywords: "site builder, web template editor, html builder, html editor",
  openGraph: {
    type: "website",
    url: DOMAIN_URL,
    images: ["/assets/images/grapesjs-og-image-2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon/grapesjs-logo.png"
        />
        <meta name="msapplication-TileColor" content="#9e5381" />
        <meta name="theme-color" content="#9e5381" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N6SVS9RS');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/*
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000"/>
          <meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        */}
      </head>
      <body className={cn(inter.className, manrope.className)}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6SVS9RS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
