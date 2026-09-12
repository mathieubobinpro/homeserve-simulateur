"use client";

import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({
  label,
  error,
  id,
  className = "",
  ...rest
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-[10px] border-[1.5px] bg-white px-4 py-3.5 text-base font-medium text-ink outline-none transition-colors placeholder:text-gray-400 ${
          error
            ? "border-brand-red"
            : "border-border-strong focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(232,68,44,0.15)]"
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-xs font-medium text-brand-red">{error}</p>}
    </div>
  );
}
