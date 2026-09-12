interface LegalFooterProps {
  variant?: "default" | "resultat";
  className?: string;
}

const LINKS = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "Gestion des cookies", href: "#" },
];

export default function LegalFooter({
  variant = "default",
  className = "",
}: LegalFooterProps) {
  const text =
    variant === "resultat"
      ? "Montants indicatifs, hors étude technique. © 2026 HomeServe"
      : "© 2026 HomeServe — L'énergie est notre avenir, économisons-la !";

  return (
    <footer
      className={`flex flex-col items-center gap-2 border-t border-border px-5 py-4 text-center text-xs text-gray-mid sm:flex-row sm:justify-between sm:px-10 sm:py-5 sm:text-left sm:text-[13px] ${className}`}
    >
      <span>{text}</span>
      <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-x-[18px]">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-gray-dark no-underline hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </span>
    </footer>
  );
}
