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

const ContactSection = () => {
  return (
    <section className="section-padding">
      <div className="content-width">
        <h2 className="text-center">Kontakt</h2>
        <p className="text-muted-foreground mb-8 text-center">
          Sie haben Fragen zur Kita-Suche in Hamburg, wünschen sich Unterstützung bei der Orientierung oder möchten uns Feedback geben? Schreiben Sie uns – wir melden uns so schnell wie möglich bei Ihnen.
        </p>
        
        <form className="card-shadow rounded-lg p-8 bg-card space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Ihr Name</Label>
            <Input id="name" placeholder="Max Mustermann" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Ihre E-Mail-Adresse</Label>
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
            <Label htmlFor="message">Ihre Nachricht</Label>
            <Textarea 
              id="message" 
              placeholder="Ihre Nachricht an uns..."
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
    </section>
  );
};

export default ContactSection;
