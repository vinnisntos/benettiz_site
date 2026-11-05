// Deterministic pseudo-random so server and client markup match.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const EMBERS = Array.from({ length: 34 }, (_, i) => ({
  left: rand(i + 1) * 100,
  size: 1.5 + rand(i + 50) * 3,
  duration: 6 + rand(i + 100) * 9,
  delay: -rand(i + 150) * 15,
  drift: (rand(i + 200) - 0.5) * 160,
}));

export function Embers({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
