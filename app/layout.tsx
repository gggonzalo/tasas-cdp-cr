import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasas CDP Costa Rica",
  description:
    "Tasas de certificados a plazo en entidades financieras de Costa Rica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            <div className="absolute right-2 top-2">
              <DarkModeToggle />
            </div>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
