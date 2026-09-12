export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidFrenchPhone(value: string): boolean {
  const normalized = value.trim().replace(/[\s.-]/g, "");
  // Accepte soit un format nominatif français (0X XX XX XX XX = 10 chiffres)
  // soit un format international (+33 suivi de 9 chiffres).
  return /^0\d{9}$/.test(normalized) || /^\+33\d{9}$/.test(normalized);
}

export function isValidPostalCode(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}
