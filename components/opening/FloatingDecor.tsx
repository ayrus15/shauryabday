const petals = [
  { left: "6%", delay: 0, duration: 9, size: 18, color: "#9B3348" },
  { left: "18%", delay: 2, duration: 11, size: 14, color: "#D9B8B1" },
  { left: "32%", delay: 4, duration: 8, size: 20, color: "#344B40" },
  { left: "48%", delay: 1, duration: 10, size: 16, color: "#9B3348" },
  { left: "63%", delay: 3, duration: 12, size: 18, color: "#D9B8B1" },
  { left: "76%", delay: 5, duration: 9, size: 14, color: "#344B40" },
  { left: "88%", delay: 2.5, duration: 10, size: 20, color: "#9B3348" },
];

export default function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="float-petal"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24">
            <path
              d="M12 21s-7-5.2-9.5-9.5C.5 7.6 3.2 4 7 4c2 0 3.8 1.1 5 2.8C13.2 5.1 15 4 17 4c3.8 0 6.5 3.6 4.5 7.5C19 15.8 12 21 12 21z"
              fill={p.color}
              opacity="0.55"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
