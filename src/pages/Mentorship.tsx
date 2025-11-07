import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Check, X, Mail, Linkedin } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const mentors = [
  { id: 1, name: "Dr. Rajesh Kumar", expertise: "AI & Machine Learning", rating: 4.9, sessions: 156, initials: "RK", available: true, email: "rajesh.k@iitb.ac.in", linkedin: "https://www.linkedin.com/in/rajeshkumar", bio: "Lead AI researcher with 10+ years of experience in deep learning and natural language processing. Passionate about mentoring the next generation of AI experts." },
  { id: 2, name: "Prof. Meera Desai", expertise: "Business Strategy", rating: 4.8, sessions: 203, initials: "MD", available: true, email: "meera.d@iima.ac.in", linkedin: "https://www.linkedin.com/in/meeradesai", bio: "IIM Ahmedabad professor and consultant for top Indian startups. Specializes in market entry strategies and corporate finance." },
  { id: 3, name: "Aditi Sharma", expertise: "Product Design", rating: 4.9, sessions: 127, initials: "AS", available: false, email: "aditi.s@flipkart.com", linkedin: "https://www.linkedin.com/in/aditisharma", bio: "Senior Product Designer at Flipkart, focusing on user-centric design and creating seamless user experiences. Currently on a sabbatical." },
  { id: 4, name: "Siddharth Singh", expertise: "Data Science", rating: 4.7, sessions: 98, initials: "SS", available: true, email: "siddharth.s@zomato.com", linkedin: "https://www.linkedin.com/in/siddharthsingh", bio: "Data scientist at Zomato, using machine learning to personalize food recommendations. Enjoys helping mentees with their data science projects." },
];

export default function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isFindMentorDialogOpen, setIsFindMentorDialogOpen] = useState(false);
  const [mentorToCancel, setMentorToCancel] = useState(null);
  const [requestStatus, setRequestStatus] = useState(() => {
    const savedStatus = localStorage.getItem("requestStatus");
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  useEffect(() => {
    localStorage.setItem("requestStatus", JSON.stringify(requestStatus));
  }, [requestStatus]);

  const handleRequestClick = (mentor) => {
    setSelectedMentor(mentor);
    setIsRequestDialogOpen(true);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, [selectedMentor.id]: true });
    setIsRequestDialogOpen(false);
    toast.success(`Session request sent to ${selectedMentor.name}`);
  };

  const handleCancelClick = (mentor) => {
    setMentorToCancel(mentor);
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    setRequestStatus({ ...requestStatus, [mentorToCancel.id]: false });
    setIsCancelDialogOpen(false);
    toast.info("Session request cancelled");
  };

  const handleProfileClick = (mentor) => {
    setSelectedMentor(mentor);
    setIsProfileDialogOpen(true);
  };

  const handleFindMentorSubmit = (e) => {
    e.preventDefault();
    setIsFindMentorDialogOpen(false);
    toast.success("Your request has been submitted. We will get back to you soon.");
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
                Mentorship <span className="text-gradient">Hub</span>
              </h1>
              <p className="text-muted-foreground">
                Connect with experienced alumni and accelerate your growth
              </p>
            </div>
            <Button asChild className="glow-border">
              <Link to="/become-mentor">Become a Mentor</Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6 glow-border hover:scale-105 transition-transform">
                  <div className="flex gap-4 mb-4">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                        {mentor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{mentor.expertise}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{mentor.rating}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {mentor.sessions} sessions
                        </div>
                      </div>
                    </div>
                    {mentor.available && (
                      <Badge variant="secondary" className="h-fit">Available</Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Experienced professional specializing in {mentor.expertise.toLowerCase()}. 
                      Passionate about helping early-career professionals navigate their journey.
                    </p>
                    <div className="flex gap-2">
                      {requestStatus[mentor.id] ? (
                        <>
                          <Button className="flex-1" disabled>
                            <Check className="h-4 w-4 mr-2" />
                            Waiting for approval
                          </Button>
                          <Button variant="outline" onClick={() => handleCancelClick(mentor)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel Request
                          </Button>
                        </>
                      ) : (
                        <Button className="flex-1 glow-border" onClick={() => handleRequestClick(mentor)} disabled={!mentor.available}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Request Session
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => handleProfileClick(mentor)}>View Profile</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Can't find the right mentor?
            </h3>
            <p className="text-muted-foreground mb-6">
              Tell us what you're looking for and we'll help you find the perfect match
            </p>
            <Button size="lg" className="glow-border" onClick={() => setIsFindMentorDialogOpen(true)}>Submit Request</Button>
          </Card>
        </motion.div>

        
      </div>

      {selectedMentor && (
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gradient">Request a Session with {selectedMentor.name}</DialogTitle>
              <DialogDescription>
                Send a message to {selectedMentor.name} to request a mentorship session.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit}>
              <div className="my-4">
                <Textarea placeholder="Write a message..." rows={5} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
                <Button type="submit" className="glow-border">Send Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {mentorToCancel && (
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle className="text-2xl text-destructive">Cancel Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your session request to {mentorToCancel.name}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>No, keep request</Button>
              <Button variant="destructive" onClick={handleCancelConfirm}>Yes, cancel request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedMentor && (
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="glass-card max-w-lg">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/30 mb-4">
                    <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                      {selectedMentor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <DialogTitle className="text-3xl font-bold">{selectedMentor.name}</DialogTitle>
                  <DialogDescription className="text-lg text-gradient">{selectedMentor.expertise}</DialogDescription>
                </DialogHeader>
                <div className="my-6 space-y-4 text-center">
                  <p className="text-muted-foreground">{selectedMentor.bio}</p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>{selectedMentor.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{selectedMentor.sessions} Sessions</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <a href={`mailto:${selectedMentor.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5" />
                    <span>Email</span>
                  </a>
                  <a href={selectedMentor.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isFindMentorDialogOpen} onOpenChange={setIsFindMentorDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient">Find the Right Mentor</DialogTitle>
            <DialogDescription>
              Tell us what you're looking for in a mentor, and we'll help you find the perfect match.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFindMentorSubmit}>
            <div className="my-4">
              <Textarea placeholder="Describe your ideal mentor, your goals, and what you'd like to learn..." rows={8} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFindMentorDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="glow-border">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}