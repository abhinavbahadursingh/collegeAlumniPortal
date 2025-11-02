import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers for reuse
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not available");
    }

    // The frontend sends a `messages` array
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("No messages provided in the request body.");
    }

    // Get the last message from the user
    const lastMessage = messages.at(-1);
    if (!lastMessage || !lastMessage.text) {
        throw new Error("Invalid message format.");
    }

    // Build conversation history
    const contents = [];
    
    // Add system instruction as first user message
    contents.push({
      role: "user",
      parts: [{ text: "You are a helpful and friendly assistant for an alumni network called Alma Matrix." }]
    });
    contents.push({
      role: "model",
      parts: [{ text: "Great to meet you. I am the Alma Matrix assistant. How can I help you?" }]
    });

    // Add all messages from the conversation
    for (const msg of messages) {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      });
    }

    // Make direct API call to Gemini v1 API
    // Try gemini-pro first (most widely available)
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    // Extract the generated text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error("No response text from Gemini API");
    }

    // The frontend expects a `reply` field
    return new Response(JSON.stringify({ reply: text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Edge Function Error:", error);
    
    // Return a proper error response with CORS headers
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
