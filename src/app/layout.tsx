import type { Metadata } from "next";
import { Cormorant, Montserrat, Noto_Serif } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://wood-shop-ten.vercel.app",
  ),
  title: {
    default: "Obsidian River",
    template: "%s",
  },
  description:
    "Luxury epoxy river tables by quote and handmade atelier objects with fixed EU prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${notoSerif.variable} ${montserrat.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
