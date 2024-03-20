import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import '../styles/custom.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Ligue EBTV",
  description: "Le site officiel de la ligue EBTV.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-fixed bg-light-mode dark:bg-dark-mode" >
          <div className="h-16">
            <Navbar />
          </div>

          <main className="flex-grow">
            {children}
          </main>

          <div className="h-auto">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
