"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function CTAButton({
  children,
  variant = "primary",
  disabled,
  className = "",
  ...rest
}: CTAButtonProps) {
  if (variant === "secondary") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={`w-full rounded-full border-2 border-brand-red px-6 py-3.5 text-center text-base font-semibold text-brand-red transition-colors hover:bg-brand-red/5 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-full rounded-full bg-brand-red px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
