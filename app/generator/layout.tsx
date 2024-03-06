import type { Metadata } from "next";
import { Manrope } from "next/font/google";

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
        <div className="mx-10">
          {children}
        </div>
    // <html lang="en">
    //   <body className={manrope.className}>
    //   {/* </body>
    // </html> */}
  );
}