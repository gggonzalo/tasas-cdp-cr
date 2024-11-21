import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasas de CDPs en Costa Rica",
  description:
    "Comparación de tasas de certificados a plazo en entidades financieras de Costa Rica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute right-2 top-2">
            <DarkModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
