import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "blog app",
};

import {Providers} from "./providers";
import { ClerkProvider } from '@clerk/nextjs'

import AuthButtons from "@/components/body/authButtons";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          <AuthButtons />
          {children}
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}