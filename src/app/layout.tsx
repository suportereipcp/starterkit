import type { Metadata } from "next";
import { Lato } from "next/font/google"; // Import Lato
import "./globals.css";

// Configure Lato font
const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PCP Starter Kit",
  description: "Starter Kit for PCP Support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
