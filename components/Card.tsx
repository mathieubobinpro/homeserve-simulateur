"use client";

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

interface SelectableCardProps {
  children: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function SelectableCard({
  children,
  icon,
  selected = false,
  onClick,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-colors ${
        selected
          ? "border-brand-red"
          : "border-transparent hover:border-brand-red/30"
      }`}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span className="text-base font-semibold text-ink">{children}</span>
    </button>
  );
}
