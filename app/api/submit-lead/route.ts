import { NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/google-sheets";
import {
  isValidEmail,
  isValidFrenchPhone,
  isValidPostalCode,
} from "@/lib/validation";

const VALID_EQUIPEMENTS = [
  "chaudiere_gaz",
  "chaudiere_fioul",
  "pac_air_eau",
  "autre",
];
const VALID_AGES = ["moins_10", "10_15", "plus_15"];
const VALID_FREQUENCES = ["premiere", "2_3_fois", "plus_3_fois"];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const nom = typeof body.nom === "string" ? body.nom.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const telephone =
    typeof body.telephone === "string" ? body.telephone.trim() : "";
  const codePostal =
    typeof body.codePostal === "string" ? body.codePostal.trim() : "";
  const equipement =
    typeof body.equipement === "string" ? body.equipement : "";
  const ageEquipement =
    typeof body.ageEquipement === "string" ? body.ageEquipement : "";
  const frequenceIntervention =
    typeof body.frequenceIntervention === "string"
      ? body.frequenceIntervention
      : "";
  const eligible = body.eligible === true;

  if (!nom) {
    return NextResponse.json({ error: "Nom requis" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }
  if (!isValidFrenchPhone(telephone)) {
    return NextResponse.json(
      { error: "Téléphone invalide" },
      { status: 400 }
    );
  }
  if (codePostal && !isValidPostalCode(codePostal)) {
    return NextResponse.json(
      { error: "Code postal invalide" },
      { status: 400 }
    );
  }
  if (equipement && !VALID_EQUIPEMENTS.includes(equipement)) {
    return NextResponse.json(
      { error: "Équipement invalide" },
      { status: 400 }
    );
  }
  if (ageEquipement && !VALID_AGES.includes(ageEquipement)) {
    return NextResponse.json(
      { error: "Âge équipement invalide" },
      { status: 400 }
    );
  }
  if (
    frequenceIntervention &&
    !VALID_FREQUENCES.includes(frequenceIntervention)
  ) {
    return NextResponse.json(
      { error: "Fréquence intervention invalide" },
      { status: 400 }
    );
  }

  try {
    await appendLeadToSheet({
      nom,
      email,
      telephone,
      codePostal,
      equipement,
      ageEquipement,
      frequenceIntervention,
      eligible,
    });
  } catch (error) {
    // On ne bloque jamais l'utilisateur si l'écriture Google Sheets échoue :
    // on logue côté serveur et on laisse le parcours se poursuivre vers /merci.
    console.error("[submit-lead] Échec de l'écriture dans Google Sheets", error);
  }

  return NextResponse.json({ ok: true });
}
