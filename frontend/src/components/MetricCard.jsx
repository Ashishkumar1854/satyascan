export default function MetricCard({ value, label }) {
  return (
    <div className="bg-[#F5F5F3] dark:bg-[#1A1A1A] rounded-xl p-3 text-center">
      <p className="text-2xl font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">{value}</p>
      <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A] mt-1">{label}</p>
    </div>
  );
}
