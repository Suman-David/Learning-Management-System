import type { Metadata } from "next";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";

export const metadata: Metadata = {
  title: "LMS - Learning Management System",
  description: "A production-grade Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
