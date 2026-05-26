export default function TrustScoreRing({ score }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#3B6D11' : score >= 40 ? '#854F0B' : '#A32D2D';

  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r={radius} fill="none" className="stroke-[#EBEBEB] dark:stroke-[#252525]" strokeWidth="5" />
      <circle
        cx="26" cy="26" r={radius} fill="none"
        stroke={color} strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
        className="transition-all duration-500"
      />
      <text x="26" y="30" textAnchor="middle" fontSize="12" fontWeight="500" className="fill-[#1A1A1A] dark:fill-[#F0F0F0]">
        {score}%
      </text>
    </svg>
  );
}
