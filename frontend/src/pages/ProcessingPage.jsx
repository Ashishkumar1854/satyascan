import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import ProcessingSteps from '../components/ProcessingSteps';
import { useReportStatus } from '../hooks/useReportStatus';

const STEP_PERCENTAGES = {
  parsing: 10,
  extracting: 25,
  searching: 55,
  verifying: 80,
  building: 95,
  complete: 100
};

export default function ProcessingPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentStep, searchProgress, status } = useReportStatus(reportId);

  const filename = location.state?.filename || 'document.pdf';
  const fileSize = location.state?.fileSize || null;

  useEffect(() => {
    if (status === 'complete') {
      const timer = setTimeout(() => {
        navigate(`/results/${reportId}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status, navigate, reportId]);

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const percentage = STEP_PERCENTAGES[currentStep] || 0;

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6 w-full mt-4">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EBEBEB] dark:bg-[#252525] flex items-center justify-center text-[#1A1A1A] dark:text-[#F0F0F0]">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">{filename}</h1>
            {fileSize && (
              <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">{formatFileSize(fileSize)}</p>
            )}
          </div>
        </div>
        
        {/* Processing Badge (amber/inaccurate colors) */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FAEEDA] text-[#854F0B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#854F0B] animate-pulse" />
          Processing
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-[#6B6B6B] dark:text-[#9A9A9A] mb-2">
          <span>Overall progress</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-[#EBEBEB] dark:bg-[#252525] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#178BFF] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Processing Steps Card */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-6">
        <ProcessingSteps currentStep={currentStep} searchProgress={searchProgress} />
      </div>

      {/* Estimated Time Card */}
      <div className="bg-[#F5F5F3] dark:bg-[#252525] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#6B6B6B] dark:text-[#9A9A9A] border border-black/5 dark:border-white/5">
        <Clock size={16} />
        <span>Estimated time: ~30 seconds</span>
      </div>

    </div>
  );
}
