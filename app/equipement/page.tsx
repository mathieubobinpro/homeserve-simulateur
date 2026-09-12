"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { SelectableCard } from "@/components/Card";
import { useSimulator, type Equipement } from "@/context/SimulatorContext";

const OPTIONS: { value: Equipement; label: string; icon: string }[] = [
  { value: "chaudiere_gaz", label: "Chaudière gaz", icon: "🔥" },
  { value: "chaudiere_fioul", label: "Chaudière fioul", icon: "🛢️" },
  { value: "pac_air_eau", label: "Pompe à chaleur air-eau", icon: "💨" },
  { value: "autre", label: "Autre (PAC air-air, électrique...)", icon: "❓" },
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
      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        <h1 className="text-[28px] font-extrabold leading-tight text-ink">
          Quel est votre équipement actuel ?
        </h1>

        <div className="flex flex-col gap-3">
          {OPTIONS.map((option) => (
            <SelectableCard
              key={option.value}
              icon={option.icon}
              selected={equipement === option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </SelectableCard>
          ))}
        </div>
      </main>
    </>
  );
}
