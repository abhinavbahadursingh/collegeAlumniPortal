
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentAlumni = [
  { name: "Sarah Johnson", joined: "2 hours ago", avatar: "/avatars/01.png" },
  { name: "Michael Chen", joined: "5 hours ago", avatar: "/avatars/02.png" },
  { name: "Emily Rodriguez", joined: "1 day ago", avatar: "/avatars/03.png" },
  { name: "David Lee", joined: "2 days ago", avatar: "/avatars/04.png" },
  { name: "Jessica Williams", joined: "3 days ago", avatar: "/avatars/05.png" },
];

export function RecentAlumniCard() {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">Recent Alumni</h2>
      <div className="space-y-4">
        {recentAlumni.map((alumnus) => (
          <div key={alumnus.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={alumnus.avatar} alt={alumnus.name} />
                <AvatarFallback>{alumnus.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{alumnus.name}</p>
                <p className="text-sm text-muted-foreground">Joined {alumnus.joined}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
