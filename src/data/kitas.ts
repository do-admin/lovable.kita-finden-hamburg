export interface KitaDetail {
  id: number;
  name: string;
  bezirk: string;
  stadtteil: string;
  traeger: string;
  traegerArt: "städtisch" | "freier Träger" | "kirchlich" | "Elterninitiative";
  status: "frei" | "warteliste";
  statusText: string;
  
  // Quick info
  alter: string;
  plaetze: number;
  betreuungszeiten: string;
  konzept: string;
  googleBewertung?: number;
  
  // Contact
  adresse: string;
  telefon: string;
  email: string;
  website?: string;
  oeffnungszeiten: string;
  ferienregelung: string;
  
  // Details
  elternbeitrag: string;
  beschreibung: string[];
  schwerpunkte: string[];
  
  // Images
  heroImage: string;
  galerie: string[];

  // NEW: Extended fields for search/filtering
  coordinates: {
    lat: number;
    lng: number;
  };
  betreuungsart: ("krippe" | "elementar" | "hort")[];
  oeffnungszeitenKategorie: "ganztag" | "teilzeit" | "erweitert";
  besonderheiten: string[];
  tags: string[];
}

// All Hamburg districts and neighborhoods for SEO pages
export const hamburgerBezirke = {
  "Hamburg-Mitte": ["St. Pauli", "Altstadt", "Neustadt", "St. Georg", "Hammerbrook", "Borgfelde", "Hamm", "Horn", "Billstedt", "Billbrook", "Rothenburgsort", "Veddel", "Wilhelmsburg", "Kleiner Grasbrook", "Steinwerder", "Waltershof", "Finkenwerder", "HafenCity"],
  "Altona": ["Altona-Altstadt", "Altona-Nord", "Ottensen", "Bahrenfeld", "Groß Flottbek", "Othmarschen", "Lurup", "Osdorf", "Nienstedten", "Blankenese", "Iserbrook", "Sülldorf", "Rissen"],
  "Eimsbüttel": ["Eimsbüttel", "Rotherbaum", "Harvestehude", "Hoheluft-West", "Lokstedt", "Niendorf", "Schnelsen", "Eidelstedt", "Stellingen"],
  "Hamburg-Nord": ["Winterhude", "Uhlenhorst", "Hohenfelde", "Barmbek-Süd", "Barmbek-Nord", "Dulsberg", "Ohlsdorf", "Fuhlsbüttel", "Alsterdorf", "Groß Borstel", "Eppendorf", "Langenhorn"],
  "Wandsbek": ["Wandsbek", "Eilbek", "Marienthal", "Jenfeld", "Tonndorf", "Farmsen-Berne", "Bramfeld", "Steilshoop", "Wellingsbüttel", "Sasel", "Poppenbüttel", "Hummelsbüttel", "Lemsahl-Mellingstedt", "Duvenstedt", "Wohldorf-Ohlstedt", "Bergstedt", "Volksdorf", "Rahlstedt"],
  "Bergedorf": ["Bergedorf", "Lohbrügge", "Curslack", "Altengamme", "Neuengamme", "Kirchwerder", "Ochsenwerder", "Reitbrook", "Allermöhe", "Billwerder", "Moorfleet", "Tatenberg", "Spadenland"],
  "Harburg": ["Harburg", "Neuland", "Gut Moor", "Wilstorf", "Rönneburg", "Langenbek", "Sinstorf", "Marmstorf", "Eißendorf", "Heimfeld", "Hausbruch", "Neugraben-Fischbek", "Moorburg", "Francop", "Neuenfelde", "Cranz"]
};

// Categories for SEO pages
export const kategorien = [
  { slug: "krippe", name: "Krippe", description: "Betreuung für Kinder unter 3 Jahren", filter: "betreuungsart", value: "krippe" },
  { slug: "elementar", name: "Elementarbereich", description: "Betreuung für Kinder von 3-6 Jahren", filter: "betreuungsart", value: "elementar" },
  { slug: "hort", name: "Hort", description: "Nachmittagsbetreuung für Schulkinder", filter: "betreuungsart", value: "hort" },
  { slug: "ganztag", name: "Ganztagsbetreuung", description: "Betreuung den ganzen Tag", filter: "oeffnungszeitenKategorie", value: "ganztag" },
  { slug: "teilzeit", name: "Teilzeitbetreuung", description: "Betreuung halbtags oder stundenweise", filter: "oeffnungszeitenKategorie", value: "teilzeit" },
  { slug: "integrativ", name: "Integrative Kitas", description: "Inklusive Betreuung für alle Kinder", filter: "besonderheiten", value: "Integrativ" },
  { slug: "montessori", name: "Montessori-Kitas", description: "Kitas mit Montessori-Pädagogik", filter: "konzept", value: "Montessori" },
  { slug: "waldorf", name: "Waldorf-Kitas", description: "Kitas mit Waldorf-Pädagogik", filter: "konzept", value: "Waldorf" },
  { slug: "bio-essen", name: "Bio-Küche", description: "Kitas mit biologischer Verpflegung", filter: "besonderheiten", value: "Bio-Essen" },
  { slug: "outdoor", name: "Natur-Kitas", description: "Kitas mit Fokus auf Naturerfahrung", filter: "besonderheiten", value: "Outdoor" },
  { slug: "bilingual", name: "Bilinguale Kitas", description: "Zweisprachige Betreuung", filter: "besonderheiten", value: "Bilingual" },
];

export const kitas: KitaDetail[] = [
  {
    id: 1,
    name: "Montessori-Kita Altona",
    bezirk: "Altona",
    stadtteil: "Ottensen",
    traeger: "Montessori Kinderhaus e.V.",
    traegerArt: "freier Träger",
    status: "frei",
    statusText: "Plätze frei ab Sommer 2026",
    alter: "1–6 Jahre",
    plaetze: 65,
    betreuungszeiten: "7:30–17:00 Uhr",
    konzept: "Montessori",
    googleBewertung: 4.8,
    adresse: "Bahrenfelder Straße 125, 22765 Hamburg",
    telefon: "040 / 123 456 78",
    email: "info@montessori-altona.de",
    website: "www.montessori-altona.de",
    oeffnungszeiten: "Mo–Fr: 7:30–17:00 Uhr",
    ferienregelung: "3 Wochen Sommerschließzeit, zwischen Weihnachten und Neujahr geschlossen",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Die Montessori-Kita Altona bietet Kindern von 1 bis 6 Jahren eine liebevolle und vorbereitete Umgebung nach den Prinzipien Maria Montessoris.",
      "Unser pädagogisches Konzept basiert auf dem Leitsatz 'Hilf mir, es selbst zu tun' und fördert die natürliche Neugier und Selbstständigkeit jedes Kindes.",
      "Der Tagesablauf ist geprägt von langen Freiarbeitsphasen, in denen die Kinder ihren eigenen Interessen nachgehen können.",
      "Unser Team besteht aus erfahrenen Montessori-Pädagog:innen, die jedes Kind individuell begleiten."
    ],
    schwerpunkte: ["Montessori-Pädagogik", "Selbstbestimmtes Lernen", "Naturmaterialien", "Bewegung", "Kreativität"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5539, lng: 9.9275 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "ganztag",
    besonderheiten: ["Bio-Essen", "Außenbereich", "Bewegungsraum"],
    tags: ["Krippe", "Elementar", "Ganztag", "Montessori", "Bio-Essen", "Außenbereich"]
  },
  {
    id: 2,
    name: "Städtische Kita Eimsbüttel",
    bezirk: "Eimsbüttel",
    stadtteil: "Eimsbüttel",
    traeger: "Elbkinder – Vereinigung Hamburger Kitas",
    traegerArt: "städtisch",
    status: "warteliste",
    statusText: "Aktuell nur Warteliste",
    alter: "0–6 Jahre",
    plaetze: 120,
    betreuungszeiten: "6:00–18:00 Uhr",
    konzept: "Situationsansatz",
    googleBewertung: 4.5,
    adresse: "Osterstraße 88, 20259 Hamburg",
    telefon: "040 / 234 567 89",
    email: "kita-eimsbuettel@elbkinder.de",
    website: "www.elbkinder-kitas.de",
    oeffnungszeiten: "Mo–Fr: 6:00–18:00 Uhr",
    ferienregelung: "Ganzjährig geöffnet, nur an Feiertagen geschlossen",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Die Städtische Kita Eimsbüttel gehört zum Netzwerk der Elbkinder und bietet Familien eine zuverlässige, hochwertige Betreuung.",
      "Mit 120 Plätzen für Kinder von 0 bis 6 Jahren sind wir eine der größeren Einrichtungen in der Umgebung.",
      "Unser pädagogisches Konzept basiert auf dem Situationsansatz mit besonderem Fokus auf Sprachförderung.",
      "Die langen Öffnungszeiten von 6 bis 18 Uhr kommen berufstätigen Eltern entgegen."
    ],
    schwerpunkte: ["Situationsansatz", "Sprachförderung", "Bewegung", "Alltagsintegrierte Bildung", "Inklusion"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5759, lng: 9.9563 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "erweitert",
    besonderheiten: ["Integrativ", "Sprachförderung", "Außenbereich"],
    tags: ["Krippe", "Elementar", "Erweiterte Zeiten", "Integrativ", "Sprachförderung"]
  },
  {
    id: 3,
    name: "Natur-Kita Winterhude",
    bezirk: "Hamburg-Nord",
    stadtteil: "Winterhude",
    traeger: "NaturKinder Hamburg e.V.",
    traegerArt: "freier Träger",
    status: "frei",
    statusText: "Noch 3 Plätze für 2026 frei",
    alter: "3–6 Jahre",
    plaetze: 22,
    betreuungszeiten: "8:00–15:00 Uhr",
    konzept: "Naturpädagogik",
    googleBewertung: 4.9,
    adresse: "Stadthallenbrücke 1, 22299 Hamburg",
    telefon: "040 / 345 678 90",
    email: "hallo@naturkita-winterhude.de",
    website: "www.naturkita-winterhude.de",
    oeffnungszeiten: "Mo–Fr: 8:00–15:00 Uhr",
    ferienregelung: "3 Wochen Sommerschließzeit, Weihnachtsferien",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein) + 50€ Naturbeitrag",
    beschreibung: [
      "Die Natur-Kita Winterhude ist eine kleine, naturnahe Einrichtung für Kinder von 3 bis 6 Jahren.",
      "Unser Konzept: So viel Zeit wie möglich draußen verbringen! Tägliche Waldtage im nahegelegenen Stadtpark.",
      "Unser Außengelände mit eigenem Nutzgarten ermöglicht den Kindern, selbst Gemüse anzubauen.",
      "Mit nur 22 Plätzen sind wir bewusst klein und familiär."
    ],
    schwerpunkte: ["Naturpädagogik", "Waldtage", "Gartenprojekt", "Bewegung", "Umweltbildung"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5893, lng: 10.0022 },
    betreuungsart: ["elementar"],
    oeffnungszeitenKategorie: "teilzeit",
    besonderheiten: ["Outdoor", "Bio-Essen", "Waldtage"],
    tags: ["Elementar", "Teilzeit", "Naturpädagogik", "Outdoor", "Bio-Essen", "Waldtage"]
  },
  {
    id: 4,
    name: "Inklusions-Kita Hamburg-Nord",
    bezirk: "Hamburg-Nord",
    stadtteil: "Barmbek-Süd",
    traeger: "Leben mit Behinderung Hamburg",
    traegerArt: "freier Träger",
    status: "frei",
    statusText: "Integrative Plätze verfügbar",
    alter: "0–6 Jahre",
    plaetze: 80,
    betreuungszeiten: "7:00–17:00 Uhr",
    konzept: "Inklusion",
    googleBewertung: 4.7,
    adresse: "Hamburger Straße 200, 22083 Hamburg",
    telefon: "040 / 456 789 01",
    email: "kita-inklusion@lmbhh.de",
    website: "www.lmbhh.de/kitas",
    oeffnungszeiten: "Mo–Fr: 7:00–17:00 Uhr",
    ferienregelung: "Ganzjährig geöffnet, 2 Konzeptionstage pro Jahr",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Die Inklusions-Kita Hamburg-Nord ist eine integrative Kindertagesstätte für Kinder mit und ohne Behinderung.",
      "Unser Haus ist vollständig barrierefrei mit modernen Therapieräumen.",
      "Neben Erzieher:innen arbeiten Heilpädagog:innen und Therapeut:innen im Team.",
      "Jedes Kind erhält einen individuellen Förderplan."
    ],
    schwerpunkte: ["Inklusion", "Heilpädagogik", "Therapieangebote", "Barrierefreiheit", "Sprachförderung"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5738, lng: 10.0351 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "ganztag",
    besonderheiten: ["Integrativ", "Therapieangebote", "Barrierefreiheit"],
    tags: ["Krippe", "Elementar", "Ganztag", "Integrativ", "Therapieangebote", "Barrierefreiheit"]
  },
  {
    id: 5,
    name: "Elterninitiative Kinderladen St. Pauli",
    bezirk: "Hamburg-Mitte",
    stadtteil: "St. Pauli",
    traeger: "Kinderladen St. Pauli e.V.",
    traegerArt: "Elterninitiative",
    status: "warteliste",
    statusText: "Warteliste, Aufnahme nach Dringlichkeit",
    alter: "1–6 Jahre",
    plaetze: 18,
    betreuungszeiten: "8:00–16:00 Uhr",
    konzept: "Elterninitiative",
    googleBewertung: 4.6,
    adresse: "Wohlwillstraße 12, 20359 Hamburg",
    telefon: "040 / 567 890 12",
    email: "kinderladen@stpauli-kids.de",
    oeffnungszeiten: "Mo–Fr: 8:00–16:00 Uhr",
    ferienregelung: "3 Wochen Sommerschließzeit, Weihnachtsferien",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein) + 80€ Vereinsbeitrag",
    beschreibung: [
      "Der Kinderladen St. Pauli ist eine kleine Elterninitiative im Herzen des bunten Stadtteils.",
      "Seit über 30 Jahren gestalten Eltern und Erzieher:innen hier gemeinsam einen Ort für Kinder.",
      "Bei uns ist Elternmitarbeit gelebte Überzeugung: Kochen, Putzen, Gartenpflege.",
      "Mit nur 18 Plätzen sind wir familiär und überschaubar."
    ],
    schwerpunkte: ["Elternmitarbeit", "Demokratische Erziehung", "Kreativität", "Freispiel", "Gemeinschaft"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5521, lng: 9.9641 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "ganztag",
    besonderheiten: ["Elterninitiative", "Bio-Essen"],
    tags: ["Krippe", "Elementar", "Ganztag", "Elterninitiative", "Bio-Essen"]
  },
  {
    id: 6,
    name: "Waldorf-Kindergarten Blankenese",
    bezirk: "Altona",
    stadtteil: "Blankenese",
    traeger: "Waldorfpädagogik Hamburg e.V.",
    traegerArt: "freier Träger",
    status: "frei",
    statusText: "Plätze ab August verfügbar",
    alter: "3–7 Jahre",
    plaetze: 25,
    betreuungszeiten: "8:00–14:30 Uhr",
    konzept: "Waldorf",
    googleBewertung: 4.7,
    adresse: "Blankeneser Bahnhofstraße 42, 22587 Hamburg",
    telefon: "040 / 678 901 23",
    email: "info@waldorf-blankenese.de",
    website: "www.waldorf-blankenese.de",
    oeffnungszeiten: "Mo–Fr: 8:00–14:30 Uhr",
    ferienregelung: "Ferienzeiten analog zu Hamburger Schulferien",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein) + 60€ Materialgeld",
    beschreibung: [
      "Der Waldorf-Kindergarten Blankenese bietet Kindern eine ganzheitliche Betreuung nach waldorfpädagogischen Grundsätzen.",
      "Rhythmus, Wiederholung und künstlerische Tätigkeiten prägen unseren Alltag.",
      "Naturbelassene Spielmaterialien regen die Fantasie der Kinder an.",
      "Unser großer Garten bietet Platz zum Spielen und Entdecken."
    ],
    schwerpunkte: ["Waldorf-Pädagogik", "Kreativität", "Rhythmus", "Naturspiel", "Handwerk"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5592, lng: 9.8142 },
    betreuungsart: ["elementar"],
    oeffnungszeitenKategorie: "teilzeit",
    besonderheiten: ["Waldorf", "Bio-Essen", "Außenbereich"],
    tags: ["Elementar", "Teilzeit", "Waldorf", "Bio-Essen", "Kreativität"]
  },
  {
    id: 7,
    name: "Bilinguale Kita Wandsbek",
    bezirk: "Wandsbek",
    stadtteil: "Wandsbek",
    traeger: "Internationale Kitas Hamburg gGmbH",
    traegerArt: "freier Träger",
    status: "warteliste",
    statusText: "Warteliste für alle Altersgruppen",
    alter: "1–6 Jahre",
    plaetze: 75,
    betreuungszeiten: "7:00–17:30 Uhr",
    konzept: "Immersion",
    googleBewertung: 4.4,
    adresse: "Wandsbeker Marktstraße 120, 22041 Hamburg",
    telefon: "040 / 789 012 34",
    email: "info@bilingual-wandsbek.de",
    website: "www.bilingual-wandsbek.de",
    oeffnungszeiten: "Mo–Fr: 7:00–17:30 Uhr",
    ferienregelung: "3 Wochen Sommerschließzeit",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein) + 100€ Sprachbeitrag",
    beschreibung: [
      "Die Bilinguale Kita Wandsbek bietet deutsch-englische Betreuung nach dem Immersionsprinzip.",
      "Native Speaker begleiten die Kinder durchgehend auf Englisch.",
      "Spielerisches Sprachlernen im Alltag ohne Druck.",
      "Internationale Atmosphäre mit Kindern aus verschiedenen Kulturen."
    ],
    schwerpunkte: ["Bilinguale Erziehung", "Englisch", "Immersion", "Interkulturelles Lernen"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5728, lng: 10.0724 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "ganztag",
    besonderheiten: ["Bilingual", "Interkulturell"],
    tags: ["Krippe", "Elementar", "Ganztag", "Bilingual", "Englisch", "Interkulturell"]
  },
  {
    id: 8,
    name: "Kirchliche Kita St. Marien",
    bezirk: "Bergedorf",
    stadtteil: "Bergedorf",
    traeger: "Katholische Pfarrei Heilig Kreuz",
    traegerArt: "kirchlich",
    status: "frei",
    statusText: "Plätze in der Elementargruppe frei",
    alter: "2–6 Jahre",
    plaetze: 55,
    betreuungszeiten: "7:30–16:00 Uhr",
    konzept: "Religionspädagogik",
    googleBewertung: 4.3,
    adresse: "Bergedorfer Straße 100, 21029 Hamburg",
    telefon: "040 / 890 123 45",
    email: "kita@st-marien-bergedorf.de",
    oeffnungszeiten: "Mo–Fr: 7:30–16:00 Uhr",
    ferienregelung: "2 Wochen Sommerschließzeit, Weihnachtsferien",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Die Kita St. Marien ist eine familiäre Einrichtung in kirchlicher Trägerschaft.",
      "Christliche Werte und Feste prägen unseren Jahreskreis.",
      "Offen für Familien aller Konfessionen und Kulturen.",
      "Enge Zusammenarbeit mit der Kirchengemeinde."
    ],
    schwerpunkte: ["Religionspädagogik", "Gemeinschaft", "Wertebildung", "Musik", "Feste"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.4891, lng: 10.2117 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "ganztag",
    besonderheiten: ["Religiöse Erziehung", "Musikalisch"],
    tags: ["Krippe", "Elementar", "Ganztag", "Kirchlich", "Musikalisch"]
  },
  {
    id: 9,
    name: "Sport-Kita Harburg",
    bezirk: "Harburg",
    stadtteil: "Harburg",
    traeger: "Sportjugend Hamburg",
    traegerArt: "freier Träger",
    status: "frei",
    statusText: "Wenige Plätze verfügbar",
    alter: "1–6 Jahre",
    plaetze: 60,
    betreuungszeiten: "7:00–17:00 Uhr",
    konzept: "Bewegungspädagogik",
    googleBewertung: 4.6,
    adresse: "Harburger Ring 55, 21073 Hamburg",
    telefon: "040 / 901 234 56",
    email: "info@sportkita-harburg.de",
    website: "www.sportkita-harburg.de",
    oeffnungszeiten: "Mo–Fr: 7:00–17:00 Uhr",
    ferienregelung: "Ganzjährig geöffnet",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Die Sport-Kita Harburg legt besonderen Wert auf Bewegung und körperliche Entwicklung.",
      "Tägliche Bewegungsangebote in unserer großen Turnhalle.",
      "Kooperationen mit örtlichen Sportvereinen.",
      "Gesunde Ernährung als Teil des Konzepts."
    ],
    schwerpunkte: ["Bewegung", "Sport", "Gesundheit", "Ernährung", "Motorik"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.4567, lng: 9.9838 },
    betreuungsart: ["krippe", "elementar"],
    oeffnungszeitenKategorie: "ganztag",
    besonderheiten: ["Bewegungsförderung", "Bio-Essen", "Turnhalle"],
    tags: ["Krippe", "Elementar", "Ganztag", "Sport", "Bewegung", "Bio-Essen"]
  },
  {
    id: 10,
    name: "Hort am Schulberg",
    bezirk: "Hamburg-Nord",
    stadtteil: "Eppendorf",
    traeger: "Elbkinder – Vereinigung Hamburger Kitas",
    traegerArt: "städtisch",
    status: "frei",
    statusText: "Plätze für Erstklässler frei",
    alter: "6–12 Jahre",
    plaetze: 40,
    betreuungszeiten: "13:00–18:00 Uhr",
    konzept: "Offene Arbeit",
    googleBewertung: 4.2,
    adresse: "Eppendorfer Weg 222, 20251 Hamburg",
    telefon: "040 / 012 345 67",
    email: "hort-schulberg@elbkinder.de",
    oeffnungszeiten: "Mo–Fr: 13:00–18:00 Uhr, Ferien: 8:00–18:00 Uhr",
    ferienregelung: "In den Schulferien ganztags geöffnet",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Der Hort am Schulberg bietet Schulkindern einen sicheren Ort für den Nachmittag.",
      "Hausaufgabenbetreuung und vielfältige Freizeitangebote.",
      "In den Ferien ganztägiges Programm mit Ausflügen.",
      "Offene Arbeit mit verschiedenen Themenbereichen."
    ],
    schwerpunkte: ["Hausaufgabenhilfe", "Freizeitgestaltung", "Ferienbetreuung", "Soziales Lernen"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg"],
    coordinates: { lat: 53.5847, lng: 9.9763 },
    betreuungsart: ["hort"],
    oeffnungszeitenKategorie: "teilzeit",
    besonderheiten: ["Hausaufgabenhilfe", "Ferienbetreuung"],
    tags: ["Hort", "Nachmittag", "Hausaufgabenhilfe", "Ferienbetreuung"]
  }
];

export const getKitaById = (id: number): KitaDetail | undefined => {
  return kitas.find(k => k.id === id);
};

export const getKitasByBezirk = (bezirk: string): KitaDetail[] => {
  return kitas.filter(k => k.bezirk === bezirk);
};

export const getKitasByStadtteil = (stadtteil: string): KitaDetail[] => {
  return kitas.filter(k => k.stadtteil === stadtteil);
};

export const getKitasByKategorie = (kategorie: typeof kategorien[number]): KitaDetail[] => {
  return kitas.filter(k => {
    if (kategorie.filter === "betreuungsart") {
      return k.betreuungsart.includes(kategorie.value as any);
    }
    if (kategorie.filter === "oeffnungszeitenKategorie") {
      return k.oeffnungszeitenKategorie === kategorie.value;
    }
    if (kategorie.filter === "besonderheiten") {
      return k.besonderheiten.includes(kategorie.value);
    }
    if (kategorie.filter === "konzept") {
      return k.konzept === kategorie.value;
    }
    return false;
  });
};
