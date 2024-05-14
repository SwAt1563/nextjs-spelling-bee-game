import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import BootstrapClient from "@/components/BootstrapClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Spelling Bee Game",
  description: "Built by Qutaiba Olayyan",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    // i can't pass local variable to html tag, beacuse i define the layout out of [locale] folder
    // all exists docmentation is not clear about this issue (when creating pages out of [locale] folder)
    <html lang={"en"}>
      <body className={montserrat.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
