"use client";

import Script from "next/script";

const GA_ID = "G-YE8KFEW3BH";
const isDev = process.env.NODE_ENV !== "production";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
           "debug_mode: true"
          });
        `}
      </Script>
    </>
  );
}
