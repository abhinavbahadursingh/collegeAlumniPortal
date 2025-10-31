import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";

const mockMeetings = [
  {
    id: 1,
    title: "Quarterly Alumni Town Hall",
    date: "April 5, 2025",
    time: "11:00 AM - 12:30 PM",
    link: "https://meet.google.com/abc-xyz",
    description: "Join us for the quarterly town hall to get updates on the alumni association's activities and future plans."
  },
  {
    id: 2,
    title: "AMA with a Unicorn Founder",
    date: "April 12, 2025",
    time: "7:00 PM - 8:00 PM",
    link: "https://meet.google.com/def-uvw",
    description: "An exclusive Ask-Me-Anything session with a successful entrepreneur from our alumni network."
  },
];

const pastMeetings = [
  {
    id: 3,
    title: "Alumni Book Club - March Edition",
    date: "March 20, 2025",
    time: "8:00 PM - 9:00 PM",
    description: "Discussion on 'The Psychology of Money' by Morgan Housel."
  },
  {
    id: 4,
    title: "Virtual Coffee Chat",
    date: "March 10, 2025",
    time: "5:00 PM - 6:00 PM",
    description: "A casual virtual coffee chat to connect with fellow alumni."
  },
];

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const customMeetings = JSON.parse(localStorage.getItem("customMeetings") || "[]");
    setMeetings([...mockMeetings, ...customMeetings]);
  }, []);

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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Online <span className="text-gradient">Meetings</span>
              </h1>
              <p className="text-muted-foreground">
                Schedule and join online meetings with the alumni community.
              </p>
            </div>
            <Button asChild className="glow-border">
              <Link to="/meetings/new">Schedule a Meeting</Link>
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
            <div className="space-y-6">
              {meetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card p-6 glow-border hover:scale-[1.02] transition-transform">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-2xl font-bold mb-2">{meeting.title}</h3>
                        <p className="text-muted-foreground">{meeting.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{meeting.time}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a href={meeting.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <Video className="h-5 w-5" />
                            <span>Join Meeting</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              {meetings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming meetings scheduled yet.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Past Meetings</h2>
            <div className="space-y-6">
              {pastMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card p-6 glow-border hover:scale-[1.02] transition-transform">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-2xl font-bold mb-2">{meeting.title}</h3>
                        <p className="text-muted-foreground">{meeting.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{meeting.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}