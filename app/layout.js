
import { Inter } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/context/StateProvider";
import Nav from "./nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VAAV Innovations",
  description: "Welcome to VAAV Innovative Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Nav/>
      <StateProvider  >
        {children}
      </StateProvider>
        </body>
    </html>
  );
}
