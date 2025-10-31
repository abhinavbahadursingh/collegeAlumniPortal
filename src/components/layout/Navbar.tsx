import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-gradient">AlumniNet</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/events" className="text-sm hover:text-primary transition-colors">Events</Link>
          <Link to="/alumni" className="text-sm hover:text-primary transition-colors">Alumni</Link>
          <Link to="/mentorship" className="text-sm hover:text-primary transition-colors">Mentorship</Link>
          <Link to="/meetings" className="text-sm hover:text-primary transition-colors">Meetings</Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild variant="outline" className="glow-border">
              <Link to="/auth">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </motion.nav>
  )
}
