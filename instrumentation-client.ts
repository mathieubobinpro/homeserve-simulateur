import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    // Capture les changements de route côté client (navigation App Router)
    // comme des $pageview, sans composant dédié.
    capture_pageview: "history_change",
    // Désactivé volontairement : l'autocapture de PostHog enregistre par
    // défaut le contenu des champs de formulaire (nom, email, téléphone
    // sur l'écran /resultat) sans les masquer. Le suivi du parcours passe
    // uniquement par les événements explicites de lib/analytics.ts.
    autocapture: false,
    person_profiles: "identified_only",
  });
} else if (process.env.NODE_ENV === "development") {
  console.warn(
    "[posthog] NEXT_PUBLIC_POSTHOG_KEY manquant : analytics désactivées."
  );
}
