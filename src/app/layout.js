import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
        <div className="flex flex-col min-h-screen" style={{backgroundImage: 'url(/bg_w.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh'}}>
          <div className="h-24">
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
