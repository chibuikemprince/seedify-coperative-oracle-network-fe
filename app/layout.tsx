import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import {Toaster} from "sonner";
import {SiteShell} from "@/components/SiteShell";

const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

export const metadata: Metadata = {
  title: "AI Prediction Hub",
  description: "Stake BNB on AI-resolved markets backed by AIPT liquidity"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <SiteShell>
            {children}
            <Toaster position="bottom-right" richColors />
          </SiteShell>
        </Providers>
      </body>
    </html>
  );
}
