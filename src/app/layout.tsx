import Script from "next/script";
import { LocaleProvider } from "~/contexts/LocaleContext";
import { RunTrackingStoreProvider } from "~/providers/RunTrackingStoreProvider";
import "~/styles/globals.css";

export const metadata = {
  title: "Runlite - Run tracking",
  description: "Run tracking where you own your own data",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="http://localhost:8097" />
      </head>
      <body>
        <LocaleProvider>
          <RunTrackingStoreProvider>{children}</RunTrackingStoreProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
