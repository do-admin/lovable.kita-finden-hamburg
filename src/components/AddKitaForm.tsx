import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AddKitaForm = () => {
  return (
    <section id="kita-hinzufuegen" className="section-padding">
      <div className="content-width">
        <h2 className="text-center">Kita hinzufügen</h2>
        <p className="text-muted-foreground mb-8 text-center">
          Du leitest eine Kita in Hamburg oder bist als Träger verantwortlich und möchtest, dass deine Einrichtung im Verzeichnis von „Kita finden Hamburg" erscheint oder aktualisiert wird? Nutz das Formular, um uns die wichtigsten Informationen zu übermitteln.
        </p>
        
        <form className="card-shadow rounded-lg p-8 bg-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="kitaName">Name der Kita</Label>
              <Input id="kitaName" placeholder="Kita Beispiel" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="traeger">Träger</Label>
              <Input id="traeger" placeholder="Träger" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bezirk">Bezirk</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Bezirk wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mitte">Hamburg-Mitte</SelectItem>
                  <SelectItem value="altona">Altona</SelectItem>
                  <SelectItem value="eimsbuettel">Eimsbüttel</SelectItem>
                  <SelectItem value="nord">Hamburg-Nord</SelectItem>
                  <SelectItem value="wandsbek">Wandsbek</SelectItem>
                  <SelectItem value="bergedorf">Bergedorf</SelectItem>
                  <SelectItem value="harburg">Harburg</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stadtteil">Stadtteil</Label>
              <Input id="stadtteil" placeholder="Stadtteil" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="strasse">Straße & Hausnummer</Label>
            <Input id="strasse" placeholder="Musterstraße 123" required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="plz">PLZ</Label>
              <Input id="plz" placeholder="20095" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Kontakt-E-Mail der Kita</Label>
              <Input id="email" type="email" placeholder="kontakt@kita.de" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telefon">Telefonnummer (optional)</Label>
              <Input id="telefon" type="tel" placeholder="040 1234567" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webseite">Webseite (optional)</Label>
              <Input id="webseite" type="url" placeholder="https://beispiel.de" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schwerpunkte">Pädagogische Schwerpunkte</Label>
            <Textarea 
              id="schwerpunkte" 
              placeholder="z.B. Sprache, Naturpädagogik, Musik, Bewegung, Inklusion"
              className="min-h-20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rolle">Deine Rolle</Label>
            <Input id="rolle" placeholder="z.B. Leitung, Träger, Verwaltung" required />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="berechtigung" required />
            <Label htmlFor="berechtigung" className="text-sm font-normal cursor-pointer">
              Ich bestätige, dass ich berechtigt bin, diese Angaben für die Einrichtung zu machen.
            </Label>
          </div>
          
          <Button type="submit" className="w-full">
            Kita zur Aufnahme vorschlagen
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddKitaForm;
