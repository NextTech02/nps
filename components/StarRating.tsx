"use client";

import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-9 w-9 transition-transform duration-150 ${
        filled
          ? "fill-fcp-gold drop-shadow-[0_0_8px_rgba(223,159,0,0.45)]"
          : "fill-transparent"
      }`}
      stroke={filled ? "var(--color-fcp-gold)" : "var(--color-fcp-lavender)"}
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.77l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

export default function StarRating({ value, onChange }: Props) {
  const [hover, setHover] = useState(0);

  return (
    <div role="radiogroup" className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hover || value) >= star;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={String(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onFocus={() => setHover(star)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(star)}
            className="rounded-lg p-1 hover:scale-110 active:scale-95"
          >
            <Star filled={active} />
          </button>
        );
      })}
    </div>
  );
}
