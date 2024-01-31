import HomePage from "./home";
import Nav from "./nav";
import Features from "./features";
import Access from "./access";
import Roadmap from "./roadmap";

export default function Home() {
  
  return (
    <main className="bg-white min-h-screen ">
      <Nav/>
      <HomePage/>
      <Features/>
      <Access/>
      <Roadmap/>
    </main>
  );
}
