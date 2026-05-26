import { Globe, AlertTriangle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ConfidenceBar from './ConfidenceBar';

export default function ClaimRow({ claim }) {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">{claim.claim}</p>
        <StatusBadge status={claim.status} />
      </div>

      {claim.actualFact && (
        <div className="flex items-start gap-2 bg-[#F5F5F3] dark:bg-[#252525] p-3 rounded-lg text-sm text-[#6B6B6B] dark:text-[#F0F0F0]">
          <AlertTriangle size={16} className="text-[#854F0B] shrink-0 mt-0.5" />
          <p>{claim.actualFact}</p>
        </div>
      )}

      {claim.explanation && (
        <p className="text-sm text-[#6B6B6B] dark:text-[#9A9A9A]">{claim.explanation}</p>
      )}

      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex-1 max-w-[200px]">
          <div className="flex justify-between text-xs text-[#9A9A9A] mb-1">
            <span>Confidence</span>
            <span>{claim.confidence}%</span>
          </div>
          <ConfidenceBar confidence={claim.confidence} />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {claim.sources?.map((source, idx) => (
            <a 
              key={idx} 
              href={source.url} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-black/10 dark:border-white/10 text-xs text-[#6B6B6B] dark:text-[#9A9A9A] hover:bg-[#F5F5F3] dark:hover:bg-[#252525] transition-colors"
            >
              <Globe size={12} />
              {source.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
