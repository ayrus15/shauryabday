const petals = [
  { left: "4%", delay: 0, duration: 8, size: 20, color: "#D6305C", shape: "heart" as const },
  { left: "14%", delay: 2, duration: 10, size: 16, color: "#F6A9BD", shape: "star" as const },
  { left: "24%", delay: 4, duration: 7.5, size: 22, color: "#1F9D6E", shape: "heart" as const },
  { left: "34%", delay: 1, duration: 9, size: 14, color: "#FFC43D", shape: "star" as const },
  { left: "46%", delay: 3, duration: 11, size: 18, color: "#D6305C", shape: "heart" as const },
  { left: "58%", delay: 0.5, duration: 8.5, size: 16, color: "#1F9D6E", shape: "star" as const },
  { left: "68%", delay: 5, duration: 9.5, size: 20, color: "#F6A9BD", shape: "heart" as const },
  { left: "78%", delay: 2.5, duration: 10.5, size: 14, color: "#FFC43D", shape: "star" as const },
  { left: "88%", delay: 1.5, duration: 8, size: 18, color: "#D6305C", shape: "heart" as const },
  { left: "95%", delay: 4.5, duration: 9, size: 16, color: "#1F9D6E", shape: "star" as const },
];

const heartPath =
  "M12 21s-7-5.2-9.5-9.5C.5 7.6 3.2 4 7 4c2 0 3.8 1.1 5 2.8C13.2 5.1 15 4 17 4c3.8 0 6.5 3.6 4.5 7.5C19 15.8 12 21 12 21z";
const starPath = "M12 2 L14.6 9 L22 9 L16 13.6 L18 21 L12 16.6 L6 21 L8 13.6 L2 9 L9.4 9 Z";

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
            <path d={p.shape === "heart" ? heartPath : starPath} fill={p.color} opacity="0.85" />
          </svg>
        </span>
      ))}
    </div>
  );
}
