export interface FilterState {
  bezirke: string[];
  stadtteile: string[];
  betreuungsart: ("krippe" | "elementar" | "hort")[];
  oeffnungszeiten: ("ganztag" | "teilzeit" | "erweitert")[];
  besonderheiten: string[];
  konzepte: string[];
  plaetzeFrei: "alle" | "frei" | "warteliste";
  radius: number | null; // in km, null = no radius filter
  sortierung: "relevanz" | "entfernung" | "alphabetisch";
}

export const initialFilters: FilterState = {
  bezirke: [],
  stadtteile: [],
  betreuungsart: [],
  oeffnungszeiten: [],
  besonderheiten: [],
  konzepte: [],
  plaetzeFrei: "alle",
  radius: null,
  sortierung: "relevanz",
};

export const betreuungsartOptionen = [
  { value: "krippe", label: "Krippe (0–3 Jahre)" },
  { value: "elementar", label: "Elementar (3–6 Jahre)" },
  { value: "hort", label: "Hort (6+ Jahre)" },
] as const;

export const oeffnungszeitenOptionen = [
  { value: "ganztag", label: "Ganztag" },
  { value: "teilzeit", label: "Teilzeit" },
  { value: "erweitert", label: "Erweiterte Zeiten (6–18 Uhr)" },
] as const;

export const besonderheitenOptionen = [
  { value: "Integrativ", label: "Integrativ" },
  { value: "Bio-Essen", label: "Bio-Essen" },
  { value: "Outdoor", label: "Outdoor / Naturpädagogik" },
  { value: "Bilingual", label: "Bilingual" },
  { value: "Bewegungsförderung", label: "Bewegungsförderung" },
  { value: "Musikalisch", label: "Musikalische Früherziehung" },
  { value: "Sprachförderung", label: "Sprachförderung" },
  { value: "Therapieangebote", label: "Therapieangebote" },
] as const;

export const konzeptOptionen = [
  { value: "Montessori", label: "Montessori" },
  { value: "Waldorf", label: "Waldorf" },
  { value: "Reggio", label: "Reggio" },
  { value: "Naturpädagogik", label: "Naturpädagogik" },
  { value: "Situationsansatz", label: "Situationsansatz" },
  { value: "Inklusion", label: "Inklusion" },
  { value: "Immersion", label: "Immersion / Bilingual" },
] as const;

export const radiusOptionen = [
  { value: null, label: "Kein Limit" },
  { value: 1, label: "1 km" },
  { value: 2, label: "2 km" },
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
] as const;

export const sortierungOptionen = [
  { value: "relevanz", label: "Relevanz" },
  { value: "entfernung", label: "Entfernung (nächste zuerst)" },
  { value: "alphabetisch", label: "Alphabetisch (A–Z)" },
] as const;
