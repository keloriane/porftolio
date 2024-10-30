import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/LoadingContext";
import Menu from "@/components/common/Menu/menu";
import { SlugProvider } from "@/context/SlugContext";
import CustomCursor from "@/components/common/Cursor/cursor";
import { getProjectsImage } from "@/lib/query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Creative developer based in Brussels",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LoadingProvider>
        <SlugProvider>
          <body>
            <Menu />

            {children}
          </body>
        </SlugProvider>
      </LoadingProvider>
    </html>
  );
}
