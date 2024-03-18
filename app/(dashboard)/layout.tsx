import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import { AuthContextProvider } from "@/app/contexts/authContext";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/common/Footer";
import { CSPostHogProvider } from '@/app/providers';
import dynamic from 'next/dynamic';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangSynth",
  description: "High Quality Synthetic Data for LLMs",
};

const PostHogPageView = dynamic(() => import('@/components/posthog/PostHogPageView'), {
  ssr: false,
})

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
                <PostHogPageView />
                {children}
                <Toaster />
                <Footer />
              </AuthContextProvider>
            </div>
          </main>
        </body>
        <GoogleAnalytics gaId="G-ZD0G8950SS" />
      </CSPostHogProvider>
    </html>
  );
}
