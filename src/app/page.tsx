import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Opportunities } from "@/components/sections/Opportunities";
import { Pillars } from "@/components/sections/Pillars";
import { PrivateCapital } from "@/components/sections/PrivateCapital";
import { Standard } from "@/components/sections/Standard";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Pillars />
        <Opportunities />
        <PrivateCapital />
        <Standard />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
