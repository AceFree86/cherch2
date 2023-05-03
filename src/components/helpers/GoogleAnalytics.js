import React from "react";
import Script from "next/script";


export default function GoogleAnalytics ({GoogId}) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GoogId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GoogId}');
        `}
      </Script>
    </>
  );
};
