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
        className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-[10px] border-[1.5px] border-brand-red bg-white px-6 text-center text-base font-semibold text-brand-red transition-colors hover:bg-brand-red-light disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-white disabled:text-gray-400 ${className}`}
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
      className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-[10px] bg-brand-red px-6 text-center text-base font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
