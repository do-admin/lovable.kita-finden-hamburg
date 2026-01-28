import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Kontakt = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-[80px]">
        <div className="max-w-[760px] mx-auto px-6">
          <h1 className="mb-6">Kontakt</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Du hast Fragen zur Kita-Suche in Hamburg, brauchst Unterstützung bei der Orientierung oder möchtest uns Feedback geben? Schreib uns – wir melden uns so schnell wie möglich bei dir.
          </p>
          
          <form className="card-shadow rounded-lg p-8 bg-card space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Dein Name</Label>
              <Input id="name" placeholder="Max Mustermann" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Deine E-Mail-Adresse</Label>
              <Input id="email" type="email" placeholder="max@beispiel.de" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Betreff</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allgemein">Allgemeine Frage</SelectItem>
                  <SelectItem value="kita-suche">Frage zur Kita-Suche</SelectItem>
                  <SelectItem value="technisch">Technisches Problem</SelectItem>
                  <SelectItem value="kooperation">Kooperation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Deine Nachricht</Label>
              <Textarea 
                id="message" 
                placeholder="Deine Nachricht an uns..."
                className="min-h-32"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="consent" required />
              <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
                Ich bin damit einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verarbeitet werden.
              </Label>
            </div>
            
            <Button type="submit" className="w-full">
              Nachricht senden
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Kontakt;
