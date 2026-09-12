"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SelectableCard } from "@/components/Card";
import { useSimulator, type Equipement } from "@/context/SimulatorContext";
import { IconDroplet, IconFlame, IconHelpCircle, IconWind } from "@/components/icons";

const OPTIONS: {
  value: Equipement;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "chaudiere_gaz",
    label: "Chaudière gaz",
    subtitle: "Murale ou au sol",
    icon: <IconFlame size={26} />,
  },
  {
    value: "chaudiere_fioul",
    label: "Chaudière fioul",
    subtitle: "Avec cuve",
    icon: <IconDroplet size={26} />,
  },
  {
    value: "pac_air_eau",
    label: "Pompe à chaleur air-eau",
    subtitle: "Unité extérieure reliée au chauffage",
    icon: <IconWind size={26} />,
  },
  {
    value: "autre",
    label: "Autre",
    subtitle: "PAC air-air, électrique, poêle…",
    icon: <IconHelpCircle size={26} />,
  },
];

export default function EquipementPage() {
  const router = useRouter();
  const { equipement, setEquipement } = useSimulator();

  function handleSelect(value: Equipement) {
    setEquipement(value);
    if (value === "autre") {
      router.push("/non-eligible");
    } else {
      router.push("/details");
    }
  }

  return (
    <>
      <Header showBack />
      <ProgressBar step={1} />
      <main className="flex flex-1 flex-col px-5 py-8 sm:px-10 sm:py-14">
        <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-3 sm:gap-4">
          <h1 className="text-[27px] font-extrabold leading-tight text-ink sm:text-[40px]">
            Quel est votre équipement actuel ?
          </h1>
          <p className="hidden text-[17px] leading-relaxed text-gray-dark sm:block">
            Une seule réponse. Vous pourrez revenir en arrière à tout moment.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-4">
            {OPTIONS.map((option) => (
              <SelectableCard
                key={option.value}
                icon={option.icon}
                subtitle={option.subtitle}
                selected={equipement === option.value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </SelectableCard>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
