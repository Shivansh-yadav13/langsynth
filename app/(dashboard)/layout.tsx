import type { Metadata } from "next";

import { Manrope } from "next/font/google";
import "@/app/globals.css";
import WrapperNav from "./components/WrapperNav";
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Generate Synthetic Data",
  description: "LangSynth Free Synthetic data generator for LLMs.",
};

export default function GeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <main>
          <div className="w-full dark flex">
            <WrapperNav />
            <div className="w-full mx-5">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}