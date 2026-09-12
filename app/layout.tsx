import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SimulatorProvider } from "@/context/SimulatorContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomeServe — Simulateur de remplacement chauffage",
  description:
    "Découvrez en 30 secondes les alternatives de remplacement adaptées à votre équipement de chauffage, avec coût estimé, économies projetées et aides mobilisables.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white text-ink antialiased">
        <SimulatorProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
        </SimulatorProvider>
      </body>
    </html>
  );
}
