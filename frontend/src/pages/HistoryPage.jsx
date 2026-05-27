import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Inbox, Upload } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/date';
import { getAllReports } from '../api/client';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getAllReports();
        setHistory(data);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getWorstStatus = (summary) => {
    if (summary.false > 0) return { status: 'FALSE', count: summary.false };
    if (summary.inaccurate > 0) return { status: 'INACCURATE', count: summary.inaccurate };
    return { status: 'VERIFIED', count: summary.verified };
  };

  if (!history || history.length === 0) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#EBEBEB] dark:bg-[#252525] flex items-center justify-center text-[#9A9A9A] dark:text-[#6B6B6B]">
          <Inbox size={32} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">No reports yet</h2>
          <p className="text-sm text-[#6B6B6B] dark:text-[#9A9A9A] mt-1">Upload a PDF to get started</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-[#178BFF] hover:bg-[#0F7AE8] text-white text-sm font-medium rounded-lg transition-colors mt-2"
        >
          <Upload size={16} />
          Upload a PDF
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6 w-full mt-2">
      <h1 className="text-xl font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">Previous reports</h1>
      
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#9A9A9A] mb-3">
          Recent checks
        </p>
        
        <div className="flex flex-col gap-3">
          {history.map((report) => {
            const worst = getWorstStatus(report.summary);
            
            return (
              <div
                key={report.id}
                onClick={() => navigate(`/results/${report.id}`)}
                className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F5F3] dark:bg-[#252525] flex items-center justify-center text-[#6B6B6B] dark:text-[#9A9A9A] shrink-0">
                  <FileText size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] text-[#1A1A1A] dark:text-[#F0F0F0] truncate">
                    {report.filename}
                  </p>
                  <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A] truncate mt-0.5">
                    {formatDate(report.createdAt)} · {report.summary.total} claims · Trust score {report.trustScore}%
                  </p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-[#6B6B6B] dark:text-[#9A9A9A]">{worst.count}</span>
                  <StatusBadge status={worst.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
