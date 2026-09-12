import type { Equipement } from "@/context/SimulatorContext";

/**
 * Toutes les fourchettes de prix, pourcentages d'économies et montants
 * d'aides affichés sur l'écran /resultat sont en dur ci-dessous.
 * Aucun calcul dynamique : pour changer les chiffres affichés aux
 * utilisateurs, modifier uniquement les valeurs de ce fichier.
 */

export interface Offer {
  id: "pac_air_eau" | "pac_hybride" | "pac_geothermique";
  titre: string;
  badge?: string;
  coutEstime: string;
  economiesEstimees: string;
  aidesMobilisables: string;
  sousTexte?: string;
}

export function getOffersForEquipement(equipement: Equipement | null): Offer[] {
  const pacAirEau: Offer = {
    id: "pac_air_eau",
    titre: "Pompe à chaleur air-eau",
    badge: "Solution la plus choisie",
    coutEstime: "8 000 € à 15 000 €",
    economiesEstimees: "Jusqu'à 50 % sur votre facture de chauffage",
    aidesMobilisables: "Jusqu'à 5 000 € (MaPrimeRénov') + Prime CEE",
    sousTexte:
      equipement === "chaudiere_fioul"
        ? "Dépose de cuve à fioul financée"
        : undefined,
  };

  const pacHybride: Offer = {
    id: "pac_hybride",
    titre: "Pompe à chaleur hybride",
    coutEstime: "10 000 € à 18 000 €",
    economiesEstimees: "30 à 45 % sur votre facture",
    aidesMobilisables: "Éligible MaPrimeRénov' + CEE",
    sousTexte: "Combine PAC + chaudière d'appoint — transition progressive",
  };

  const pacGeothermique: Offer = {
    id: "pac_geothermique",
    titre: "Pompe à chaleur géothermique",
    coutEstime: "15 000 € à 25 000 €",
    economiesEstimees: "Jusqu'à 65 % sur votre facture",
    aidesMobilisables: "Jusqu'à 11 000 € (MaPrimeRénov') + Prime CEE",
    sousTexte: "Idéal maison individuelle avec terrain",
  };

  if (equipement === "chaudiere_gaz" || equipement === "chaudiere_fioul") {
    return [pacAirEau, pacHybride, pacGeothermique];
  }

  // pac_air_eau (remplacement) ou cas par défaut : pas de carte hybride
  return [pacAirEau, pacGeothermique];
}

export function getResultTitle(equipement: Equipement | null): string {
  switch (equipement) {
    case "chaudiere_gaz":
      return "Alternatives à votre chaudière gaz";
    case "chaudiere_fioul":
      return "Alternatives à votre chaudière fioul";
    case "pac_air_eau":
      return "Remplacer votre PAC par un modèle plus performant";
    default:
      return "Vos alternatives de remplacement";
  }
}
