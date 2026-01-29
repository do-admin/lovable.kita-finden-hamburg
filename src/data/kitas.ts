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
}

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
      "Die Montessori-Kita Altona bietet Kindern von 1 bis 6 Jahren eine liebevolle und vorbereitete Umgebung nach den Prinzipien Maria Montessoris. Unser pädagogisches Konzept basiert auf dem Leitsatz 'Hilf mir, es selbst zu tun' und fördert die natürliche Neugier und Selbstständigkeit jedes Kindes.",
      "Unsere großzügigen Freiarbeitsräume sind mit hochwertigem Montessori-Material ausgestattet, das die Kinder zum selbstbestimmten Lernen einlädt. Naturmaterialien spielen dabei eine besondere Rolle – von Holzspielzeug bis zu sensorischen Entdeckungsstationen.",
      "Der Tagesablauf ist geprägt von langen Freiarbeitsphasen, in denen die Kinder ihren eigenen Interessen nachgehen können. Ergänzt wird dies durch gemeinsame Mahlzeiten, Gartenzeit auf unserem naturnahen Außengelände und wöchentliche Ausflüge in die Umgebung.",
      "Unser Team besteht aus erfahrenen Montessori-Pädagog:innen, die jedes Kind individuell begleiten und in seiner Entwicklung unterstützen."
    ],
    schwerpunkte: ["Montessori-Pädagogik", "Selbstbestimmtes Lernen", "Naturmaterialien", "Bewegung", "Kreativität"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
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
    ferienregelung: "Ganzjährig geöffnet, nur an Feiertagen und 3 Konzeptionstagen geschlossen",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein)",
    beschreibung: [
      "Die Städtische Kita Eimsbüttel gehört zum Netzwerk der Elbkinder und bietet Familien eine zuverlässige, hochwertige Betreuung im Herzen des beliebten Stadtteils. Mit 120 Plätzen für Kinder von 0 bis 6 Jahren sind wir eine der größeren Einrichtungen in der Umgebung.",
      "Unser pädagogisches Konzept basiert auf dem Situationsansatz: Wir greifen die Lebenssituationen und Interessen der Kinder auf und gestalten daraus Bildungsangebote. Sprachförderung ist dabei ein besonderer Schwerpunkt – alle Kinder werden alltagsintegriert in ihrer Sprachentwicklung unterstützt.",
      "Die zentrale Lage ermöglicht regelmäßige Ausflüge in den nahegelegenen Eimsbütteler Park, zur Bücherhalle und zu kulturellen Angeboten im Stadtteil. Unser großzügiges Außengelände bietet vielfältige Bewegungsmöglichkeiten.",
      "Unsere langen Öffnungszeiten von 6 bis 18 Uhr kommen berufstätigen Eltern entgegen. Das multiprofessionelle Team besteht aus staatlich anerkannten Erzieher:innen, Sozialpädagog:innen und Fachkräften für Sprachförderung."
    ],
    schwerpunkte: ["Situationsansatz", "Sprachförderung", "Bewegung", "Alltagsintegrierte Bildung", "Inklusion"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 3,
    name: "Natur-Kita Winterhude",
    bezirk: "Hamburg-Nord",
    stadtteil: "Winterhude",
    traeger: "NaturKinder Hamburg e.V.",
    traegerArt: "freier Träger",
    status: "frei",
    statusText: "Noch 3 Plätze für 2025 frei",
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
      "Die Natur-Kita Winterhude ist eine kleine, naturnahe Einrichtung für Kinder von 3 bis 6 Jahren. Unser Konzept: So viel Zeit wie möglich draußen verbringen! Bei uns gibt es tägliche Waldtage im nahegelegenen Stadtpark und dem Alstertal.",
      "Wir glauben, dass Kinder die Natur brauchen, um gesund aufzuwachsen. Draußen erleben sie die Jahreszeiten hautnah, entdecken Pflanzen und Tiere, klettern, rennen und spielen frei. Das stärkt nicht nur die Gesundheit, sondern auch Selbstvertrauen und soziale Kompetenzen.",
      "Unser Außengelände mit eigenem Nutzgarten ermöglicht den Kindern, selbst Gemüse anzubauen und zu ernten. Im Bauwagen und der kleinen Hütte finden Bastel- und Kreativangebote statt – natürlich mit Naturmaterialien.",
      "Mit nur 22 Plätzen sind wir bewusst klein und familiär. Zwei feste Bezugserzieher:innen begleiten die Kinder durch den Tag. Wettergerechte Kleidung ist Voraussetzung – bei uns wird bei (fast) jedem Wetter draußen gespielt!"
    ],
    schwerpunkte: ["Naturpädagogik", "Waldtage", "Gartenprojekt", "Bewegung", "Umweltbildung"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
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
      "Die Inklusions-Kita Hamburg-Nord ist eine integrative Kindertagesstätte, in der Kinder mit und ohne Behinderung gemeinsam spielen, lernen und aufwachsen. Unser Ziel: Jedes Kind soll die Unterstützung bekommen, die es braucht – und gleichzeitig Teil einer vielfältigen Gemeinschaft sein.",
      "Unser Haus ist vollständig barrierefrei gestaltet und verfügt über moderne Therapieräume für Logopädie, Ergotherapie und Physiotherapie. Neben den Erzieher:innen arbeiten Heilpädagog:innen und Therapeut:innen eng im Team zusammen.",
      "Die Gruppengröße ist bewusst kleiner als in Regeleinrichtungen, um eine intensive Begleitung zu ermöglichen. Jedes Kind erhält einen individuellen Förderplan, der regelmäßig mit den Eltern besprochen wird.",
      "Inklusion bedeutet für uns: Alle gehören dazu. Wir feiern gemeinsam Feste, unternehmen Ausflüge und gestalten den Alltag so, dass jedes Kind teilhaben kann. Unsere Elternschaft ist bunt gemischt und vernetzt sich gegenseitig."
    ],
    schwerpunkte: ["Inklusion", "Heilpädagogik", "Therapieangebote", "Barrierefreiheit", "Sprachförderung", "Gebärdensprache"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
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
    ferienregelung: "3 Wochen Sommerschließzeit, Weihnachtsferien, Brückentage nach Absprache",
    elternbeitrag: "Einkommensabhängig (Kita-Gutschein) + 80€ Vereinsbeitrag + Elternmitarbeit",
    beschreibung: [
      "Der Kinderladen St. Pauli ist eine kleine Elterninitiative im Herzen des bunten Stadtteils. Seit über 30 Jahren gestalten Eltern und Erzieher:innen hier gemeinsam einen Ort, an dem Kinder frei und geborgen aufwachsen können.",
      "Bei uns ist Elternmitarbeit kein Muss, sondern gelebte Überzeugung: Kochen, Putzen, Gartenpflege, Vorstandsarbeit – alle packen mit an. Dafür entsteht eine einzigartige Gemeinschaft, in der Familien Freundschaften fürs Leben schließen.",
      "Pädagogisch setzen wir auf viel Freispiel, kreatives Gestalten und demokratische Mitbestimmung. Die Kinder entscheiden mit, was auf den Tisch kommt, welche Ausflüge gemacht werden und wie der Tag gestaltet wird.",
      "Mit nur 18 Plätzen sind wir familiär und überschaubar. Zwei feste Erzieher:innen und wechselnde Elterndienste sorgen für einen guten Betreuungsschlüssel. Unser kleiner Innenhof mit Sandkasten und Klettergerüst liegt versteckt und ruhig."
    ],
    schwerpunkte: ["Elternmitarbeit", "Demokratische Erziehung", "Kreativität", "Freispiel", "Gemeinschaft"],
    heroImage: "/placeholder.svg",
    galerie: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }
];

export const getKitaById = (id: number): KitaDetail | undefined => {
  return kitas.find(k => k.id === id);
};
