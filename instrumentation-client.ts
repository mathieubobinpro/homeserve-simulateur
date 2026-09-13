import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    // Capture les changements de route côté client (navigation App Router)
    // comme des $pageview, sans composant dédié.
    capture_pageview: "history_change",
    // Tout ce qui suit est désactivé volontairement pour ne garder que le
    // strict nécessaire au suivi du parcours (pageviews + événements
    // explicites de lib/analytics.ts) — certaines de ces fonctionnalités
    // sont activées par défaut au niveau du projet PostHog lui-même
    // (indépendamment de ce fichier), d'où la nécessité de les couper ici :
    //
    // - autocapture : enregistre par défaut le contenu de tous les champs
    //   de formulaire (nom, email, téléphone sur l'écran /resultat).
    // - session recording : rejoue visuellement toute la session, avec un
    //   risque de masquage imparfait des champs sensibles.
    // - dead clicks / exceptions / surveys : hors périmètre demandé
    //   (suivi du parcours uniquement).
    autocapture: false,
    disable_session_recording: true,
    capture_dead_clicks: false,
    capture_exceptions: false,
    disable_surveys: true,
    person_profiles: "identified_only",
  });
} else if (process.env.NODE_ENV === "development") {
  console.warn(
    "[posthog] NEXT_PUBLIC_POSTHOG_KEY manquant : analytics désactivées."
  );
}
