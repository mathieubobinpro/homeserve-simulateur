import posthog from "posthog-js";

/**
 * Liste des événements du parcours simulateur. Centralisé ici pour garder
 * les noms cohérents entre les écrans — voir chaque appel de trackEvent
 * dans /app pour le contexte d'usage.
 */
export const AnalyticsEvent = {
  SimulateurStarted: "simulateur_started",
  EquipementSelected: "equipement_selected",
  AgeEquipementSelected: "age_equipement_selected",
  FrequenceInterventionSelected: "frequence_intervention_selected",
  DetailsCompleted: "details_completed",
  ResultatViewed: "resultat_viewed",
  LeadFormSubmitted: "lead_form_submitted",
  LeadFormSubmitError: "lead_form_submit_error",
  NonEligibleViewed: "non_eligible_viewed",
  NonEligibleRecontactClicked: "non_eligible_recontact_clicked",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

export function trackEvent(
  name: AnalyticsEventName,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  posthog.capture(name, properties);
}
