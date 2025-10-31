  
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";

import { StatsCard } from "@/components/analytics/StatsCard";
import { GraphCard } from "@/components/analytics/GraphCard";
import { Users, MapPin, BarChart2 } from "lucide-react";
import { TopCountriesCard } from "@/components/analytics/TopCountriesCard";
import { RecentAlumniCard } from "@/components/analytics/RecentAlumniCard";
import { MentorshipStatsCard } from "@/components/analytics/MentorshipStatsCard";

export default function Analytics() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen p-6 pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Alumni Analytics
            </h1>
            <p className="text-muted-foreground">
              Visualizing the global reach and growth of our alumni network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard title="Total Alumni" value="10,234" icon={Users} />
            <StatsCard title="Countries Represented" value="120" icon={MapPin} />
            <StatsCard title="Alumni Growth (YTD)" value="+15%" icon={BarChart2} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <GraphCard />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TopCountriesCard />
            <RecentAlumniCard />
            <MentorshipStatsCard />
          </div>
        </motion.div>
      </div>
    </>
  );
}
