import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SearchModule = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section id="search" className="section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="card-shadow-lg rounded-xl p-8 bg-card">
          <h2 className="mb-2">Kita-Suche für Hamburg</h2>
          <p className="text-muted-foreground mb-6">
            Geben Sie Postleitzahl, Stadtteil oder Kita-Namen ein, um passende Einrichtungen in Ihrer Nähe zu finden.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="location">PLZ oder Stadtteil</Label>
              <Input id="location" placeholder="z.B. 20095 oder Altona" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kitaName">Kita-Name (optional)</Label>
              <Input id="kitaName" placeholder="Name der Kita" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">Jetzt Kitas finden</Button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-primary hover:underline"
            >
              {showFilters ? "Erweiterte Suche schließen" : "Erweiterte Suche öffnen"}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="betreuung">Betreuungsumfang</Label>
                <Select>
                  <SelectTrigger id="betreuung">
                    <SelectValue placeholder="Alle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="halbtags">Halbtags</SelectItem>
                    <SelectItem value="ganztags">Ganztags</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="konzept">Pädagogisches Konzept</Label>
                <Select>
                  <SelectTrigger id="konzept">
                    <SelectValue placeholder="Alle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="montessori">Montessori</SelectItem>
                    <SelectItem value="waldorf">Waldorf</SelectItem>
                    <SelectItem value="reggio">Reggio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="traeger">Träger</Label>
                <Select>
                  <SelectTrigger id="traeger">
                    <SelectValue placeholder="Alle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oeffentlich">Öffentlich</SelectItem>
                    <SelectItem value="kirchlich">Kirchlich</SelectItem>
                    <SelectItem value="privat">Privat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchModule;
