import { Header } from "../components/shared/Header";
import { HeroAlt } from "../components/landing/HeroAlt";
import { About } from "../components/landing/About";
import { TopArtists } from "../components/landing/TopArtists";
import { GetStarted } from "../components/landing/GetStarted";
import { Footer } from "../components/landing/Footer";

export const Home = () => {
  return (
    <div className="font-sequel relative overflow-x-hidden">
      <Header />
      {/* <Hero /> */}
      <HeroAlt />
      <About />
      <TopArtists />
      <GetStarted />
      <Footer />
    </div>
  );
};
