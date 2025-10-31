import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Use Google's FLAN-T5 - highly reliable and fast
const HF_MODEL_ID = "google/flan-t5-base";
const HF_API_TOKEN = Deno.env.get("HF_API_TOKEN");

// Central CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

serve(async (req) => {
  console.log("=== Chatbot Function Invoked ===");
  console.log("Method:", req.method);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse request body - support both 'message' and 'query' for compatibility
    const body = await req.json();
    const userMessage = body.message || body.query;

    console.log("Received message:", userMessage);

    if (!userMessage || typeof userMessage !== "string" || userMessage.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid message/query in request body" }), 
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Check if API token is configured
    if (!HF_API_TOKEN) {
      console.error("HF_API_TOKEN not set in environment");
      return new Response(
        JSON.stringify({ error: "HF_API_TOKEN not configured" }), 
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    console.log("Calling Hugging Face API...");

    // Call Hugging Face API
    const hfResponse = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL_ID}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: userMessage,
          parameters: {
            max_length: 200,
            min_length: 10,
            do_sample: true,
            temperature: 0.7,
          },
          options: {
            wait_for_model: true,
            use_cache: false,
          }
        }),
      }
    );

    console.log("Hugging Face response status:", hfResponse.status);

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("Hugging Face API Error:", errorText);
      
      return new Response(
        JSON.stringify({ 
          error: "Hugging Face API request failed",
          details: errorText,
          status: hfResponse.status 
        }), 
        {
          status: hfResponse.status,
          headers: corsHeaders,
        }
      );
    }

    const result = await hfResponse.json();
    console.log("Hugging Face response:", JSON.stringify(result));

    // Extract generated text from various response formats
    let reply;
    
    if (Array.isArray(result)) {
      reply = result[0]?.generated_text || result[0]?.translation_text;
    } else if (result.generated_text) {
      reply = result.generated_text;
    }

    // Fallback if no valid response
    if (!reply || reply.trim() === "") {
      reply = "I'm here to help! Could you rephrase that?";
    }

    // Clean up response - remove input echo if present
    if (reply.toLowerCase().startsWith(userMessage.toLowerCase())) {
      reply = reply.slice(userMessage.length).trim();
    }

    // Return in the format expected by FloatingChatbot (response key)
    return new Response(
      JSON.stringify({ 
        response: reply,  // Frontend expects 'response' key
        reply: reply      // Also include 'reply' for compatibility
      }), 
      {
        status: 200,
        headers: corsHeaders,
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred",
        message: error.message,
        stack: error.stack 
      }), 
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});