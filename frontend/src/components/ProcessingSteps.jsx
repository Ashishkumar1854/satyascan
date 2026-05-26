import { Check, Loader2 } from 'lucide-react';

export const PROCESSING_STEPS = [
  { id: 1, label: 'Parsing PDF text',          apiStatus: 'parsing'     },
  { id: 2, label: 'Extracting factual claims', apiStatus: 'extracting'  },
  { id: 3, label: 'Searching live web sources',apiStatus: 'searching'   },
  { id: 4, label: 'Verifying claims with AI',  apiStatus: 'verifying'   },
  { id: 5, label: 'Building report',           apiStatus: 'building'    },
];

export default function ProcessingSteps({ currentStep, searchProgress }) {
  const currentIndex = PROCESSING_STEPS.findIndex(s => s.apiStatus === currentStep);

  return (
    <div className="flex flex-col gap-4">
      {PROCESSING_STEPS.map((step, index) => {
        const isDone = currentIndex > index || currentStep === 'complete';
        const isActive = currentIndex === index && currentStep !== 'complete';
        const isPending = currentIndex < index;

        return (
          <div key={step.id} className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              {isDone && (
                <div className="w-6 h-6 rounded-full bg-[#EAF3DE] text-[#3B6D11] flex items-center justify-center">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              {isActive && (
                <div className="w-6 h-6 rounded-full bg-[#EBEBEB] dark:bg-[#252525] text-[#178BFF] flex items-center justify-center">
                  <Loader2 size={14} className="animate-spin" />
                </div>
              )}
              {isPending && (
                <div className="w-6 h-6 rounded-full bg-[#F5F5F3] dark:bg-[#1A1A1A] text-[#9A9A9A] border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-medium">
                  {step.id}
                </div>
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${isPending ? 'text-[#9A9A9A]' : 'text-[#1A1A1A] dark:text-[#F0F0F0]'}`}>
                {step.label}
              </p>
              {isActive && step.apiStatus === 'searching' && searchProgress && (
                <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
                  ({searchProgress.done} of {searchProgress.total})
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
