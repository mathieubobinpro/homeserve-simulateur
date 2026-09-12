import Link from "next/link";
import Header from "@/components/Header";

export default function MerciPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-[28px] font-extrabold leading-tight text-ink">
          Votre demande a bien été reçue
        </h1>

        <p className="text-base leading-relaxed text-gray-mid">
          Un conseiller HomeServe vous recontacte sous 24 à 48h ouvrées pour
          étudier votre projet et vous présenter les solutions adaptées à
          votre situation.
        </p>

        <ul className="flex flex-col gap-2 text-sm font-medium text-ink">
          <li className="flex items-center gap-2">
            <CheckDot /> Estimation personnalisée par un expert
          </li>
          <li className="flex items-center gap-2">
            <CheckDot /> Aucun engagement de votre part
          </li>
          <li className="flex items-center gap-2">
            <CheckDot /> Accompagnement simplifié de A à Z
          </li>
        </ul>

        <Link
          href="https://www.homeserve.fr/renovation-energetique"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full rounded-full border-2 border-brand-red px-6 py-3.5 text-center text-base font-semibold text-brand-red transition-colors hover:bg-brand-red/5"
        >
          Découvrir nos conseils rénovation →
        </Link>
      </main>
    </>
  );
}

function CheckDot() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-success"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
