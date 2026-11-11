import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/context/StateProvider";
import Nav from "./nav";
import WhatsAppButton from "@/components/whatsappButton";
import PointerGlow from "@/components/pointerGlow";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "VAAV Innovations | Portable Solar Power Stations",
  description:
    "Clean, affordable portable power for homes and shops. Shop PowerCube solar power stations, run a free energy audit, and book a consultation or installation.",
};

export const viewport = {
  themeColor: "#0D100F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        {/* without JavaScript, show content that would normally animate in */}
        <noscript><style>{'.reveal{opacity:1;transform:none}'}</style></noscript>
        <StateProvider>
          <Nav />
          {children}
          <WhatsAppButton />
          <PointerGlow />
        </StateProvider>
      </body>
    </html>
  );
}
