"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import CTAButton from "@/components/CTAButton";
import { IconArrowRight, IconCheckCircle } from "@/components/icons";
import { useSimulator } from "@/context/SimulatorContext";
import { isValidEmail, isValidFrenchPhone } from "@/lib/validation";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  eligible: boolean;
  title?: string;
}

interface FormErrors {
  nom?: string;
  email?: string;
  telephone?: string;
}

export default function LeadForm({
  eligible,
  title = "Être recontacté(e) pour affiner votre projet",
}: LeadFormProps) {
  const router = useRouter();
  const { equipement, ageEquipement, codePostal, frequenceIntervention } =
    useSimulator();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const isFormValid =
    nom.trim().length > 0 && isValidEmail(email) && isValidFrenchPhone(telephone);

  function validateField(field: keyof FormErrors, value: string) {
    if (field === "nom") {
      return value.trim().length > 0 ? undefined : "Merci d'indiquer votre nom et prénom.";
    }
    if (field === "email") {
      return isValidEmail(value) ? undefined : "Merci d'indiquer un email valide.";
    }
    if (field === "telephone") {
      return isValidFrenchPhone(value)
        ? undefined
        : "Merci d'indiquer un numéro valide (10 chiffres ou +33).";
    }
    return undefined;
  }

  function handleBlur(field: keyof FormErrors, value: string) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  }

  async function handleSubmit() {
    const newErrors: FormErrors = {
      nom: validateField("nom", nom),
      email: validateField("email", email),
      telephone: validateField("telephone", telephone),
    };
    setErrors(newErrors);
    setTouched({ nom: true, email: true, telephone: true });

    if (newErrors.nom || newErrors.email || newErrors.telephone) return;

    setSubmitting(true);
    // Pas de nom/email/téléphone dans les propriétés envoyées à PostHog :
    // seuls les éléments de contexte du parcours sont trackés.
    const analyticsProperties = {
      eligible,
      equipement,
      ageEquipement,
      frequenceIntervention,
    };
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          codePostal,
          equipement,
          ageEquipement,
          frequenceIntervention,
          eligible,
        }),
      });
      trackEvent(AnalyticsEvent.LeadFormSubmitted, analyticsProperties);
    } catch (error) {
      console.error("[LeadForm] Échec de l'envoi du formulaire", error);
      trackEvent(AnalyticsEvent.LeadFormSubmitError, analyticsProperties);
    } finally {
      router.push("/merci");
    }
  }

  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_4px_14px_rgba(26,26,26,0.05)] sm:grid-cols-[minmax(0,1fr)_300px] sm:gap-8 sm:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-bold text-ink sm:text-2xl">{title}</h2>
          <p className="text-sm leading-relaxed text-gray-dark sm:text-base">
            Un conseiller HomeServe vous recontacte sous 24h pour affiner
            cette estimation gratuitement et vous accompagner dans votre
            projet.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <FormField
              id="nom"
              label="Nom et prénom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              onBlur={() => handleBlur("nom", nom)}
              error={touched.nom ? errors.nom : undefined}
              placeholder="Jean Dupont"
              autoComplete="name"
            />
          </div>

          <FormField
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email", email)}
            error={touched.email ? errors.email : undefined}
            placeholder="jean.dupont@email.fr"
            autoComplete="email"
          />

          <FormField
            id="telephone"
            type="tel"
            label="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            onBlur={() => handleBlur("telephone", telephone)}
            error={touched.telephone ? errors.telephone : undefined}
            placeholder="06 12 34 56 78"
            autoComplete="tel"
          />
        </div>

        <p className="max-w-[620px] text-[13px] leading-relaxed text-gray-dark sm:text-sm">
          En envoyant ce formulaire, vous acceptez d&apos;être recontacté(e)
          par HomeServe au sujet de votre projet. Vos données sont traitées
          conformément à notre{" "}
          <a href="#" className="font-semibold text-brand-red-dark">
            politique de confidentialité
          </a>
          .
        </p>

        <CTAButton
          disabled={!isFormValid || submitting}
          onClick={handleSubmit}
          className="sm:w-auto"
        >
          {submitting ? "Envoi en cours…" : "Être recontacté(e)"}
          {!submitting && <IconArrowRight size={19} />}
        </CTAButton>
      </div>

      <aside className="hidden flex-col gap-3.5 rounded-2xl bg-warm-white p-6 sm:flex">
        <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <IconCheckCircle size={18} className="shrink-0 text-success" />
          Sans engagement
        </span>
        <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <IconCheckCircle size={18} className="shrink-0 text-success" />
          Étude gratuite
        </span>
        <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <IconCheckCircle size={18} className="shrink-0 text-success" />
          Pros certifiés RGE
        </span>
        <div className="h-px bg-border" />
        <p className="text-sm leading-relaxed text-gray-dark">
          HomeServe s&apos;occupe des démarches administratives et avance les
          aides. Vous ne réglez que le reste à charge en fin de travaux.
        </p>
      </aside>
    </div>
  );
}
