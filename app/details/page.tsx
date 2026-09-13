"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import CTAButton from "@/components/CTAButton";
import FormField from "@/components/FormField";
import { IconArrowRight, IconCheckCircle } from "@/components/icons";
import {
  useSimulator,
  type AgeEquipement,
  type FrequenceIntervention,
} from "@/context/SimulatorContext";
import { isValidPostalCode } from "@/lib/validation";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";

const AGE_OPTIONS: { value: AgeEquipement; label: string }[] = [
  { value: "moins_10", label: "Moins de 10 ans" },
  { value: "10_15", label: "Entre 10 et 15 ans" },
  { value: "plus_15", label: "Plus de 15 ans" },
];

const FREQUENCE_OPTIONS: { value: FrequenceIntervention; label: string }[] = [
  { value: "premiere", label: "C'est la première" },
  { value: "2_3_fois", label: "2 à 3 fois" },
  { value: "plus_3_fois", label: "Plus de 3 fois" },
];

export default function DetailsPage() {
  const router = useRouter();
  const {
    equipement,
    ageEquipement,
    setAgeEquipement,
    codePostal,
    setCodePostal,
    frequenceIntervention,
    setFrequenceIntervention,
  } = useSimulator();

  useEffect(() => {
    if (!equipement) router.replace("/equipement");
  }, [equipement, router]);

  const postalValid = isValidPostalCode(codePostal);
  const isComplete =
    Boolean(ageEquipement) && postalValid && Boolean(frequenceIntervention);

  function handleAgeSelect(value: AgeEquipement) {
    setAgeEquipement(value);
    trackEvent(AnalyticsEvent.AgeEquipementSelected, { ageEquipement: value });
  }

  function handleFrequenceSelect(value: FrequenceIntervention) {
    setFrequenceIntervention(value);
    trackEvent(AnalyticsEvent.FrequenceInterventionSelected, {
      frequenceIntervention: value,
    });
  }

  function handleSubmit() {
    trackEvent(AnalyticsEvent.DetailsCompleted, {
      equipement,
      ageEquipement,
      frequenceIntervention,
    });
    router.push("/resultat");
  }

  return (
    <>
      <Header showBack />
      <ProgressBar step={2} />
      <main className="flex flex-1 flex-col px-5 py-8 sm:px-10 sm:py-14">
        <div className="mx-auto grid w-full max-w-[1040px] gap-10 sm:grid-cols-[minmax(0,1fr)_320px] sm:gap-14">
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-1.5 sm:gap-2.5">
              <h1 className="text-[27px] font-extrabold leading-tight text-ink sm:text-[40px]">
                Quelques infos pour affiner votre estimation
              </h1>
              <p className="hidden text-[17px] leading-relaxed text-gray-dark sm:block">
                Trois questions. Aucune donnée n&apos;est transmise à ce
                stade.
              </p>
            </div>

            <section className="flex flex-col gap-3 sm:gap-3.5">
              <h2 className="text-[17px] font-bold text-ink sm:text-[19px]">
                Quel âge a votre équipement ?
              </h2>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {AGE_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleAgeSelect(option.value)}
                    className={`min-h-[52px] rounded-2xl border-2 px-4 py-3.5 text-left text-base font-semibold text-ink transition-colors sm:min-h-[60px] sm:text-center ${
                      ageEquipement === option.value
                        ? "border-brand-red bg-brand-red-light"
                        : "border-border bg-white hover:border-brand-red/30"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-3 sm:gap-3.5">
              <h2 className="max-w-[640px] text-[17px] font-bold leading-snug text-ink sm:text-[19px]">
                Combien d&apos;interventions de dépannage avez-vous eu sur cet
                équipement ces 2 dernières années ?
              </h2>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {FREQUENCE_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleFrequenceSelect(option.value)}
                    className={`min-h-[52px] rounded-2xl border-2 px-4 py-3.5 text-left text-base font-semibold text-ink transition-colors sm:min-h-[60px] sm:text-center ${
                      frequenceIntervention === option.value
                        ? "border-brand-red bg-brand-red-light"
                        : "border-border bg-white hover:border-brand-red/30"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-2 sm:gap-3.5">
              <h2 className="text-[17px] font-bold text-ink sm:text-[19px]">
                Votre code postal
              </h2>
              <FormField
                id="codePostal"
                inputMode="numeric"
                maxLength={5}
                label=""
                className="sm:w-[200px]"
                placeholder="75001"
                value={codePostal}
                onChange={(e) =>
                  setCodePostal(
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 5)
                  )
                }
                error={
                  codePostal.length > 0 && !postalValid
                    ? "Merci d'indiquer un code postal à 5 chiffres."
                    : undefined
                }
              />
              <p className="text-sm text-gray-dark">
                Pour identifier le Pro certifié RGE le plus proche.
              </p>
            </section>

            <CTAButton
              disabled={!isComplete}
              onClick={handleSubmit}
              className="sm:w-auto"
            >
              Voir mes alternatives
              <IconArrowRight size={19} />
            </CTAButton>
          </div>

          <aside className="hidden flex-col gap-4 rounded-2xl border border-border bg-warm-white p-6 sm:flex">
            <h3 className="text-[17px] font-bold text-ink">
              Pourquoi ces questions
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-dark">
              L&apos;âge et la fréquence des pannes déterminent si un
              remplacement devient plus rentable que la réparation. Le code
              postal sert à mobiliser les aides de votre secteur.
            </p>
            <div className="h-px bg-border" />
            <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <IconCheckCircle size={18} className="shrink-0 text-success" />
              Pros certifiés RGE
            </span>
            <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <IconCheckCircle size={18} className="shrink-0 text-success" />
              Un Pro à moins de 30 km
            </span>
            <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <IconCheckCircle size={18} className="shrink-0 text-success" />
              Aides avancées par HomeServe
            </span>
          </aside>
        </div>
      </main>
    </>
  );
}
