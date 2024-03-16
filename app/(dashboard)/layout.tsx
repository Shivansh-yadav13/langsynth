import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import { AuthContextProvider } from "@/app/contexts/authContext";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/common/Footer";
import { CSPostHogProvider } from '@/app/providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangSynth",
  description: "High Quality Synthetic Data for LLMs",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>
          <main>
            <div className="mx-72">
              <AuthContextProvider>
                <Navbar />
                {children}
                <Toaster />
                <Footer />
              </AuthContextProvider>
            </div>
          </main>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
