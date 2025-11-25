import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/contexts/theme-context";

export const metadata: Metadata = {
  title: "BKLN - Application Monitor",
  description: "Internal Application Compliance - Monitor and manage software installations across devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
