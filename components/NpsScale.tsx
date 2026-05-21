"use client";

type Props = {
  value: number;
  onChange: (value: number) => void;
  lowLabel: string;
  highLabel: string;
};

export default function NpsScale({
  value,
  onChange,
  lowLabel,
  highLabel,
}: Props) {
  return (
    <div role="radiogroup" className="flex flex-col gap-3">
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={String(n)}
              onClick={() => onChange(n)}
              className={`aspect-square rounded-xl border text-base font-semibold transition-all duration-150 ${
                selected
                  ? "border-fcp-gold bg-fcp-gold text-fcp-night shadow-[0_0_14px_rgba(223,159,0,0.45)] scale-105"
                  : "border-fcp-purple-2/60 bg-fcp-purple/40 text-white hover:border-fcp-lavender hover:bg-fcp-purple-2/60"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-fcp-lavender-2">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
