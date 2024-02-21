import Carousel from "@/components/Carousel";
import Encryption from "@/components/main/Encryption";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import Services from "@/components/Services";
import Team from "@/components/Team";

export default function Home() {
  return (
    <div>
      <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        {/* <Carousel /> */}
        <Services />
        <Team />
      </div>
    </main>
    <Footer />
    </div>
  );
}

