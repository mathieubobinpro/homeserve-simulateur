"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import LeadForm from "@/components/LeadForm";
import { IconArrowRight } from "@/components/icons";

export default function NonEligiblePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showBack />
      <main className="flex flex-1 flex-col px-5 py-8 sm:px-10 sm:py-14">
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
          <h1 className="text-[27px] font-extrabold leading-tight text-ink sm:text-[36px]">
            Votre équipement n&apos;est pas concerné par cette offre pour le
            moment
          </h1>

          <p className="text-base leading-relaxed text-gray-dark sm:text-[17px]">
            Les alternatives proposées dans ce simulateur concernent les
            chaudières gaz/fioul et les PAC air-eau vieillissantes. Pour les
            autres équipements, nos conseillers peuvent vous orienter vers
            d&apos;autres solutions.
          </p>

          {!showForm && (
            <CTAButton
              variant="secondary"
              onClick={() => setShowForm(true)}
              className="sm:w-auto"
            >
              Être recontacté quand même
              <IconArrowRight size={19} />
            </CTAButton>
          )}

          {showForm && (
            <LeadForm
              eligible={false}
              title="Être recontacté(e) par un conseiller"
            />
          )}
        </div>
      </main>
    </>
  );
}
