import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import { AuthContextProvider } from "@/app/contexts/authContext";
import Footer from "@/components/common/Footer";
import { CSPostHogProvider } from '@/app/providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangSynth",
  description: "High Quality Synthetic Data for LLMs",
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>
          <div className="relative flex min-h-dvh flex-col xl:mx-[13%] lg:mx-[10%]">
            <main className="flex-1">
              <AuthContextProvider>
                <Navbar />
                {children}
                <Footer />
              </AuthContextProvider>
            </main>
          </div>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
