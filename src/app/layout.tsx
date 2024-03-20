import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { Alert } from "@/components/Alert";
import Head from "next/head";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
