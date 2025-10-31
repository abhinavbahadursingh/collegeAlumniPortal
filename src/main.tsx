import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "hsl(180 100% 50%)", // --primary
        colorSecondary: "hsl(270 80% 60%)", // --secondary
        colorBackground: "hsl(220 25% 5%)", // --background
        colorText: "hsl(210 40% 98%)", // --foreground
        colorInputBackground: "hsl(220 20% 15%)", // --input
        colorInputText: "hsl(210 40% 98%)", // --foreground
      },
    }}
  >
    <App />
  </ClerkProvider>
);


