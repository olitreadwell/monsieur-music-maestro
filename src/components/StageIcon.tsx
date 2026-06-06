interface StageIconProps {
  stage: number; // 0-8
  size?: number; // default 20
  className?: string;
}

export default function StageIcon({ stage, size = 20, className }: StageIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {stage === 0 && (
        // Speaker shape
        <g>
          <rect x="2" y="7" width="5" height="6" rx="0.5" />
          <path d="M7 8 L12 5 L12 15 L7 12 Z" />
          <path d="M14 7 Q17 10 14 13" />
          <path d="M15.5 5 Q20 10 15.5 15" />
        </g>
      )}

      {stage === 1 && (
        // Heart outline
        <path d="M10 16 C10 16 2 11 2 6 C2 3.5 4 2 6 2 C8 2 10 4 10 4 C10 4 12 2 14 2 C16 2 18 3.5 18 6 C18 11 10 16 10 16 Z" />
      )}

      {stage === 2 && (
        // Two clapping hands
        <g>
          {/* left hand */}
          <path d="M5 12 C4 11 3 9 4 7 C5 5 7 6 7 7 L8 10" />
          <path d="M7 7 C7 5 8 4 9 5" />
          <path d="M8 6 C8 4 9 3 10 4" />
          <path d="M8 10 C8 12 9 14 8 16" />
          {/* right hand */}
          <path d="M15 12 C16 11 17 9 16 7 C15 5 13 6 13 7 L12 10" />
          <path d="M13 7 C13 5 12 4 11 5" />
          <path d="M12 6 C12 4 11 3 10 4" />
          <path d="M12 10 C12 12 11 14 12 16" />
        </g>
      )}

      {stage === 3 && (
        // Two crossed claves (sticks)
        <g>
          <line x1="4" y1="16" x2="16" y2="4" strokeWidth="2.5" />
          <line x1="16" y1="16" x2="4" y2="4" strokeWidth="2.5" />
        </g>
      )}

      {stage === 4 && (
        // Three numbered footprints (1, 2, 3)
        <g>
          {/* footprint 1 */}
          <ellipse cx="5" cy="15" rx="2" ry="3" />
          <text x="4" y="15.5" fontSize="4" fill="currentColor" stroke="none" fontFamily="sans-serif" textAnchor="middle">1</text>
          {/* footprint 2 */}
          <ellipse cx="10" cy="10" rx="2" ry="3" />
          <text x="10" y="10.5" fontSize="4" fill="currentColor" stroke="none" fontFamily="sans-serif" textAnchor="middle">2</text>
          {/* footprint 3 */}
          <ellipse cx="15" cy="5" rx="2" ry="3" />
          <text x="15" y="5.5" fontSize="4" fill="currentColor" stroke="none" fontFamily="sans-serif" textAnchor="middle">3</text>
        </g>
      )}

      {stage === 5 && (
        // Conga drum
        <g>
          <path d="M6 4 L14 4 L16 16 Q10 18 4 16 Z" />
          <ellipse cx="10" cy="4" rx="4" ry="1.5" />
          <line x1="6" y1="7" x2="14" y2="7" strokeWidth="1" />
        </g>
      )}

      {stage === 6 && (
        // Record sleeve circle
        <g>
          <circle cx="10" cy="10" r="8" />
          <circle cx="10" cy="10" r="4" />
          <circle cx="10" cy="10" r="1" />
          <line x1="6.5" y1="6.5" x2="8.5" y2="8.5" strokeWidth="0.8" />
          <line x1="13.5" y1="11.5" x2="11.5" y2="11.5" strokeWidth="0.8" />
        </g>
      )}

      {stage === 7 && (
        // Salsa basic step diagram (footprint pattern)
        <g>
          {/* foot markers for salsa basic: forward, side, together */}
          <ellipse cx="7" cy="16" rx="2.5" ry="1.5" />
          <ellipse cx="13" cy="12" rx="2.5" ry="1.5" />
          <ellipse cx="7" cy="8" rx="2.5" ry="1.5" />
          <ellipse cx="13" cy="4" rx="2.5" ry="1.5" />
          {/* directional arrows */}
          <path d="M7 14 L7 10" strokeWidth="1" />
          <path d="M13 10 L13 6" strokeWidth="1" />
        </g>
      )}

      {stage === 8 && (
        // Turntable
        <g>
          {/* platter */}
          <circle cx="9" cy="11" r="7" />
          <circle cx="9" cy="11" r="2.5" />
          <circle cx="9" cy="11" r="0.7" fill="currentColor" stroke="none" />
          {/* tonearm */}
          <line x1="16" y1="4" x2="13" y2="8" />
          <circle cx="16" cy="4" r="1" />
          <circle cx="12.5" cy="8.5" r="0.8" />
          {/* mixer/pitch slider */}
          <rect x="16" y="8" width="3" height="9" rx="0.5" />
          <line x1="16.5" y1="12" x2="18.5" y2="12" />
        </g>
      )}
    </svg>
  );
}
