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
        {/* PostHog Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Ce js Ls Te Fs Ds capture Ye calculateEventProperties zs register register_once register_for_session unregister unregister_for_session Ws getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Bs Us createPersonProfile Hs Ms Gs opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ns debug L qs getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_e8FN4rwVNjoQPzYBb3RhOOtxy9SK7TauqjpGcZSYQIT', {
                api_host: 'https://us.i.posthog.com',
                defaults: '2025-05-24',
                person_profiles: 'always',
            })`,
          }}
        />
        {/* End PostHog Analytics */}
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
