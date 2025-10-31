import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Alumni from "./pages/Alumni";
import Events from "./pages/Events";
import Mentorship from "./pages/Mentorship";
import CreateEvent from "./pages/CreateEvent";
import BecomeMentor from "./pages/BecomeMentor";
import Meetings from "./pages/Meetings";
import CreateMeeting from "./pages/CreateMeeting";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              }
            />
            <Route
              path="/alumni"
              element={
                <SignedIn>
                  <Alumni />
                </SignedIn>
              }
            />
            <Route
              path="/events"
              element={
                <SignedIn>
                  <Events />
                </SignedIn>
              }
            />
            <Route
              path="/events/new"
              element={
                <SignedIn>
                  <CreateEvent />
                </SignedIn>
              }
            />
            <Route
              path="/mentorship"
              element={
                <SignedIn>
                  <Mentorship />
                </SignedIn>
              }
            />
            <Route
              path="/become-mentor"
              element={
                <SignedIn>
                  <BecomeMentor />
                </SignedIn>
              }
            />
            <Route
              path="/meetings"
              element={
                <SignedIn>
                  <Meetings />
                </SignedIn>
              }
            />
            <Route
              path="/meetings/new"
              element={
                <SignedIn>
                  <CreateMeeting />
                </SignedIn>
              }
            />
            <Route
              path="/analytics"
              element={
                <SignedIn>
                  <Analytics />
                </SignedIn>
              }
            />
            <Route
              path="*"
              element={
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

