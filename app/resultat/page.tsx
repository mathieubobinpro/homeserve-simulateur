"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Card } from "@/components/Card";
import { SuccessBadge } from "@/components/Badge";
import LeadForm from "@/components/LeadForm";
import { useSimulator } from "@/context/SimulatorContext";
import { getOffersForEquipement, getResultTitle } from "@/lib/offers";

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
      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        <h1 className="text-[26px] font-extrabold leading-tight text-ink">
          {title}
        </h1>

        {frequenceIntervention === "plus_3_fois" && (
          <div className="rounded-2xl bg-success-light px-4 py-3 text-sm font-medium text-success">
            Avec plus de 3 interventions en 2 ans, le coût cumulé de vos
            réparations se rapproche du coût d&apos;un remplacement —
            d&apos;autant plus avec les aides disponibles.
          </div>
        )}
        {frequenceIntervention === "2_3_fois" && (
          <div className="rounded-2xl bg-success-light px-4 py-3 text-sm font-medium text-success">
            Les pannes répétées sont souvent le signe d&apos;un équipement en
            fin de vie — un remplacement peut s&apos;avérer plus rentable à
            moyen terme.
          </div>
        )}

        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="flex min-w-[78%] flex-col gap-3 sm:min-w-0"
            >
              {offer.badge && <SuccessBadge>{offer.badge}</SuccessBadge>}
              <h2 className="text-lg font-bold text-ink">{offer.titre}</h2>

              <dl className="flex flex-col gap-2 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Coût estimé</dt>
                  <dd className="text-gray-mid">{offer.coutEstime}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">
                    Économies estimées
                  </dt>
                  <dd className="text-gray-mid">{offer.economiesEstimees}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">
                    Aides mobilisables
                  </dt>
                  <dd className="text-gray-mid">{offer.aidesMobilisables}</dd>
                </div>
              </dl>

              {offer.sousTexte && (
                <p className="text-xs italic text-gray-mid">
                  {offer.sousTexte}
                </p>
              )}
            </Card>
          ))}
        </div>

        <LeadForm eligible={true} />
      </main>
    </>
  );
}
