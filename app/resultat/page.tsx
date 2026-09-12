"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import LegalFooter from "@/components/LegalFooter";
import { SuccessBadge } from "@/components/Badge";
import { IconInfo } from "@/components/icons";
import OfferCarousel from "@/components/OfferCarousel";
import LeadForm from "@/components/LeadForm";
import { useSimulator } from "@/context/SimulatorContext";
import { getOffersForEquipement, getResultTitle, type Offer } from "@/lib/offers";

function OfferCard({ offer }: { offer: Offer }) {
  const highlighted = Boolean(offer.badge);
  return (
    <div
      className={`flex h-full flex-col gap-3.5 rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_4px_14px_rgba(26,26,26,0.05)] sm:gap-4 sm:p-6 ${
        highlighted
          ? "sm:shadow-[0_1px_2px_rgba(26,26,26,0.04),0_6px_20px_rgba(26,26,26,0.06)]"
          : ""
      }`}
    >
      {offer.badge && <SuccessBadge>{offer.badge}</SuccessBadge>}
      <h3 className="text-xl font-bold leading-snug text-ink sm:text-[22px]">
        {offer.titre}
      </h3>

      <dl className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-bold tracking-wide text-gray-mid">
            COÛT ESTIMÉ
          </dt>
          <dd className="text-lg font-bold text-ink sm:text-[19px]">
            {offer.coutEstime}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-bold tracking-wide text-gray-mid">
            ÉCONOMIES ESTIMÉES
          </dt>
          <dd className="text-[15px] leading-relaxed text-ink sm:text-base">
            {offer.economiesEstimees}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-bold tracking-wide text-gray-mid">
            AIDES MOBILISABLES
          </dt>
          <dd className="text-[15px] leading-relaxed text-ink sm:text-base">
            {offer.aidesMobilisables}
          </dd>
        </div>
      </dl>

      {offer.sousTexte && (
        <p className="text-sm leading-relaxed text-gray-dark">
          {offer.sousTexte}
        </p>
      )}
    </div>
  );
}

export default function ResultatPage() {
  const router = useRouter();
  const { equipement, ageEquipement, frequenceIntervention } = useSimulator();

  useEffect(() => {
    if (!equipement || !ageEquipement || !frequenceIntervention) {
      router.replace("/equipement");
    }
  }, [equipement, ageEquipement, frequenceIntervention, router]);

  const offers = getOffersForEquipement(equipement);
  const title = getResultTitle(equipement);

  return (
    <>
      <Header showBack />
      <ProgressBar step={3} />
      <main className="flex flex-1 flex-col bg-warm-white px-5 py-7 sm:px-10 sm:py-12">
        <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-6 sm:gap-7">
          <div className="flex flex-col gap-3 sm:gap-3.5">
            <h1 className="text-[27px] font-extrabold leading-tight text-ink sm:text-[40px]">
              {title}
            </h1>

            {frequenceIntervention === "plus_3_fois" && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-success-light px-4 py-3.5 sm:max-w-[760px] sm:gap-3 sm:px-5">
                <IconInfo
                  size={18}
                  className="mt-0.5 shrink-0 text-success-text sm:h-5 sm:w-5"
                />
                <p className="text-[15px] font-medium leading-snug text-success-text sm:text-base sm:leading-relaxed">
                  Avec plus de 3 interventions en 2 ans, le coût cumulé de vos
                  réparations se rapproche du coût d&apos;un remplacement —
                  d&apos;autant plus avec les aides disponibles.
                </p>
              </div>
            )}
            {frequenceIntervention === "2_3_fois" && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-success-light px-4 py-3.5 sm:max-w-[760px] sm:gap-3 sm:px-5">
                <IconInfo
                  size={18}
                  className="mt-0.5 shrink-0 text-success-text sm:h-5 sm:w-5"
                />
                <p className="text-[15px] font-medium leading-snug text-success-text sm:text-base sm:leading-relaxed">
                  Les pannes répétées sont souvent le signe d&apos;un
                  équipement en fin de vie — un remplacement peut s&apos;avérer
                  plus rentable à moyen terme.
                </p>
              </div>
            )}
          </div>

          <div className="hidden sm:grid sm:grid-cols-3 sm:gap-5">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

          <OfferCarousel>
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </OfferCarousel>

          <LeadForm eligible={true} />
        </div>
      </main>
      <LegalFooter variant="resultat" className="bg-white" />
    </>
  );
}
