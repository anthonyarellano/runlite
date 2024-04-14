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
      <body>{children}</body>
    </html>
  );
}
