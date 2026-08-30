import type { Metadata } from "next";
 
import './globals.css';

 

export const metadata: Metadata = {
  title: "JuanMa594 - Software & Automation Developer Portfolio",
  description: "Personal portfolio of JuanMa594, showcasing GitHub projects, experience, and skills. Built with React, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
