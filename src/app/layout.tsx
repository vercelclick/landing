import { Geist_Mono, Inter } from "next/font/google";
import ThemeProvider from "@/components/shared/theme-provider";
import "./globals.css";
import Script from "next/script";
import { AnalyticsProvider } from "@/analytics/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vercel Click Vault",
  description:
    "Click uses passkeys to encrypt and decrypt secrets on your device offering a Just In Time secret injection model. Encrypted secrets are stored in your codebase or on a our hosted vault service.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>{metadata.title}</title>

        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Core Open Graph Tags for Social Sharing Cards */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://vercel.click/logo.webp" />
        <meta property="og:url" content="https://vercel.click" />
        <meta property="og:type" content="website" />

        {/* Specific Tags for X / Twitter Preview Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://vercel.click/logo.webp" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <AnalyticsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AnalyticsProvider>

        <Script id="load-sales-iq">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>

        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.com/widget?wc=siq5d1848122063dd034dfba681cae5fd35b7209c39e09cfd89aa062cf2578f125a"
          defer
        ></Script>
      </body>
    </html>
  );
}
