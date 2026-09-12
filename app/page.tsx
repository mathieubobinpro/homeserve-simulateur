"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import LegalFooter from "@/components/LegalFooter";
import { ReassuranceBadges } from "@/components/Badge";
import { IconArrowRight, IconFlame } from "@/components/icons";

export default function AccueilPage() {
  const router = useRouter();

  return (
    <>
      <Header showServicePhone />
      <main className="flex flex-1 flex-col">
        <div className="grid gap-8 bg-cream px-5 py-8 sm:grid-cols-[1fr_520px] sm:items-center sm:gap-16 sm:px-10 sm:py-16">
          <div className="flex flex-col gap-4 sm:gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-brand-red-dark sm:text-sm">
              <IconFlame size={15} />
              Votre chauffage vous lâche encore ?
            </p>
            <h1 className="text-[31px] font-extrabold leading-[1.14] tracking-tight text-ink sm:text-[52px] sm:leading-[1.08]">
              Et si remplacer coûtait moins cher que réparer ?
            </h1>
            <p className="text-base leading-relaxed text-gray-dark sm:max-w-[560px] sm:text-[19px]">
              En 30 secondes, découvrez les solutions de remplacement
              adaptées à votre équipement — avec coût estimé, économies
              projetées et aides disponibles.
            </p>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/homeserve-pro.avif"
              alt="Un Pro HomeServe devant son véhicule d'intervention"
              className="block h-[190px] w-full rounded-2xl object-cover object-[50%_28%] sm:hidden"
            />

            <div className="flex flex-col gap-3.5 sm:mt-2 sm:flex-row sm:items-center sm:gap-5">
              <CTAButton
                onClick={() => router.push("/equipement")}
                className="sm:w-auto"
              >
                Découvrir mes options
                <IconArrowRight size={19} />
              </CTAButton>
              <span className="hidden text-[15px] text-gray-dark sm:inline">
                30 secondes, 3 questions
              </span>
            </div>

            <ReassuranceBadges
              items={["Sans engagement", "Réponse immédiate", "Pros certifiés RGE"]}
            />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/homeserve-pro.avif"
            alt="Un Pro HomeServe devant son véhicule d'intervention"
            className="hidden h-[420px] w-full rounded-2xl object-cover object-[50%_30%] sm:block"
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-2 bg-ink px-5 py-5 text-white sm:flex-row sm:items-center sm:gap-8 sm:px-10 sm:py-6">
          <p className="text-base font-semibold leading-relaxed sm:text-[19px]">
            Jusqu&apos;à 10 800 € d&apos;aides pour une pompe à chaleur
            air-eau — déduites directement de votre devis.
          </p>
          <span className="shrink-0 text-[13px] text-gray-mid">
            Aucune avance à faire
          </span>
        </div>
      </main>
      <LegalFooter />
    </>
  );
}
