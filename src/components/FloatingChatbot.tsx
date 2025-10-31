import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from "@/integrations/supabase/client"

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi! I'm your AI assistant. How can I help you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const sendMessage = async () => {
  //   if (input.trim() === "") return;

  //   const userMessage: ChatMessage = { id: messages.length + 1, text: input, sender: "user" };
  //   setMessages((prevMessages) => [...prevMessages, userMessage]);
  //   setInput("");
  //   setIsLoading(true);

  //   try {
  //     const { data, error } = await supabase.functions.invoke("chatbot", { 
  //       body: { query: userMessage.text },  // ✅ FIXED: Removed JSON.stringify()
  //     });

  //     if (error) {
  //       console.error("Error invoking chatbot function:", error);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { id: prevMessages.length + 1, text: "Sorry, I'm having trouble connecting to the AI.", sender: "ai" },
  //       ]);
  //     } else {
  //       const aiResponse: ChatMessage = { id: messages.length + 2, text: data.response, sender: "ai" };
  //       setMessages((prevMessages) => [...prevMessages, aiResponse]);
  //     }
  //   } catch (error) {
  //     console.error("Network or unexpected error:", error);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: prevMessages.length + 1, text: "An unexpected error occurred.", sender: "ai" },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const sendMessage = async () => {
  if (input.trim() === "") return;

  const userMessage: ChatMessage = { id: messages.length + 1, text: input, sender: "user" };
  setMessages((prevMessages) => [...prevMessages, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    const { data, error } = await supabase.functions.invoke("chatbot", {
      body: JSON.stringify({ message: userMessage.text }), // ✅ FIX 1: JSON.stringify
      headers: { "Content-Type": "application/json" },      // ✅ FIX 2: Explicit header
    });

    if (error) {
      console.error("Error invoking chatbot function:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: "Sorry, I'm having trouble connecting to the AI.", sender: "ai" },
      ]);
    } else {
      const aiResponseText =
        data?.response ||
        data?.message ||
        JSON.stringify(data) ||
        "No response from AI.";

      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }
  } catch (error) {
    console.error("Network or unexpected error:", error);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: "An unexpected error occurred.", sender: "ai" },
    ]);
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
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${message.sender === "user"
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
                      sendMessage();
                    }
                  }}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={sendMessage} disabled={isLoading}>
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