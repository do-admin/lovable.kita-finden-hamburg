import { Baby, Users, GraduationCap, Clock, Heart, Leaf, Globe, MapPin, Calendar, Briefcase } from "lucide-react";
import { kitas } from "./kitas";
import type { LucideIcon } from "lucide-react";

export interface CategorySubItem {
  label: string;
  filterKey: string;
  filterValue: string;
  slug: string;
}

export interface BrowseCategory {
  id: string;
  title: string;
  slug: string;
  icon: LucideIcon;
  accentColor: string; // Tailwind bg class
  subItems: CategorySubItem[];
}

// Helper to count kitas matching a filter
export const getKitaCount = (filterKey: string, filterValue: string): number => {
  return kitas.filter((kita) => {
    if (filterKey === "betreuungsart") {
      return kita.betreuungsart.includes(filterValue as any);
    }
    if (filterKey === "oeffnungszeitenKategorie") {
      return kita.oeffnungszeitenKategorie === filterValue;
    }
    if (filterKey === "besonderheiten") {
      return kita.besonderheiten.includes(filterValue);
    }
    if (filterKey === "konzept") {
      return kita.konzept === filterValue;
    }
    if (filterKey === "bezirk") {
      return kita.bezirk === filterValue;
    }
    if (filterKey === "alter") {
      if (filterValue === "U3") return kita.alter.includes("0") || kita.alter.includes("1") || kita.alter.includes("2");
      if (filterValue === "Ü3") return kita.alter.includes("3") || kita.alter.includes("4") || kita.alter.includes("5");
      if (filterValue === "Vorschule") return kita.alter.includes("5") || kita.alter.includes("6");
    }
    return false;
  }).length;
};

// Configurable categories - can be swapped per city
export const browseCategories: BrowseCategory[] = [
  {
    id: "betreuungsform",
    title: "Betreuungsform",
    slug: "betreuungsform",
    icon: Baby,
    accentColor: "bg-blue-50",
    subItems: [
      { label: "Krippe", filterKey: "betreuungsart", filterValue: "krippe", slug: "krippe" },
      { label: "Elementar", filterKey: "betreuungsart", filterValue: "elementar", slug: "elementar" },
      { label: "Hort", filterKey: "betreuungsart", filterValue: "hort", slug: "hort" },
      { label: "Ganztag", filterKey: "oeffnungszeitenKategorie", filterValue: "ganztag", slug: "ganztag" },
    ],
  },
  {
    id: "paedagogik",
    title: "Pädagogik",
    slug: "paedagogik",
    icon: GraduationCap,
    accentColor: "bg-amber-50",
    subItems: [
      { label: "Montessori", filterKey: "konzept", filterValue: "Montessori", slug: "montessori" },
      { label: "Waldorf", filterKey: "konzept", filterValue: "Waldorf", slug: "waldorf" },
      { label: "Situationsansatz", filterKey: "konzept", filterValue: "Situationsansatz", slug: "situationsansatz" },
      { label: "Naturpädagogik", filterKey: "konzept", filterValue: "Naturpädagogik", slug: "naturpaedagogik" },
    ],
  },
  {
    id: "besonderheiten",
    title: "Besonderheiten",
    slug: "besonderheiten",
    icon: Heart,
    accentColor: "bg-rose-50",
    subItems: [
      { label: "Integrativ", filterKey: "besonderheiten", filterValue: "Integrativ", slug: "integrativ" },
      { label: "Bio-Essen", filterKey: "besonderheiten", filterValue: "Bio-Essen", slug: "bio-essen" },
      { label: "Außenbereich", filterKey: "besonderheiten", filterValue: "Außenbereich", slug: "aussenbereich" },
      { label: "Bilingual", filterKey: "besonderheiten", filterValue: "Bilingual", slug: "bilingual" },
    ],
  },
  {
    id: "stadtteile",
    title: "Stadtteile",
    slug: "stadtteile",
    icon: MapPin,
    accentColor: "bg-emerald-50",
    subItems: [
      { label: "Hamburg-Mitte", filterKey: "bezirk", filterValue: "Hamburg-Mitte", slug: "hamburg-mitte" },
      { label: "Altona", filterKey: "bezirk", filterValue: "Altona", slug: "altona" },
      { label: "Eimsbüttel", filterKey: "bezirk", filterValue: "Eimsbüttel", slug: "eimsbuettel" },
      { label: "Hamburg-Nord", filterKey: "bezirk", filterValue: "Hamburg-Nord", slug: "hamburg-nord" },
    ],
  },
  {
    id: "alter",
    title: "Altersgruppe",
    slug: "alter",
    icon: Users,
    accentColor: "bg-violet-50",
    subItems: [
      { label: "Unter 3 Jahre (U3)", filterKey: "alter", filterValue: "U3", slug: "u3" },
      { label: "Über 3 Jahre (Ü3)", filterKey: "alter", filterValue: "Ü3", slug: "ue3" },
      { label: "Vorschule", filterKey: "alter", filterValue: "Vorschule", slug: "vorschule" },
    ],
  },
  {
    id: "zeiten",
    title: "Öffnungszeiten",
    slug: "zeiten",
    icon: Clock,
    accentColor: "bg-sky-50",
    subItems: [
      { label: "Ganztagsbetreuung", filterKey: "oeffnungszeitenKategorie", filterValue: "ganztag", slug: "ganztag" },
      { label: "Teilzeit", filterKey: "oeffnungszeitenKategorie", filterValue: "teilzeit", slug: "teilzeit" },
      { label: "Erweiterte Zeiten", filterKey: "oeffnungszeitenKategorie", filterValue: "erweitert", slug: "erweitert" },
    ],
  },
];

// City configuration for URL generation
export interface CityConfig {
  slug: string;
  name: string;
}

export const defaultCity: CityConfig = {
  slug: "hamburg",
  name: "Hamburg",
};

// Generate category page URL
export const getCategoryUrl = (city: CityConfig, categorySlug: string): string => {
  return `/kita/${city.slug}/kategorie/${categorySlug}`;
};

// Generate sub-item URL (search with filters)
export const getSubItemUrl = (filterKey: string, filterValue: string): string => {
  return `/suche?${filterKey}=${encodeURIComponent(filterValue)}`;
};
