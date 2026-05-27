import { useState, useEffect } from 'react';
import { getReportStatus } from '../api/client';

export function useReportStatus(reportId) {
  const [currentStep, setCurrentStep] = useState('parsing');
  const [searchProgress, setSearchProgress] = useState({ done: 0, total: 0 });
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'complete' || status === 'error') return;

    const interval = setInterval(async () => {
      try {
        const data = await getReportStatus(reportId);
        if (data.currentStep) setCurrentStep(data.currentStep);
        if (data.status) setStatus(data.status);
        if (data.progress) setSearchProgress(data.progress);
      } catch (err) {
        console.error('Error polling status:', err);
        setError(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [reportId, status]);

  return {
    currentStep,
    searchProgress,
    status,
    error
  };
}
