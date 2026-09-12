const TOTAL_STEPS = 3;

interface ProgressBarProps {
  step: 1 | 2 | 3;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4 border-b border-border px-5 py-3.5 sm:px-10 sm:py-[18px]">
      <span className="shrink-0 text-sm font-semibold text-gray-dark">
        Étape {step} sur {TOTAL_STEPS}
      </span>
      <span className="flex max-w-[420px] flex-1 gap-1.5">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < step ? "bg-brand-red" : "bg-border"
            }`}
          />
        ))}
      </span>
    </div>
  );
}
