interface ReassuranceBadgesProps {
  items: string[];
}

export function ReassuranceBadges({ items }: ReassuranceBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-gray-mid">
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-1">
          {index > 0 && <span className="text-gray-mid">&middot;</span>}
          <CheckIcon />
          {item}
        </span>
      ))}
    </div>
  );
}

export function SuccessBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-2.5 py-1 text-xs font-semibold text-success">
      <CheckIcon />
      {children}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-success shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
