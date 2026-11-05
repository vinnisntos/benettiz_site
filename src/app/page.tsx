import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Showcase />

        {/* Próximas telas (VIP, contato, área restrita) entram aqui. */}
        <footer id="contato" className="bg-surface px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-[88rem]">
            <p className="font-display text-[clamp(3rem,10vw,9rem)] font-black italic uppercase leading-none text-white/10">
              Benettiz
            </p>
            <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-white/70">
              Fotos provisórias: “Ducati Multistrada-red” por Ramon FVelasquez (CC BY-SA 3.0); “BMW 1 series (E87
              Hatchback) M Sport” por L.C.Nøttaasen (CC BY 2.0); “Smartwatch &amp; Smartphone” por Ka Kit Pang (CC BY
              3.0); “2008 Moto Morini Corsaro 1200” por 70_musclecar_RT+6 (CC BY-SA 2.0); “Parrot ZIK headphones” por
              Halftermeyer (CC BY-SA 4.0); “HTC One (M8)” por Janitors (CC BY 2.0); “Game controller PlayStation 2” por
              YolanC (CC BY-SA 2.5). Via Wikimedia Commons e Flickr.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
