export default function ConfidenceBar({ confidence }) {
  const color = confidence > 80 ? '#3B6D11' : confidence > 60 ? '#854F0B' : '#A32D2D';

  return (
    <div className="h-1 w-full bg-[#EBEBEB] dark:bg-[#252525] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${confidence}%`, background: color }}
      />
    </div>
  );
}
