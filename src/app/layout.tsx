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
    images: ["/assets/images/grapesjs-og-image.png"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-74284223-1', 'auto');
            ga('send', 'pageview');`,
          }}
        />
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
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
