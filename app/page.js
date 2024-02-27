import HomePage from "./home";
import Nav from "./nav";
import Features from "./features";
import Access from "./access";
import Roadmap from "./roadmap";
import Footer from "./footer";
import { useStateValue } from "@/context/StateProvider";

export default function Home() {
  const [{basket}, dispatch] = useStateValue()

  return (
    <main className="bg-white min-h-screen ">
      <Nav />
      <HomePage/>
      <Features/>
      <Access/>
      <Roadmap/>
      <Footer/>
    </main>
  );
}
