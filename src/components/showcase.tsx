"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { categories, featured, type Product } from "@/data/products";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Pinned showcase: scrolling down pushes the product track to the LEFT,
 * while the vertical rail of category names runs DOWN — opposite directions.
 */
export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.35 });

  const trackX = useTransform(p, (v) => -v * distance);
  // Rail goes down while the track goes left. Range is half the duplicated list.
  const railY = useTransform(p, [0, 1], ["-50%", "0%"]);
  const barScale = useTransform(p, [0, 1], [0.04, 1]);

  // Cards lean into the scroll direction a little.
  const velocity = useVelocity(scrollYProgress);
  const skew = useSpring(useTransform(velocity, [-2, 0, 2], reduce ? [0, 0, 0] : [6, 0, -6]), {
    stiffness: 200,
    damping: 30,
  });

  return (
    <section
      ref={sectionRef}
      id="destaques"
      aria-labelledby="destaques-title"
      className="relative h-[280vh] bg-background"
    >
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden pt-20">
        <div className="mx-auto grid w-full max-w-[88rem] flex-1 min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-6 px-4 pb-6 sm:px-8 lg:grid-cols-[minmax(20rem,28rem)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-10">
          {/* Left: heading + vertical category rail */}
          <div className="flex min-h-0 flex-col gap-4 lg:gap-6 lg:py-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease }}
            >
              <h2
                id="destaques-title"
                className="font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-extrabold italic leading-[0.95] tracking-[-0.01em] text-white"
              >
                Produtos em destaque
              </h2>
              <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-white/85 lg:text-lg">
                Preços e condições ficam no catálogo restrito. Escolha o que quer e fale com a gente.
              </p>
            </motion.div>

            <CategoryRail y={railY} reduce={reduce} />
          </div>

          {/* Right: horizontal product track */}
          <div ref={viewportRef} className="mask-x relative flex min-h-0 items-center overflow-hidden lg:[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
            <motion.div
              ref={trackRef}
              style={{ x: reduce ? 0 : trackX }}
              className="flex h-[min(34rem,56vh)] gap-5 pl-[3%] will-change-transform lg:h-[min(34rem,64vh)] lg:gap-6"
            >
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} skew={skew} />
              ))}
              <CatalogCard />
            </motion.div>
          </div>
        </div>

        {/* Scroll progress */}
        <div className="mx-auto mb-6 w-full max-w-[88rem] px-4 sm:px-8">
          <div className="h-1 overflow-hidden rounded-full bg-surface-2">
            <motion.div style={{ scaleX: barScale }} className="h-full origin-left rounded-full bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRail({ y, reduce }: { y: MotionValue<string>; reduce: boolean }) {
  const words = [...categories, ...categories];
  return (
    <div
      aria-label="Categorias"
      className="mask-y relative h-[5rem] min-h-0 overflow-hidden lg:h-auto lg:flex-1"
    >
      <motion.div style={{ y: reduce ? 0 : y }} className="will-change-transform">
        <ul className="animate-marquee-down flex flex-col">
          {words.map((w, i) => (
            <li
              key={i}
              aria-hidden={i >= categories.length}
              className="group font-display text-[clamp(3rem,6.6vw,6rem)] font-black italic uppercase py-[0.04em] leading-[1] tracking-[-0.02em] pr-[0.2em]"
            >
              <a
                href="#destaques"
                tabIndex={i >= categories.length ? -1 : 0}
                className={
                  i % 2 === 0
                    ? "text-white transition-colors hover:text-brand-hot"
                    : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,45,45,0.85)] transition-colors hover:text-brand"
                }
              >
                {w}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function ProductCard({
  product,
  index,
  skew,
}: {
  product: Product;
  index: number;
  skew: MotionValue<number>;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index, 4) * 0.08, ease }}
      style={{ skewX: skew }}
      className="group neon-ring relative aspect-[3/4] h-full shrink-0 overflow-hidden rounded-2xl bg-surface transition-shadow duration-300 hover:neon-ring-strong"
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 26rem, 80vw"
        className="object-cover brightness-[0.82] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ objectPosition: product.focus }}
      />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_10%,transparent)]" />

      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 font-display text-sm font-bold uppercase tracking-wide text-white">
        <Lock className="size-3.5 text-brand-hot" aria-hidden />
        Restrito
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-base font-semibold uppercase tracking-wide text-brand-hot">
          {product.category} · {product.note}
        </p>
        <h3 className="mt-1 font-display text-[1.9rem] font-extrabold italic leading-[0.95] text-white">
          {product.name}
        </h3>
        <a
          href="#area-restrita"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-brand-hot"
        >
          Ver no catálogo
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </div>
    </motion.article>
  );
}

function CatalogCard() {
  return (
    <a
      href="#area-restrita"
      className="group relative flex aspect-[3/4] h-full shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-brand p-6 text-white transition-colors hover:bg-brand-hot"
    >
      <span className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-black italic uppercase leading-[0.9]">
        Tem muito mais no catálogo
      </span>
      <span className="inline-flex items-center gap-2 font-display text-xl font-bold uppercase">
        Acessar área restrita
        <ArrowRight className="size-6 transition-transform group-hover:translate-x-2" aria-hidden />
      </span>
    </a>
  );
}
