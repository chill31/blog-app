import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chill31 Blog",
  description: "blog web-app made by Chill31 with the help of Satindar31. It has administrator and user features. Markdown and images supported"
};

import {Providers} from "./providers";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

import { Toaster } from 'react-hot-toast';

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}