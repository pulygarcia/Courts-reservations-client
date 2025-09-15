import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "./components/MainHeader";
import { ToastContainer } from "react-toastify";


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
        <div>
          <ToastContainer />

          <MainHeader />

          <main>{children}</main>

          <footer className="bg-gray-100 absolute bottom-0 w-full">
            <div className="container mx-auto py-6 px-6 text-center text-sm text-gray-600">
              © El Galpón de mi viejo
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
