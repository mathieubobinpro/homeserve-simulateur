"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Equipement =
  | "chaudiere_gaz"
  | "chaudiere_fioul"
  | "pac_air_eau"
  | "autre";

export type AgeEquipement = "moins_10" | "10_15" | "plus_15";

export type FrequenceIntervention = "premiere" | "2_3_fois" | "plus_3_fois";

export interface SimulatorState {
  equipement: Equipement | null;
  ageEquipement: AgeEquipement | null;
  codePostal: string;
  frequenceIntervention: FrequenceIntervention | null;
}

const defaultState: SimulatorState = {
  equipement: null,
  ageEquipement: null,
  codePostal: "",
  frequenceIntervention: null,
};

const STORAGE_KEY = "homeserve-simulateur-state";

interface SimulatorContextValue extends SimulatorState {
  setEquipement: (value: Equipement) => void;
  setAgeEquipement: (value: AgeEquipement) => void;
  setCodePostal: (value: string) => void;
  setFrequenceIntervention: (value: FrequenceIntervention) => void;
  reset: () => void;
}

const SimulatorContext = createContext<SimulatorContextValue | undefined>(
  undefined
);

export function SimulatorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SimulatorState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydratation depuis sessionStorage au montage : le mismatch avec le
    // rendu serveur (qui n'a pas accès à sessionStorage) est intentionnel.
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState(JSON.parse(raw));
    } catch {
      // sessionStorage indisponible (navigation privée, etc.) : on garde l'état par défaut
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // stockage indisponible : la session ne survivra pas à un rechargement
    }
  }, [state, hydrated]);

  const value: SimulatorContextValue = {
    ...state,
    setEquipement: (value) => setState((s) => ({ ...s, equipement: value })),
    setAgeEquipement: (value) =>
      setState((s) => ({ ...s, ageEquipement: value })),
    setCodePostal: (value) => setState((s) => ({ ...s, codePostal: value })),
    setFrequenceIntervention: (value) =>
      setState((s) => ({ ...s, frequenceIntervention: value })),
    reset: () => setState(defaultState),
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const ctx = useContext(SimulatorContext);
  if (!ctx) {
    throw new Error("useSimulator doit être utilisé dans un SimulatorProvider");
  }
  return ctx;
}
