"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { SelectableCard } from "@/components/Card";
import CTAButton from "@/components/CTAButton";
import FormField from "@/components/FormField";
import {
  useSimulator,
  type AgeEquipement,
  type FrequenceIntervention,
} from "@/context/SimulatorContext";
import { isValidPostalCode } from "@/lib/validation";

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
  const isComplete = Boolean(ageEquipement) && postalValid && Boolean(frequenceIntervention);

  return (
    <>
      <Header showBack />
      <main className="flex flex-1 flex-col gap-8 px-6 py-6">
        <h1 className="text-[28px] font-extrabold leading-tight text-ink">
          Quelques infos pour affiner votre estimation
        </h1>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-ink">
            Quel âge a votre équipement ?
          </h2>
          <div className="flex flex-col gap-3">
            {AGE_OPTIONS.map((option) => (
              <SelectableCard
                key={option.value}
                selected={ageEquipement === option.value}
                onClick={() => setAgeEquipement(option.value)}
              >
                {option.label}
              </SelectableCard>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-ink">Votre code postal</h2>
          <FormField
            id="codePostal"
            inputMode="numeric"
            maxLength={5}
            label=""
            placeholder="75001"
            value={codePostal}
            onChange={(e) =>
              setCodePostal(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))
            }
            error={
              codePostal.length > 0 && !postalValid
                ? "Merci d'indiquer un code postal à 5 chiffres."
                : undefined
            }
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-ink">
            Combien d&apos;interventions de dépannage avez-vous eu sur cet
            équipement ces 2 dernières années ?
          </h2>
          <div className="flex flex-col gap-3">
            {FREQUENCE_OPTIONS.map((option) => (
              <SelectableCard
                key={option.value}
                selected={frequenceIntervention === option.value}
                onClick={() => setFrequenceIntervention(option.value)}
              >
                {option.label}
              </SelectableCard>
            ))}
          </div>
        </section>

        <CTAButton
          disabled={!isComplete}
          onClick={() => router.push("/resultat")}
        >
          Voir mes alternatives →
        </CTAButton>
      </main>
    </>
  );
}
