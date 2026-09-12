"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import CTAButton from "@/components/CTAButton";
import { ReassuranceBadges } from "@/components/Badge";
import { useSimulator } from "@/context/SimulatorContext";
import { isValidEmail, isValidFrenchPhone } from "@/lib/validation";

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
    } catch (error) {
      console.error("[LeadForm] Échec de l'envoi du formulaire", error);
    } finally {
      router.push("/merci");
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-gray-mid">
          Un conseiller HomeServe vous recontacte sous 24h pour affiner cette
          estimation gratuitement et vous accompagner dans votre projet.
        </p>
      </div>

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

      <p className="text-xs text-gray-mid">
        En envoyant ce formulaire, vous acceptez d&apos;être recontacté(e) par
        HomeServe au sujet de votre projet.
      </p>

      <CTAButton
        disabled={!isFormValid || submitting}
        onClick={handleSubmit}
      >
        {submitting ? "Envoi en cours…" : "Être recontacté(e) →"}
      </CTAButton>

      <ReassuranceBadges
        items={["Sans engagement", "Étude gratuite", "Déjà client HomeServe"]}
      />
    </div>
  );
}
