import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

// Consistent naming with backend
interface Message {
  text: string;
  sender: "user" | "bot";
}

// Renamed for clarity and convention
export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, sender: "user" };
    // Add user message to state
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // The body must match the function's expectation: { messages: [...] }
      const { data, error } = await supabase.functions.invoke("chatbot", {
        body: { messages: newMessages },
      });

      if (error) {
        throw error;
      }

      // The function returns a `reply` field
      const botMessage: Message = { text: data.reply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error: any) {
      console.error("Raw error from Supabase:", error);
      // The actual error from the function is in a ReadableStream, we need to decode it.
      if (error.context?.body instanceof ReadableStream) {
        try {
          const reader = error.context.body.getReader();
          const { value } = await reader.read();
          const errorText = new TextDecoder().decode(value);
          console.error("Detailed error from function:", JSON.parse(errorText));
        } catch (e) {
          console.error("Failed to read or parse error stream:", e);
        }
      }
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full animate-glow-pulse shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="glass-card rounded-2xl p-6 shadow-2xl border flex flex-col h-[500px]">
              <h3 className="text-lg font-bold mb-4 text-gradient">AI Assistant</h3>
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index} // Using index as key is acceptable for this append-only list
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "glass-card border text-muted-foreground"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="glass-card border p-3 rounded-lg text-muted-foreground">
                        Typing...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleSend();
                    }
                  }}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
