import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/Navbar";
import { AuthContextProvider } from "@/app/contexts/authContext";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangSynth",
  description: "High Quality Synthetic Data for LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className="mx-[10%]">
            <AuthContextProvider>
              <Navbar />
              {children}
              <Footer />
            </AuthContextProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
