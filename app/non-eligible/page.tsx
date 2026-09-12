"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import LeadForm from "@/components/LeadForm";

export default function NonEligiblePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showBack />
      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        <h1 className="text-[28px] font-extrabold leading-tight text-ink">
          Votre équipement n&apos;est pas concerné par cette offre pour le
          moment
        </h1>

        <p className="text-base leading-relaxed text-gray-mid">
          Les alternatives proposées dans ce simulateur concernent les
          chaudières gaz/fioul et les PAC air-eau vieillissantes. Pour les
          autres équipements, nos conseillers peuvent vous orienter vers
          d&apos;autres solutions.
        </p>

        {!showForm && (
          <CTAButton variant="secondary" onClick={() => setShowForm(true)}>
            Être recontacté quand même →
          </CTAButton>
        )}

        {showForm && (
          <LeadForm
            eligible={false}
            title="Être recontacté(e) par un conseiller"
          />
        )}
      </main>
    </>
  );
}
