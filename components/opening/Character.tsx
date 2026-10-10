export default function Character({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="img"
      aria-label="A cute illustrated bear holding a small gift"
    >
      <ellipse cx="110" cy="205" rx="60" ry="10" fill="#35251F" opacity="0.08" />
      {/* ears */}
      <circle cx="68" cy="55" r="22" fill="#D9B8B1" />
      <circle cx="152" cy="55" r="22" fill="#D9B8B1" />
      <circle cx="68" cy="55" r="11" fill="#9B3348" opacity="0.5" />
      <circle cx="152" cy="55" r="11" fill="#9B3348" opacity="0.5" />
      {/* head */}
      <circle cx="110" cy="100" r="62" fill="#D9B8B1" />
      {/* face blush */}
      <circle cx="78" cy="112" r="9" fill="#9B3348" opacity="0.35" />
      <circle cx="142" cy="112" r="9" fill="#9B3348" opacity="0.35" />
      {/* eyes */}
      <circle cx="90" cy="95" r="5" fill="#35251F" />
      <circle cx="130" cy="95" r="5" fill="#35251F" />
      {/* snout */}
      <ellipse cx="110" cy="118" rx="22" ry="16" fill="#F5EBDD" />
      <ellipse cx="110" cy="112" rx="6" ry="4" fill="#35251F" />
      <path d="M110 116 Q110 124 100 126" stroke="#35251F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M110 116 Q110 124 120 126" stroke="#35251F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="110" cy="190" rx="52" ry="38" fill="#D9B8B1" />
      {/* arm holding gift */}
      <ellipse cx="150" cy="178" rx="14" ry="20" fill="#D9B8B1" transform="rotate(25 150 178)" />
      {/* gift box */}
      <g transform="translate(150 150)">
        <rect x="-16" y="-14" width="32" height="28" rx="3" fill="#9B3348" />
        <rect x="-16" y="-3" width="32" height="6" fill="#F2E9FF" />
        <rect x="-3" y="-14" width="6" height="28" fill="#F2E9FF" />
        <path d="M-4 -14 Q-10 -24 -2 -22 Q2 -20 0 -14" fill="#F2E9FF" />
        <path d="M4 -14 Q10 -24 2 -22 Q-2 -20 0 -14" fill="#F2E9FF" />
      </g>
    </svg>
  );
}
