"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Wordmark } from "./wordmark";
import { Embers } from "./embers";
import { PerkTicker } from "./perk-ticker";
import { featured, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/data/products";

const ease = [0.22, 1, 0.36, 1] as const;

// Three products fanned out on the right; on scroll they spread and drop toward the showcase.
const fan = [
  { p: featured[2], rotate: -10, x: -150, y: 30, endX: -320, endY: 260, endRotate: -4 },
  { p: featured[0], rotate: 0, x: 0, y: -10, endX: 0, endY: 300, endRotate: 0 },
  { p: featured[1], rotate: 9, x: 150, y: 40, endX: 320, endY: 260, endRotate: 4 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const logoScale = useTransform(p, [0, 0.6], [1, reduce ? 1 : 0.78]);
  const logoY = useTransform(p, [0, 0.6], [0, reduce ? 0 : -90]);
  const logoOpacity = useTransform(p, [0.35, 0.7], [1, 0]);
  const copyY = useTransform(p, [0, 0.45], [0, reduce ? 0 : -50]);
  const copyOpacity = useTransform(p, [0.15, 0.45], [1, 0]);
  const glowScale = useTransform(p, [0, 0.8], [1, 1.7]);
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.55, 1, 0.3]);
  const bgWordX = useTransform(p, [0, 1], ["0%", "-28%"]);
  const streakY = useTransform(p, [0, 1], [0, -220]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} id="inicio" className="relative h-[150vh] lg:h-[190vh]">
      <div className="bg-carbon sticky top-0 flex h-dvh flex-col overflow-hidden">
        {/* Red light streaks */}
        <motion.div aria-hidden style={{ y: streakY }} className="pointer-events-none absolute inset-0">
          <span className="absolute -left-20 top-[18%] h-[3px] w-[70%] -rotate-[24deg] bg-brand-hot/70 blur-[2px]" />
          <span className="absolute -left-10 top-[30%] h-px w-[55%] -rotate-[24deg] bg-brand/60" />
          <span className="absolute -right-[10%] top-[62%] h-[2px] w-[60%] -rotate-[24deg] bg-brand-hot/50 blur-[1px]" />
        </motion.div>

        {/* Oversized background word */}
        <motion.p
          aria-hidden
          style={{ x: bgWordX }}
          className="pointer-events-none absolute bottom-[12%] left-0 whitespace-nowrap font-display text-[28vw] font-black italic uppercase leading-none text-white/[0.03]"
        >
          Variedades Benettiz Variedades
        </motion.p>

        {/* Glow behind the logo */}
        <motion.div
          aria-hidden
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-[14%] size-[46rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,45,45,0.42)_0%,rgba(227,20,28,0.14)_40%,transparent_70%)] lg:left-[28%]"
        />

        <Embers />

        <div className="relative z-10 mx-auto grid w-full max-w-[88rem] flex-1 items-center gap-10 px-4 pt-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          {/* Left: logo, tagline, actions */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              style={{ scale: logoScale, y: logoY, opacity: logoOpacity }}
              className="origin-center lg:origin-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease }}
                className="animate-flicker"
              >
                <h1 className="sr-only">Benettiz Variedades</h1>
                <Wordmark size="xl" />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: copyY, opacity: copyOpacity }}
              className="mt-8 flex flex-col items-center lg:items-start"
            >
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                className="max-w-[26ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold italic leading-[1.05] text-white"
              >
                Tudo o que você precisa, em um só lugar. Realize seus desejos!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              >
                <a
                  href="#area-restrita"
                  className="neon-ring-strong rounded-full bg-brand px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-brand-hot active:translate-y-0 active:scale-[0.98]"
                >
                  Acessar catálogo restrito
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-ring inline-flex items-center gap-2 rounded-full bg-surface/80 px-6 py-3.5 font-display text-lg font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-surface-2 active:translate-y-0"
                >
                  <MessageCircle className="size-5 text-[#25d366]" aria-hidden />
                  {WHATSAPP_DISPLAY}
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: product fan */}
          <div className="relative hidden h-[30rem] lg:block" aria-hidden>
            {fan.map((c, i) => (
              <FanCard key={c.p.id} card={c} index={i} progress={p} reduce={reduce} />
            ))}
          </div>
        </div>

        <motion.a
          href="#destaques"
          style={{ opacity: cueOpacity }}
          className="relative z-10 mx-auto mb-3 flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
        >
          Role para ver os destaques
          <ArrowDown className="size-4 animate-bounce text-brand-hot" aria-hidden />
        </motion.a>

        <div className="relative z-10">
          <PerkTicker />
        </div>
      </div>
    </section>
  );
}

function FanCard({
  card,
  index,
  progress,
  reduce,
}: {
  card: (typeof fan)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(progress, [0, 0.8], [card.x, reduce ? card.x : card.endX]);
  const y = useTransform(progress, [0, 0.8], [card.y, reduce ? card.y : card.endY]);
  const rotate = useTransform(progress, [0, 0.8], [card.rotate, reduce ? card.rotate : card.endRotate]);
  const scale = useTransform(progress, [0, 0.8], [index === 1 ? 1.05 : 0.92, 0.82]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25 + index * 0.12, ease }}
      className="absolute left-1/2 top-1/2 -ml-[8.5rem] -mt-[11rem]"
      style={{ zIndex: index === 1 ? 3 : 1 }}
    >
      <motion.figure
        style={{ x, y, rotate, scale }}
        className="neon-ring relative h-[22rem] w-[17rem] overflow-hidden rounded-2xl bg-surface"
      >
        <Image
          src={card.p.image}
          alt=""
          fill
          sizes="272px"
          priority
          className="object-cover brightness-[0.85] contrast-[1.08]"
          style={{ objectPosition: card.p.focus }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.92),transparent)]" />
        <figcaption className="absolute inset-x-0 bottom-0 p-4">
          <span className="font-display text-sm font-semibold uppercase tracking-wide text-brand-hot">
            {card.p.category}
          </span>
          <span className="block font-display text-2xl font-bold italic leading-tight text-white">
            {card.p.name}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
