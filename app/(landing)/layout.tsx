import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import { AuthContextProvider } from "@/app/contexts/authContext";
import Footer from "@/components/common/Footer";
import { CSPostHogProvider } from '@/app/providers';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangSynth",
  description: "High Quality Synthetic Data for LLMs",
};

const PostHogPageView = dynamic(() => import('@/components/posthog/PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>
          <main>
            <div className="xl:mx-[13%] lg:mx-[10%]">
              <AuthContextProvider>
                <Navbar />
                <PostHogPageView /> 
                {children}
                <Footer />
              </AuthContextProvider>
            </div>
          </main>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
