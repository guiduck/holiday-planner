import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { Alert } from "@/components/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Holiday planner",
  description: "Get youself organized with our planner app",
  keywords: ["Next.js", "React", "Tailwind CSS", "Server Components", "Shadcn"],
  authors: [
    {
      name: "Guilherme",
      url: "https://github.com/guiduck",
    },
  ],
  creator: "Guilherme",

  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Alert />
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
