
import { Card } from "@/components/ui/card";
import { Users, Heart, Award } from "lucide-react";

const stats = [
  { title: "Active Mentors", value: "156", icon: Users },
  { title: "Mentees Supported", value: "482", icon: Heart },
  { title: "Success Stories", value: "45", icon: Award },
];

export function MentorshipStatsCard() {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Mentorship Stats</h2>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.title} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="font-medium">{stat.title}</p>
            </div>
            <p className="text-lg font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
