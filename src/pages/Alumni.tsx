import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Mail, Linkedin } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const mockAlumni = [
  { id: 1, name: "Priya Sharma", batch: "2018", course: "Computer Science", company: "Infosys", location: "Bengaluru", initials: "PS", email: "priya.sharma@infosys.com", linkedin: "https://www.linkedin.com/in/priyasharma", bio: "Passionate about building scalable systems and working on cutting-edge AI projects." },
  { id: 2, name: "Rohan Gupta", batch: "2015", course: "Business Admin", company: "Reliance Industries", location: "Mumbai", initials: "RG", email: "rohan.gupta@ril.com", linkedin: "https://www.linkedin.com/in/rohan-gupta", bio: "Experienced business strategist with a focus on market expansion and product growth." },
  { id: 3, name: "Anjali Singh", batch: "2020", course: "Marketing", company: "Tata Consumer Products", location: "Kolkata", initials: "AS", email: "anjali.singh@tataconsumer.com", linkedin: "https://www.linkedin.com/in/anjalisingh", bio: "Creative marketer with a knack for storytelling and building strong brand identities." },
  { id: 4, name: "Vikram Kumar", batch: "2019", course: "Engineering", company: "L&T", location: "Chennai", initials: "VK", email: "vikram.kumar@larsentoubro.com", linkedin: "https://www.linkedin.com/in/vikramkumar", bio: "Mechanical engineer with a passion for sustainable energy and infrastructure projects." },
  { id: 5, name: "Sneha Patel", batch: "2017", course: "Design", company: "Myntra", location: "Bengaluru", initials: "SP", email: "sneha.patel@myntra.com", linkedin: "https://www.linkedin.com/in/snehapatel", bio: "Product designer focused on creating intuitive and beautiful user experiences for e-commerce." },
  { id: 6, name: "Arjun Reddy", batch: "2016", course: "Finance", company: "HDFC Bank", location: "Mumbai", initials: "AR", email: "arjun.reddy@hdfcbank.com", linkedin: "https://www.linkedin.com/in/arjunreddy", bio: "Investment banker with expertise in M&A and capital markets." },
  { id: 7, name: "Neha Sharma", batch: "2021", course: "Data Science", company: "Swiggy", location: "Bengaluru", initials: "NS", email: "neha.sharma@swiggy.com", linkedin: "https://www.linkedin.com/in/nehasharma", bio: "Data scientist who loves to find insights in large datasets and build predictive models." },
  { id: 8, name: "Karan Malhotra", batch: "2014", course: "Law", company: "Cyril Amarchand Mangaldas", location: "Delhi", initials: "KM", email: "karan.m@amarchand.com", linkedin: "https://www.linkedin.com/in/karanmalhotra", bio: "Corporate lawyer specializing in intellectual property and technology law." },
  { id: 9, name: "Pooja Mehta", batch: "2022", course: "Medicine", company: "Apollo Hospitals", location: "Chennai", initials: "PM", email: "pooja.m@apollohospitals.com", linkedin: "https://www.linkedin.com/in/poojamehta", bio: "Resident physician dedicated to patient care and medical research." },
  { id: 10, name: "Sameer Khan", batch: "2013", course: "Architecture", company: "Hafeez Contractor", location: "Mumbai", initials: "SK", email: "sameer.k@hafeezcontractor.com", linkedin: "https://www.linkedin.com/in/sameerkhan", bio: "Architect with a focus on sustainable and innovative building design." },
];

export default function Alumni() {
  const [search, setSearch] = useState("");
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const filtered = mockAlumni.filter(
    (alumni) =>
      alumni.name.toLowerCase().includes(search.toLowerCase()) ||
      alumni.company.toLowerCase().includes(search.toLowerCase()) ||
      alumni.course.toLowerCase().includes(search.toLowerCase())
  );

  const handleAlumnusClick = (alumnus) => {
    setSelectedAlumnus(alumnus);
    setIsDetailViewOpen(true);
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
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Alumni <span className="text-gradient">Directory</span>
            </h1>
            <p className="text-muted-foreground">
              Connect with alumni across industries and locations
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, company, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleAlumnusClick(alumni)}
              >
                <Card className="glass-card p-6 glow-border hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                        {alumni.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{alumni.name}</h3>
                      <p className="text-sm text-muted-foreground">Class of {alumni.batch}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Badge variant="secondary">{alumni.course}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{alumni.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{alumni.location}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No alumni found matching your search</p>
            </div>
          )}
        </motion.div>

        
      </div>

      <AnimatePresence>
        {isDetailViewOpen && selectedAlumnus && (
          <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
            <DialogContent className="glass-card max-w-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/30 mb-4">
                    <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                      {selectedAlumnus.initials}
                    </AvatarFallback>
                  </Avatar>
                  <DialogTitle className="text-3xl font-bold">{selectedAlumnus.name}</DialogTitle>
                  <DialogDescription className="text-lg text-gradient">{selectedAlumnus.course} - Class of {selectedAlumnus.batch}</DialogDescription>
                </DialogHeader>
                <div className="my-6 space-y-4 text-center">
                  <p className="text-muted-foreground">{selectedAlumnus.bio}</p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span>{selectedAlumnus.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{selectedAlumnus.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <a href={`mailto:${selectedAlumnus.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5" />
                    <span>Email</span>
                  </a>
                  <a href={selectedAlumnus.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}