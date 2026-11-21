import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProviders } from "./providers/AppProviders";

export const metadata: Metadata = {
  title: "JOBA's Portfolio",
  description: "Portfolio of Genitah JOBA Razafindrasoa, fullstack & mobile developer.",
};

// Applies the saved theme before first paint so dark-mode visitors get no flash.
const themeScript = `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppProviders>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
