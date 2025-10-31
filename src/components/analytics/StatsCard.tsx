
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import CountUp from "react-countup";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  const isNumeric = !isNaN(parseFloat(value.replace(/,/g, '')));
  const numericValue = isNumeric ? parseFloat(value.replace(/,/g, '')) : 0;

  return (
    <Card className="glass-card p-6 glow-border hover:scale-105 transition-transform">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="text-3xl font-bold">
            {isNumeric ? (
              <CountUp end={numericValue} separator="," duration={2} />
            ) : (
              value
            )}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
