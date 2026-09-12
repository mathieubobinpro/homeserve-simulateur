export interface LeadRow {
  nom: string;
  email: string;
  telephone: string;
  codePostal: string;
  equipement: string;
  ageEquipement: string;
  frequenceIntervention: string;
  eligible: boolean;
}

/**
 * Envoie le lead à Formspree (https://formspree.io). Chaque soumission
 * apparaît dans le dashboard Formspree du formulaire (export CSV possible)
 * et déclenche une notification email — aucune infrastructure à gérer.
 *
 * Configuration : créer un formulaire sur formspree.io, puis renseigner son
 * identifiant (visible dans l'URL du formulaire, https://formspree.io/f/<ID>)
 * dans la variable d'environnement FORMSPREE_FORM_ID.
 */
export async function submitLead(lead: LeadRow): Promise<void> {
  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    throw new Error("FORMSPREE_FORM_ID manquant");
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      Horodatage: new Date().toISOString(),
      Nom: lead.nom,
      Email: lead.email,
      "Téléphone": lead.telephone,
      "Code postal": lead.codePostal,
      "Équipement": lead.equipement,
      "Âge équipement": lead.ageEquipement,
      "Fréquence intervention": lead.frequenceIntervention,
      "Éligible": lead.eligible,
      _replyto: lead.email,
      _subject: `Nouveau lead HomeServe — ${lead.nom}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Formspree a répondu avec le statut ${response.status}: ${body}`
    );
  }
}
