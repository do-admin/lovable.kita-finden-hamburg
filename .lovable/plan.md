
# Placeholder-Bilder in Kita- und Ratgeber-Cards implementieren

## Übersicht
Ergänzung von Placeholder-Bildern oberhalb des Textinhalts in zwei Card-Komponenten:
1. **KitaCard** (verwendet in "Beliebte Kitas in Hamburg")
2. **RatgeberSection** (Cards auf der Homepage) und **RatgeberCard** (Cards auf der /ratgeber Seite)

## Visuelle Änderungen

```text
┌─────────────────────────┐
│  ┌───────────────────┐  │
│  │                   │  │
│  │   Placeholder     │  │
│  │      Bild         │  │
│  │   (4:3 Ratio)     │  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  Titel                  │
│  Beschreibung...        │
│  Meta / Tags            │
│  CTA Link →             │
└─────────────────────────┘
```

## Technische Umsetzung

### 1. KitaCard.tsx
- Bild mit `aspect-ratio: 4/3` oberhalb des Textblocks einfügen
- Verwendung von `/placeholder.svg` als Bildquelle
- Abgerundete Ecken oben (`rounded-t-xl`) 
- Card-Padding anpassen: `p-0` außen, Textbereich mit eigenem Padding `p-5`
- `object-cover` für Bildskalierung

### 2. RatgeberSection.tsx (Homepage-Cards)
- Gleiche Struktur: Bild oben, Text unten
- Aspect Ratio `16:9` oder `4:3` für kompaktere Darstellung
- Card-Struktur anpassen: `p-0` mit innerem Padding für Text

### 3. RatgeberCard.tsx (Ratgeber-Seite Cards)
- Bild zwischen Accent-Bar und Content einfügen
- Aspect Ratio `16:9` für breiteres Format
- Bestehendes Padding und Animation beibehalten

## Dateien die geändert werden

| Datei | Änderung |
|-------|----------|
| `src/components/KitaCard.tsx` | Placeholder-Bild mit 4:3 Ratio einfügen |
| `src/components/RatgeberSection.tsx` | Placeholder-Bild in Homepage-Cards |
| `src/components/RatgeberCard.tsx` | Placeholder-Bild unterhalb der Accent-Bar |

## Design-Konsistenz
- Alle Bilder nutzen `/placeholder.svg`
- Einheitliche abgerundete Ecken passend zur Card
- Hover-Effekte bleiben erhalten
- Bilder sind responsive und skalieren korrekt
