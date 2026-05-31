interface MatchScoreRingProps {
  percentage: number;
  size?: number;
}

export const MatchScoreRing = ({ percentage, size = 140 }: MatchScoreRingProps) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage >= 75 ? '#c8ff1a' :
    percentage >= 50 ? '#facc15' :
    '#f87171';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2a2a50"
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-700 text-2xl" style={{ color }}>
          {percentage}%
        </span>
        <span className="text-xs text-ink-400 font-body">match</span>
      </div>
    </div>
  );
};
