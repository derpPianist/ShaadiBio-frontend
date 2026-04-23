import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./theme/ThemeRegistry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "ShaadiBio",
  description: "Find Your Perfect Match",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider>
            <ThemeRegistry>
              <Header />
              {children}
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

/**
 * @Provider: It is a React component that wraps our app which allows components to share global data avoiding prop drilling
 */
