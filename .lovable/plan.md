

# Hamburg Statistik-Section mit Count-Up Animation

## Zusammenfassung
Eine neue, visuell beeindruckende Section mit Hamburg-Stadtplan-Hintergrund und drei schwebenden Statistik-Kacheln, die beim Scrollen ins Sichtfeld animierte Zahlen anzeigen.

## Visual Design

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              Hamburg – Deine Kita-Welt                          │
│                    (Primary, Extrabold)                         │
│                                                                 │
│     ╔═══════════════╗  ╔═══════════════╗  ╔═══════════════╗    │
│     ║   +1.280      ║  ║   ~52.000     ║  ║  +45 Konzepte ║    │
│     ║               ║  ║               ║  ║               ║    │
│     ║ Kitas in HH   ║  ║ Betreuungs-   ║  ║ pädagogische  ║    │
│     ║ aktuell       ║  ║ plätze        ║  ║ Schwerpunkte  ║    │
│     ║ gelistet      ║  ║ verfügbar     ║  ║               ║    │
│     ╚═══════════════╝  ╚═══════════════╝  ╚═══════════════╝    │
│                                                                 │
│     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│     ░░░░  Hamburg Stadtplan (sehr dezent)  ░░░░░░░░░░░░░░░░░   │
│     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Was wird erstellt

### 1. Neue Komponente: `HamburgStatsSection.tsx`

**Section-Eigenschaften:**
- Full-Width mit weissem/sehr hellem Hintergrund (#ffffff oder #f9fafb)
- Höhe: 500-700px Desktop, 700-1000px Mobile
- Hamburg-Karte als dezenter Hintergrund (Opacity 0.08-0.15, primary-Farbe)

**Headline:**
- Text: "Hamburg – Deine Kita-Welt"
- Figtree Extrabold, 32-40px Desktop / 26-32px Mobile
- Farbe: var(--primary)
- Zentriert

**Drei Statistik-Kacheln:**
| Kachel | Zahl | Haupttext | Subtext |
|--------|------|-----------|---------|
| 1 | +1.280 | Kitas in Hamburg | aktuell gelistet und täglich aktualisiert |
| 2 | ~52.000 | Betreuungsplätze | in allen Bezirken verfügbar |
| 3 | +45 Konzepte | pädagogische Schwerpunkte | von Montessori bis Inklusion |

**Kachel-Design:**
- Breite: 340-400px, Höhe: 160-200px (Desktop)
- Border-Radius: 20-28px
- Weisser Hintergrund mit Schatten
- Padding: 28-36px
- Hover: Scale 1.04 + accent/success Rand

### 2. Count-Up Animation

**Technische Umsetzung:**
- Intersection Observer API zur Erkennung wenn Section sichtbar wird
- Easing-Funktion für smooth count-up
- Dauer: 1.8-2.5s Desktop, 2.5-3s Mobile
- Start bei 0, Ende bei Zielwert
- Läuft nur einmal (nicht bei jedem Scroll)

**Zahlenformatierung:**
- "+1.280" - mit Tausenderpunkt
- "~52.000" - mit Tilde und Punkt
- "+45 Konzepte" - mit Text-Suffix

### 3. Responsive Verhalten

| Breakpoint | Kacheln | Zahlen-Grösse | Karten-Skalierung |
|------------|---------|---------------|-------------------|
| Mobile (<768px) | Untereinander, 90% Breite | 40-48px | Kleiner |
| Tablet (768-1024px) | 2-3 spaltig | 48-56px | Mittel |
| Desktop (>1024px) | 3 nebeneinander, schwebend | 48-64px | 120-150% |

---

## Technische Details

### Datei-Änderungen

**Neue Datei:** `src/components/HamburgStatsSection.tsx`
- React-Komponente mit useState, useEffect, useRef
- Intersection Observer Hook für Viewport-Erkennung
- Custom useCountUp Hook für Animation
- Tailwind-Styling mit responsive Klassen

**Änderung:** `src/pages/Index.tsx`
- Import der neuen Komponente
- Einbindung nach HowToUse und vor InfoSection

### Verwendete Assets
- `src/assets/hamburg-map-background.webp` (bereits vorhanden)

### Animation-Logik (JavaScript)
```
1. Section mounted → Intersection Observer registriert
2. Section kommt ins Viewport (threshold 0.3)
3. Animation startet mit requestAnimationFrame
4. Easing: easeOutExpo für natürliches Auslaufen
5. Nach Animation: Observer disconnected
```

### Tailwind-Klassen (Auszug)
- Section: `relative min-h-[500px] lg:min-h-[600px] bg-white overflow-hidden`
- Karten: `bg-white rounded-[24px] shadow-lg p-8 hover:scale-[1.04] transition-all`
- Zahlen: `text-[48px] lg:text-[56px] font-extrabold text-primary`

