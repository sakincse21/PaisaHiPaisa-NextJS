import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "PaisaHiPaisa",
  description: "Digital Wallet System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <div>
        <Navbar />
            {children}
            <Footer />
      </div>
  );
}