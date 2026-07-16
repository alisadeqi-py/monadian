import SlideShow from "@/components/SlideShow";
import Slide from "@/components/Slide";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Articles from "@/components/Articles";
import Holdings from "@/components/Holdings";
import Licenses from "@/components/Licenses";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <SlideShow>
        <Slide index={0}>
          <Hero />
        </Slide>
        <Slide index={1}>
          <Services />
        </Slide>
        <Slide index={2}>
          <Articles />
        </Slide>
        <Slide index={3}>
          <Holdings />
        </Slide>
        <Slide index={4}>
          <Licenses />
        </Slide>
        <Slide index={5}>
          <Footer />
        </Slide>
      </SlideShow>
    </main>
  );
}
