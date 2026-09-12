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
        className={`rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-gray-400 ${
          error
            ? "border-brand-red"
            : "border-gray-300 focus:border-brand-red"
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-xs font-medium text-brand-red">{error}</p>}
    </div>
  );
}
