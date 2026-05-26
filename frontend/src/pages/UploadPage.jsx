import StatusBadge from '../components/StatusBadge';
import ConfidenceBar from '../components/ConfidenceBar';
import MetricCard from '../components/MetricCard';
import TrustScoreRing from '../components/TrustScoreRing';
import ClaimRow from '../components/ClaimRow';
import ProcessingSteps from '../components/ProcessingSteps';

export default function UploadPage() {
  const mockClaim = {
    id: "c1",
    claim: "India GDP grew 12% in 2024",
    status: "FALSE",
    confidence: 91,
    actualFact: "IMF data shows India GDP grew 6.8% in 2024",
    explanation: "Marked FALSE because IMF and World Bank data contradict the 12% figure",
    sources: [
      { name: "IMF World Economic Outlook", url: "https://imf.org/" }
    ]
  };

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
      <h1 className="text-xl font-medium text-[#1A1A1A] dark:text-[#F0F0F0] mb-4">Phase 2: Component Verification</h1>
      
      <section className="flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">1. StatusBadge</h2>
        <div className="flex gap-4">
          <StatusBadge status="VERIFIED" />
          <StatusBadge status="INACCURATE" />
          <StatusBadge status="FALSE" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">2. ConfidenceBar</h2>
        <div className="flex flex-col gap-2 max-w-sm">
          <ConfidenceBar confidence={95} />
          <ConfidenceBar confidence={65} />
          <ConfidenceBar confidence={30} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">3 & 4. MetricCard & TrustScoreRing</h2>
        <div className="flex gap-4">
          <MetricCard value={<TrustScoreRing score={85} />} label="Trust Score" />
          <MetricCard value="12" label="Claims Verified" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">5. ClaimRow</h2>
        <ClaimRow claim={mockClaim} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">6. ProcessingSteps</h2>
        <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-black/10 dark:border-white/10">
          <ProcessingSteps currentStep="searching" searchProgress={{ done: 7, total: 12 }} />
        </div>
      </section>
    </div>
  );
}
