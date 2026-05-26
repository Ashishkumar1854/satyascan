import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import TrustScoreRing from '../components/TrustScoreRing';
import ClaimRow from '../components/ClaimRow';
import { downloadJSON } from '../utils/export';

const MOCK_REPORT = {
  id: "mock-123",
  filename: "marketing-report-2024.pdf",
  createdAt: new Date().toISOString(),
  trustScore: 42,
  summary: { verified: 5, inaccurate: 3, false: 4, total: 12 },
  claims: [
    {
      id: "c1",
      claim: "India GDP grew 12% in 2024",
      status: "FALSE",
      confidence: 91,
      actualFact: "IMF data shows India GDP grew 6.8% in 2024",
      explanation: "Marked FALSE because IMF and World Bank data contradict the 12% figure",
      sources: [{ name: "IMF.org", url: "https://imf.org" }, { name: "World Bank", url: "https://worldbank.org" }]
    },
    {
      id: "c2",
      claim: "Global EV sales surpassed 10M in 2023",
      status: "VERIFIED",
      confidence: 97,
      actualFact: "",
      explanation: "Confirmed by IEA Global EV Outlook 2023",
      sources: [{ name: "IEA.org", url: "https://iea.org" }]
    },
    {
      id: "c3",
      claim: "ChatGPT reached 100M users in 2 months",
      status: "INACCURATE",
      confidence: 84,
      actualFact: "ChatGPT reached 100M users in Jan 2023, but now has 200M+ users as of 2024",
      explanation: "The original milestone is real but the stat is outdated",
      sources: [{ name: "Reuters", url: "https://reuters.com" }]
    },
    {
      id: "c4",
      claim: "Global inflation hit 18% in 2023",
      status: "FALSE",
      confidence: 95,
      actualFact: "Global inflation was approximately 6.8% in 2023 per IMF",
      explanation: "Marked FALSE because IMF data shows 6.8%, not 18%",
      sources: [{ name: "IMF", url: "https://imf.org" }]
    }
  ]
};

export default function ResultsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');
  
  const report = MOCK_REPORT;
  
  const filteredClaims = report.claims.filter(c => filter === 'ALL' || c.status === filter);
  
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const Tab = ({ label, count, value }) => {
    const isActive = filter === value;
    return (
      <button
        onClick={() => setFilter(value)}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive 
            ? 'bg-[#EBEBEB] dark:bg-[#252525] text-[#1A1A1A] dark:text-[#F0F0F0]' 
            : 'text-[#6B6B6B] dark:text-[#9A9A9A] hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A1A]'
        }`}
      >
        {label} ({count})
      </button>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8 w-full mt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">{report.filename}</h1>
          <p className="text-sm text-[#6B6B6B] dark:text-[#9A9A9A]">Analyzed on {formatDate(report.createdAt)}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => downloadJSON(report, `report-${report.id}`)}
            className="flex items-center gap-2 px-4 py-2 border border-black/10 dark:border-white/10 text-sm font-medium rounded-lg text-[#1A1A1A] dark:text-[#F0F0F0] hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A1A] transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-[#178BFF] hover:bg-[#0F7AE8] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Check another PDF
          </button>
        </div>
      </div>
      
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          value={<div className="flex justify-center"><TrustScoreRing score={report.trustScore} /></div>} 
          label="Trust Score" 
        />
        <MetricCard value={report.summary.verified} label="Verified" />
        <MetricCard value={report.summary.inaccurate} label="Inaccurate" />
        <MetricCard value={report.summary.false} label="False" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-6">
        
        {/* Filter Tabs & Section Label */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#9A9A9A] mb-3">
            Claims Found
          </p>
          <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-3 overflow-x-auto">
            <Tab label="All" count={report.summary.total} value="ALL" />
            <Tab label="Verified" count={report.summary.verified} value="VERIFIED" />
            <Tab label="Inaccurate" count={report.summary.inaccurate} value="INACCURATE" />
            <Tab label="False" count={report.summary.false} value="FALSE" />
          </div>
        </div>

        {/* Claims List */}
        <div className="flex flex-col gap-4">
          {filteredClaims.length > 0 ? (
            filteredClaims.map(claim => (
              <ClaimRow key={claim.id} claim={claim} />
            ))
          ) : (
            <div className="py-8 text-center text-[#6B6B6B] dark:text-[#9A9A9A] text-sm">
              No claims found for this filter.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
