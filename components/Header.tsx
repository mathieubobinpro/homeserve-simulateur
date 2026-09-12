"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ showBack = false, onBack }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 px-5">
      {showBack && (
        <button
          type="button"
          aria-label="Retour"
          onClick={() => (onBack ? onBack() : router.back())}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      <div className="flex items-center gap-1.5 text-lg font-extrabold text-brand-red">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5 1.5 11h3V21h6v-6h3v6h6V11h3L12 2.5z" />
        </svg>
        <span>HomeServe</span>
      </div>
    </header>
  );
}
