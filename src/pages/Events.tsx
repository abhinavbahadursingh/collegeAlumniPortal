import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Check, X } from "lucide-react";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

const upcomingEvents = [
  {
    id: 1,
    title: "Bangalore Tech Summit",
    date: "March 15, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Virtual",
    attendees: 45,
    category: "Networking",
    description: "A premier summit for tech enthusiasts and professionals in Bangalore. Featuring talks from industry leaders, networking sessions, and workshops on the latest technologies."
  },
  {
    id: 2,
    title: "Career Growth Workshop",
    date: "March 22, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Campus Auditorium",
    attendees: 67,
    category: "Workshop",
    description: "Join us for an interactive workshop focused on career development strategies. Learn about resume building, interview skills, and networking effectively."
  },
  {
    id: 3,
    title: "Grand Alumni Reunion",
    date: "April 10, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Taj West End, Bengaluru",
    attendees: 234,
    category: "Social",
    description: "The most awaited event of the year! Reconnect with old friends, faculty, and make new memories at the Grand Alumni Reunion."
  },
  {
    id: 4,
    title: "Startup India Pitch Night",
    date: "April 25, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "NASSCOM, Bengaluru",
    attendees: 85,
    category: "Entrepreneurship",
    description: "Witness the next generation of entrepreneurs pitch their innovative ideas to a panel of investors and industry experts. A must-attend for aspiring founders."
  },
  {
    id: 5,
    title: "AI for Bharat Summit",
    date: "May 5, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Online",
    attendees: 150,
    category: "Technology",
    description: "A full-day summit dedicated to exploring the potential of Artificial Intelligence in solving India's unique challenges. Featuring keynotes, panel discussions, and hands-on workshops."
  },
  {
    id: 6,
    title: "Alumni Cricket League",
    date: "May 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "University Sports Ground",
    attendees: 300,
    category: "Recreation",
    description: "Get ready for a day of friendly competition and fun at the Alumni Cricket League. Form your teams and compete for the coveted trophy."
  },
]

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [eventToWithdraw, setEventToWithdraw] = useState(null);
  const [allEvents, setAllEvents] = useState(upcomingEvents);
  const [rsvpStatus, setRsvpStatus] = useState(() => {
    const savedRsvp = localStorage.getItem("rsvpStatus");
    return savedRsvp ? JSON.parse(savedRsvp) : {};
  });
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null);


  useEffect(() => {
    const customEvents = JSON.parse(localStorage.getItem("customEvents") || "[]");
    setAllEvents([...upcomingEvents, ...customEvents]);
  }, []);

  const handleRsvpClick = (event) => {
    setSelectedEvent(event);
    setIsRsvpOpen(true);
  };

  const handleRsvpConfirm = () => {
    const newRsvpStatus = { ...rsvpStatus, [selectedEvent.id]: true };
    setRsvpStatus(newRsvpStatus);
    localStorage.setItem("rsvpStatus", JSON.stringify(newRsvpStatus));
    setIsRsvpOpen(false);
  };

  const handleWithdrawClick = (event) => {
    setEventToWithdraw(event);
    setIsWithdrawDialogOpen(true);
  };

  const handleWithdrawConfirm = () => {
    const newRsvpStatus = { ...rsvpStatus, [eventToWithdraw.id]: false };
    setRsvpStatus(newRsvpStatus);
    localStorage.setItem("rsvpStatus", JSON.stringify(newRsvpStatus));
    setIsWithdrawDialogOpen(false);
  };

  const handleLearnMoreClick = (event) => {
    setSelectedEventForDetails(event);
    setIsLearnMoreOpen(true);
  };

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
                Alumni <span className="text-gradient">Events</span>
              </h1>
              <p className="text-muted-foreground">
                Join exclusive events and connect with your community
              </p>
            </div>
            <Button asChild className="glow-border">
              <Link to="/events/new">Create Event</Link>
            </Button>
          </div>

          <div className="space-y-6">
            {allEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6 glow-border hover:scale-[1.02] transition-transform">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-gradient">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                          <Badge variant="secondary">{event.category}</Badge>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {rsvpStatus[event.id] ? (
                          <>
                            <Button className="glow-border" disabled>
                              <Check className="h-4 w-4 mr-2" />
                              RSVP'd
                            </Button>
                            <Button variant="outline" onClick={() => handleWithdrawClick(event)}>
                              <X className="h-4 w-4 mr-2" />
                              Withdraw RSVP
                            </Button>
                          </>
                        ) : (
                          <Button className="glow-border" onClick={() => handleRsvpClick(event)}>RSVP</Button>
                        )}
                        <Button variant="outline" onClick={() => handleLearnMoreClick(event)}>Learn More</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FloatingChatbot />
      </div>

      <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
        <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gradient">RSVP</DialogTitle>
              <DialogDescription>
                This is a dummy RSVP form.
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 space-y-2">
                <p>Some random content to show that the dialog is working.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRsvpOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button className="glow-border" onClick={handleRsvpConfirm}>
                <Check className="h-4 w-4 mr-2" />
                Confirm RSVP
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle className="text-2xl text-destructive">Withdraw RSVP</DialogTitle>
              <DialogDescription>
                Are you sure you want to withdraw your RSVP for this event?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleWithdrawConfirm}>
                <Check className="h-4 w-4 mr-2" />
                Confirm Withdrawal
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedEventForDetails && (
        <Dialog open={isLearnMoreOpen} onOpenChange={setIsLearnMoreOpen}>
          <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle className="text-2xl text-gradient">{selectedEventForDetails.title}</DialogTitle>
                <DialogDescription>
                  {selectedEventForDetails.description}
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedEventForDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedEventForDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedEventForDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{selectedEventForDetails.attendees} attending</span>
                  </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLearnMoreOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

