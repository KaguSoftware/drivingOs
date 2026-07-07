import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast/toast-context";
import { Toaster } from "@/components/ui/toast/toaster";
import { QueryToast } from "@/components/ui/toast/query-toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Driving School OS",
  description: "Sürücü kursları için işletim sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${jakarta.variable} h-full antialiased`}>
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
