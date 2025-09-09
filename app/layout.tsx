import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "./components/MainHeader";


const inter = Inter({
  variable: "--font-geist-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Galpon - Club de padel",
  description: "El galpon - club de padel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <MainHeader />

          <main className="flex-1">{children}</main>

          <footer className="bg-gray-100 border-t">
            <div className="container mx-auto py-6 px-6 text-center text-sm text-gray-600">
              © El Galpón de mi viejo
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
