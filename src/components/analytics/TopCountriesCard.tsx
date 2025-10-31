
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const countries = [
  { name: "United States", alumni: 3450, flag: "/flags/us.svg" },
  { name: "India", alumni: 1280, flag: "/flags/in.svg" },
  { name: "United Kingdom", alumni: 980, flag: "/flags/gb.svg" },
  { name: "Canada", alumni: 760, flag: "/flags/ca.svg" },
  { name: "Australia", alumni: 620, flag: "/flags/au.svg" },
];

export function TopCountriesCard() {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Top Countries</h2>
      <div className="space-y-4">
        {countries.map((country) => (
          <div key={country.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={country.flag} alt={country.name} />
                <AvatarFallback>{country.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="font-medium">{country.name}</p>
            </div>
            <p className="text-muted-foreground">{country.alumni.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
