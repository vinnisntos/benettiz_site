import { cn } from "@/lib/cn";

type Props = { size?: "sm" | "xl"; className?: string };

/** Text version of the Benettiz logo: chrome caps + red script. */
export function Wordmark({ size = "sm", className }: Props) {
  const xl = size === "xl";
  return (
    <span
      className={cn("relative inline-flex select-none flex-col items-center leading-none", className)}
      aria-label="Benettiz Variedades"
      role="img"
    >
      <span
        className={cn(
          "text-chrome font-display font-black italic uppercase tracking-[-0.02em]",
          xl ? "text-[clamp(4.5rem,13vw,11.5rem)] -skew-x-6" : "text-[1.9rem] -skew-x-6",
        )}
      >
        Benettiz
      </span>
      <span
        className={cn(
          "text-script-brand font-script -rotate-3",
          xl ? "-mt-[0.32em] text-[clamp(2.4rem,6.4vw,5.6rem)]" : "-mt-[0.42em] text-[1.05rem]",
        )}
      >
        Variedades
      </span>
    </span>
  );
}
