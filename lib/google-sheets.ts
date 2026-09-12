import { google } from "googleapis";

const SHEET_HEADERS = [
  "Horodatage",
  "Nom",
  "Email",
  "Téléphone",
  "Code postal",
  "Équipement",
  "Âge équipement",
  "Fréquence intervention",
  "Éligible",
];

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

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!email || !privateKey) {
    throw new Error(
      "Variables d'environnement Google Service Account manquantes"
    );
  }

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function ensureHeaderRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string
) {
  const range = "A1:I1";
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const hasHeaders = existing.data.values && existing.data.values.length > 0;
  if (!hasHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: [SHEET_HEADERS] },
    });
  }
}

export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID manquant");
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await ensureHeaderRow(sheets, spreadsheetId);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A1",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          lead.nom,
          lead.email,
          lead.telephone,
          lead.codePostal,
          lead.equipement,
          lead.ageEquipement,
          lead.frequenceIntervention,
          lead.eligible ? "true" : "false",
        ],
      ],
    },
  });
}
