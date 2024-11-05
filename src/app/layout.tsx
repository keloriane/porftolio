import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/LoadingContext";
import Menu from "@/components/common/Menu/menu";
import { SlugProvider } from "@/context/SlugContext";
import CustomCursor from "@/components/common/Cursor/cursor";
import { getProjectsImage } from "@/lib/query";
import { ToastProvider } from "@/components/Ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Kevin Flabat",
  description: "Creative developer based in Brussels",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <LoadingProvider>
        <SlugProvider>
          <ToastProvider>
            <body>
              <Menu />

              {children}
            </body>
          </ToastProvider>
        </SlugProvider>
      </LoadingProvider>
    </html>
  );
}
