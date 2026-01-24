import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy",
  subsets: ["latin", "khmer"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "SOK LEAP METREY POLYCLINIC",
  description: "Clinic Management System",
  icons: {
    icon: "/logo/left.png",
    apple: "/logo/left.png",
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
