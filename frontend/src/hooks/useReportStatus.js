import { useState, useEffect } from 'react';

const MOCK_STEPS = ['parsing', 'extracting', 'searching', 'verifying', 'building', 'complete'];

export function useReportStatus(reportId) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [searchProgress, setSearchProgress] = useState({ done: 0, total: 12 });
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    if (status === 'complete') return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= MOCK_STEPS.length - 1) {
          setStatus('complete');
          return MOCK_STEPS.length - 1;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (MOCK_STEPS[currentStepIndex] === 'searching') {
      const searchInterval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev.done >= prev.total) {
            clearInterval(searchInterval);
            return prev;
          }
          return { ...prev, done: prev.done + 1 };
        });
      }, 250); 
      return () => clearInterval(searchInterval);
    }
  }, [currentStepIndex]);

  return {
    currentStep: MOCK_STEPS[currentStepIndex],
    searchProgress,
    status
  };
}
