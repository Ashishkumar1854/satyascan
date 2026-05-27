import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import TrustScoreRing from '../components/TrustScoreRing';
import ClaimRow from '../components/ClaimRow';
import { downloadJSON } from '../utils/export';
import { getReport } from '../api/client';

export default function ResultsPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getReport(reportId);
        setReport(data);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Failed to load report');
      } finally {
        setLoading(false);
      }
    };
    if (reportId) {
      fetchReport();
    }
  }, [reportId]);
  
  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8 w-full mt-2 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="h-6 w-48 bg-black/10 dark:bg-white/10 rounded-md"></div>
            <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded-md"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-24 bg-black/10 dark:bg-white/10 rounded-lg"></div>
            <div className="h-9 w-32 bg-black/10 dark:bg-white/10 rounded-lg"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-black/10 dark:bg-white/10 rounded-xl"></div>
          ))}
        </div>
        
        <div className="flex flex-col gap-4 mt-4">
          <div className="h-4 w-24 bg-black/10 dark:bg-white/10 rounded-md mb-2"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-black/10 dark:bg-white/10 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error || !report) {
    return (
      <div className="p-6 max-w-3xl mx-auto flex flex-col items-center justify-center gap-6 w-full mt-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FCEBEB] dark:bg-[#A32D2D]/20 flex items-center justify-center mb-2">
          <span className="text-2xl">📄</span>
        </div>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] dark:text-[#F0F0F0]">Report Not Found</h2>
        <p className="text-[#6B6B6B] dark:text-[#9A9A9A] max-w-md">
          The report you are looking for does not exist or may have been deleted. It might be an old link or an invalid ID.
        </p>
        <div className="flex gap-4 mt-4">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-[#178BFF] hover:bg-[#0F7AE8] text-white text-sm font-medium rounded-lg transition-colors"
          >
            Go to Upload
          </button>
          <button 
            onClick={() => navigate('/history')}
            className="px-6 py-2.5 border border-black/10 dark:border-white/10 text-sm font-medium rounded-lg text-[#1A1A1A] dark:text-[#F0F0F0] hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A1A] transition-colors"
          >
            View History
          </button>
        </div>
      </div>
    );
  }
  
  const filteredClaims = (report.claims || []).filter(c => filter === 'ALL' || c.status === filter);
  
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
