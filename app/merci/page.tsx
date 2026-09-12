import Link from "next/link";
import Header from "@/components/Header";
import LegalFooter from "@/components/LegalFooter";
import { IconArrowRight, IconCheck } from "@/components/icons";

export default function MerciPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center gap-6 bg-cream px-5 py-12 text-center sm:gap-7 sm:py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light sm:h-[76px] sm:w-[76px]">
          <IconCheck size={30} className="text-success sm:h-9 sm:w-9" />
        </div>

        <h1 className="max-w-[720px] text-[29px] font-extrabold leading-tight text-ink sm:text-[46px]">
          Votre demande a bien été reçue
        </h1>

        <p className="max-w-[620px] text-base leading-relaxed text-gray-dark sm:text-[19px]">
          Un conseiller HomeServe vous recontacte sous 24 à 48h ouvrées pour
          étudier votre projet et vous présenter les solutions adaptées à
          votre situation.
        </p>

        <ul className="flex flex-col items-start gap-2.5 self-stretch text-[15px] font-semibold text-ink sm:items-center sm:gap-3 sm:text-[17px]">
          <li className="flex items-center gap-2">
            <IconCheck size={16} className="shrink-0 text-success sm:h-[18px] sm:w-[18px]" />
            Estimation personnalisée par un expert
          </li>
          <li className="flex items-center gap-2">
            <IconCheck size={16} className="shrink-0 text-success sm:h-[18px] sm:w-[18px]" />
            Aucun engagement de votre part
          </li>
          <li className="flex items-center gap-2">
            <IconCheck size={16} className="shrink-0 text-success sm:h-[18px] sm:w-[18px]" />
            Accompagnement simplifié de A à Z
          </li>
        </ul>

        <Link
          href="https://www.homeserve.fr/renovation-energetique"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[10px] border-[1.5px] border-brand-red bg-white px-7 text-base font-semibold text-brand-red-dark no-underline transition-colors hover:bg-brand-red-light sm:mt-4 sm:w-auto"
        >
          Découvrir nos conseils rénovation
          <IconArrowRight size={19} />
        </Link>
      </main>
      <LegalFooter />
    </>
  );
}
