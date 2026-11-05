"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/cn";

const links = [
  { label: "Início", href: "#inicio", active: true },
  { label: "Categorias", href: "#destaques", caret: true },
  { label: "VIP", href: "#vip" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/95" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[88rem] items-center justify-between px-4 sm:px-8">
        <a href="#inicio" className="shrink-0 transition-transform hover:scale-[1.03]">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={cn(
                "group relative flex items-center gap-1 text-[0.95rem] font-medium transition-colors",
                l.active ? "text-brand-hot" : "text-foreground/90 hover:text-white",
              )}
            >
              {l.label}
              {l.caret && <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-0.5 bg-brand-hot transition-all duration-300",
                  l.active ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#area-restrita"
            className="neon-ring hidden rounded-full bg-background/60 px-6 py-2.5 font-display text-[0.95rem] font-bold uppercase tracking-wide text-white transition-all hover:bg-brand hover:neon-ring-strong active:scale-95 sm:inline-flex"
          >
            Área restrita
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/5 bg-background px-4 pb-6 md:hidden" aria-label="Menu móvel">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-display text-2xl font-bold italic uppercase text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#area-restrita"
            className="mt-3 inline-flex rounded-full bg-brand px-6 py-3 font-display font-bold uppercase text-white"
          >
            Área restrita
          </a>
        </nav>
      )}
    </motion.header>
  );
}
