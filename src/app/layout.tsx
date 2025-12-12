import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/providers/StateProvider"; // The one we just made
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PaisaHiPaisa",
  description: "Digital Wallet System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
