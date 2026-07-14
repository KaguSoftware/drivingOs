import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast/toast-context";
import { Toaster } from "@/components/ui/toast/toaster";
import { QueryToast } from "@/components/ui/toast/query-toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const jakartaMono = IBM_Plex_Mono({
  variable: "--font-jakarta-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Driving School OS",
  description: "Sürücü kursları için işletim sistemi",
};

// Applies the persisted (or system) theme before first paint — no light-mode flash.
const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=([^;]+)/);var t=m&&m[1];var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${jakarta.variable} ${jakartaMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          {children}
          <Toaster />
          <Suspense fallback={null}>
            <QueryToast />
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
