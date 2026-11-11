import HomePage from "./home";
import Marquee from "./marquee";
import Features from "./features";
import SolarDay from "./solarDay";
import ProductShowcase from "./productShowcase";
import Services from "./services";
import Access from "./access";
import Roadmap from "./roadmap";
import Faq from "./faq";
import Contact from "./contact";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <main>
        <HomePage />
        <Marquee />
        <Features />
        <SolarDay />
        <ProductShowcase />
        <Services />
        <Access />
        <Roadmap />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
