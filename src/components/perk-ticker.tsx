import { Car, Bike, Smartphone, Headphones, Gamepad2, Lock, Truck, MessageCircle } from "lucide-react";
import { perks } from "@/data/products";

const icons = [Car, Bike, Smartphone, Headphones, Gamepad2, Lock, Truck, MessageCircle];

/** Strip of chips that drifts to the right, opposite to the product track. */
export function PerkTicker() {
  const row = perks.map((p, i) => ({ label: p, Icon: icons[i % icons.length] }));
  return (
    <div className="mask-x relative overflow-hidden bg-background/80 py-3.5">
      <div className="animate-marquee-right flex w-max gap-3 pr-3">
        {[...row, ...row].map(({ label, Icon }, i) => (
          <span
            key={i}
            aria-hidden={i >= row.length}
            className="neon-ring inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-surface px-4 py-2 font-display text-[0.95rem] font-semibold uppercase tracking-wide text-white/90"
          >
            <Icon className="size-4 text-brand-hot" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
