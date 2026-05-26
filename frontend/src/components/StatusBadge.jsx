export default function StatusBadge({ status }) {
  if (status === 'VERIFIED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EAF3DE] text-[#3B6D11]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11]" />
        Verified
      </span>
    );
  }
  if (status === 'FALSE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FCEBEB] text-[#A32D2D]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A32D2D]" />
        False
      </span>
    );
  }
  if (status === 'INACCURATE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FAEEDA] text-[#854F0B]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#854F0B]" />
        Inaccurate
      </span>
    );
  }
  return null;
}
