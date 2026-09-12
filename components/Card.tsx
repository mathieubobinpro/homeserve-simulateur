"use client";

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_4px_14px_rgba(26,26,26,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

interface SelectableCardProps {
  children: ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function SelectableCard({
  children,
  subtitle,
  icon,
  selected = false,
  onClick,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3.5 rounded-2xl border-2 bg-white p-4 text-left shadow-[0_1px_2px_rgba(26,26,26,0.04)] transition-colors sm:gap-[18px] sm:rounded-2xl sm:p-6 ${
        selected
          ? "border-brand-red bg-brand-red-light/40"
          : "border-border hover:border-brand-red/30"
      }`}
    >
      {icon && (
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${
            selected
              ? "bg-brand-red-light text-brand-red-dark"
              : "bg-neutral-icon text-gray-dark"
          }`}
        >
          {icon}
        </span>
      )}
      <span className="flex flex-col gap-0.5 sm:gap-1">
        <span className="text-base font-bold text-ink sm:text-lg">
          {children}
        </span>
        {subtitle && (
          <span className="text-sm text-gray-dark">{subtitle}</span>
        )}
      </span>
    </button>
  );
}
