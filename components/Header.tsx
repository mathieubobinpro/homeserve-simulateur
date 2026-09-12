"use client";

import { useRouter } from "next/navigation";
import { IconChevronLeft, IconPhone } from "@/components/icons";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  showServicePhone?: boolean;
}

export default function Header({
  showBack = false,
  onBack,
  showServicePhone = false,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-[58px] shrink-0 items-center justify-between border-b border-border bg-white px-5 sm:h-[76px] sm:px-10">
      <div className="flex items-center gap-3 sm:gap-5">
        {showBack && (
          <button
            type="button"
            aria-label="Retour"
            onClick={() => (onBack ? onBack() : router.back())}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-border bg-white text-ink transition-colors hover:bg-warm-white"
          >
            <IconChevronLeft size={20} />
          </button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/homeserve-logo.svg"
          alt="HomeServe"
          className="block h-7 w-auto sm:h-9"
        />
      </div>

      {showServicePhone && (
        <span className="hidden items-center gap-2 rounded-lg border border-dashed border-border-strong px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gray-mid sm:inline-flex">
          <IconPhone size={15} />
          N° SERVICE CLIENT
        </span>
      )}
    </header>
  );
}
