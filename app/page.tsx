"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import { ReassuranceBadges } from "@/components/Badge";

export default function AccueilPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col justify-center gap-8 px-6 py-10">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-red">
            Encore une panne ?
          </p>
          <h1 className="text-[32px] font-extrabold leading-tight text-ink sm:text-4xl">
            Et si on regardait les alternatives plutôt que de réparer une fois
            de plus ?
          </h1>
          <p className="text-base leading-relaxed text-gray-mid">
            En 30 secondes, découvrez les solutions de remplacement adaptées
            à votre équipement — avec coût estimé, économies projetées et
            aides disponibles.
          </p>
        </div>

        <CTAButton onClick={() => router.push("/equipement")}>
          Découvrir mes options →
        </CTAButton>

        <ReassuranceBadges
          items={[
            "Sans engagement",
            "Réponse immédiate",
            "Déjà client HomeServe",
          ]}
        />
      </main>
    </>
  );
}
