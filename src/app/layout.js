import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy",
  subsets: ["latin", "khmer"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Next.js",
  description: "Clinic Management System",
  icons: {
    icon: "/next.svg",
    apple: "/next.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kantumruyPro.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
