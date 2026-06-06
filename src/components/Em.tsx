export type EmState = 'idle' | 'pointing' | 'clapping' | 'napping' | 'mid-step';
export type EmSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_PX: Record<EmSize, number> = {
  sm: 16,
  md: 40,
  lg: 96,
  xl: 240,
};

const STROKE_WIDTH: Record<EmSize, number> = {
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 2.5,
};

const DEFAULT_LABELS: Record<EmState, string> = {
  idle: 'Em, your music guide',
  pointing: 'Em pointing, drawing your attention',
  clapping: 'Em clapping, celebrating',
  napping: 'Em napping, resting between sessions',
  'mid-step': 'Em mid-step, moving through the journey',
};

interface EmProps {
  state?: EmState;
  size?: EmSize;
  ariaLabel?: string;
  className?: string;
}

export default function Em({
  state = 'idle',
  size = 'md',
  ariaLabel,
  className,
}: EmProps) {
  const px = SIZE_PX[size];
  const sw = STROKE_WIDTH[size];
  const label = ariaLabel ?? DEFAULT_LABELS[state];

  // Viewbox is 24x48 — a slim upright figure
  // Coordinate system: head at top, feet at bottom
  // Head center: (12, 6), radius 4
  // Torso: (12, 10) to (12, 28)
  // Hips: (12, 28)
  // Left leg: to (8, 42)  Right leg: to (16, 42)
  // Arms hang from (12, 14)

  return (
    <svg
      role="img"
      aria-label={label}
      width={px}
      height={px * 2}
      viewBox="0 0 24 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Head — two small eye dots shared by all states */}
      <circle cx="12" cy="6" r="3.5" />
      <circle cx="10.5" cy="5.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="5.5" r="0.4" fill="currentColor" stroke="none" />

      {/* idle: standing, claves in both hands */}
      {state === 'idle' && (
        <g>
          {/* torso */}
          <line x1="12" y1="9.5" x2="12" y2="28" />
          {/* left arm down, holding clave */}
          <line x1="12" y1="15" x2="6" y2="22" />
          <line x1="6" y1="22" x2="4" y2="27" />
          {/* right arm down, holding clave */}
          <line x1="12" y1="15" x2="18" y2="22" />
          <line x1="18" y1="22" x2="20" y2="27" />
          {/* left leg */}
          <line x1="12" y1="28" x2="8" y2="40" />
          {/* right leg */}
          <line x1="12" y1="28" x2="16" y2="40" />
          {/* feet */}
          <line x1="8" y1="40" x2="6" y2="42" />
          <line x1="16" y1="40" x2="18" y2="42" />
        </g>
      )}

      {/* pointing: one hand raised toward something */}
      {state === 'pointing' && (
        <g>
          {/* torso */}
          <line x1="12" y1="9.5" x2="12" y2="28" />
          {/* left arm up, pointing */}
          <line x1="12" y1="14" x2="5" y2="8" />
          <line x1="5" y1="8" x2="3" y2="5" />
          {/* right arm at side */}
          <line x1="12" y1="15" x2="18" y2="22" />
          <line x1="18" y1="22" x2="19" y2="26" />
          {/* left leg */}
          <line x1="12" y1="28" x2="8" y2="40" />
          {/* right leg */}
          <line x1="12" y1="28" x2="16" y2="40" />
          {/* feet */}
          <line x1="8" y1="40" x2="6" y2="42" />
          <line x1="16" y1="40" x2="18" y2="42" />
        </g>
      )}

      {/* clapping: both hands together in front */}
      {state === 'clapping' && (
        <g>
          {/* torso */}
          <line x1="12" y1="9.5" x2="12" y2="28" />
          {/* left arm toward center */}
          <line x1="12" y1="14" x2="10" y2="20" />
          <line x1="10" y1="20" x2="12" y2="22" />
          {/* right arm toward center */}
          <line x1="12" y1="14" x2="14" y2="20" />
          <line x1="14" y1="20" x2="12" y2="22" />
          {/* hands meet */}
          <circle cx="12" cy="22" r="1" />
          {/* left leg */}
          <line x1="12" y1="28" x2="8" y2="40" />
          {/* right leg */}
          <line x1="12" y1="28" x2="16" y2="40" />
          {/* feet */}
          <line x1="8" y1="40" x2="6" y2="42" />
          <line x1="16" y1="40" x2="18" y2="42" />
        </g>
      )}

      {/* napping: head tilted, arms resting, eye dots closed */}
      {state === 'napping' && (
        <g>
          {/* tilted head — override eye dots with closed lines */}
          <line x1="10" y1="5.5" x2="11" y2="5.5" strokeWidth={sw * 0.8} />
          <line x1="13" y1="5.5" x2="14" y2="5.5" strokeWidth={sw * 0.8} />
          {/* torso slight lean */}
          <line x1="12" y1="9.5" x2="11" y2="28" />
          {/* left arm resting down */}
          <line x1="11.5" y1="15" x2="7" y2="24" />
          <line x1="7" y1="24" x2="6" y2="28" />
          {/* right arm resting down */}
          <line x1="11.5" y1="15" x2="16" y2="23" />
          <line x1="16" y1="23" x2="17" y2="27" />
          {/* left leg */}
          <line x1="11" y1="28" x2="8" y2="40" />
          {/* right leg */}
          <line x1="11" y1="28" x2="15" y2="40" />
          {/* feet */}
          <line x1="8" y1="40" x2="6" y2="42" />
          <line x1="15" y1="40" x2="17" y2="42" />
          {/* zzz */}
          <text
            x="16"
            y="4"
            fontSize="3"
            fill="currentColor"
            stroke="none"
            fontFamily="sans-serif"
          >
            z
          </text>
        </g>
      )}

      {/* mid-step: one foot lifted, arms out for balance */}
      {state === 'mid-step' && (
        <g>
          {/* torso slight forward lean */}
          <line x1="12" y1="9.5" x2="13" y2="28" />
          {/* left arm out for balance */}
          <line x1="12.5" y1="14" x2="5" y2="18" />
          <line x1="5" y1="18" x2="3" y2="22" />
          {/* right arm out */}
          <line x1="12.5" y1="15" x2="19" y2="19" />
          <line x1="19" y1="19" x2="21" y2="23" />
          {/* grounded left leg */}
          <line x1="13" y1="28" x2="9" y2="41" />
          {/* lifted right leg — bent at knee */}
          <line x1="13" y1="28" x2="17" y2="36" />
          <line x1="17" y1="36" x2="21" y2="38" />
          {/* left foot flat */}
          <line x1="9" y1="41" x2="7" y2="43" />
          {/* right foot raised */}
          <line x1="21" y1="38" x2="23" y2="39" />
        </g>
      )}
    </svg>
  );
}
