"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Mic, Bot, User } from "lucide-react";

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your Smart Health Assistant. How can I help you today?",
    },
    {
      id: 2,
      sender: "user",
      text: "Show me my today's medication schedule.",
    },
    {
      id: 3,
      sender: "ai",
      text: "You have 2 medicines scheduled: Atorvastatin at 9:00 AM and Vitamin B12 at 8:00 PM.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = {
        id: Date.now() + 1,
        sender: "ai",
        text: "This is a demo AI response. Soon this will be powered by conversational AI + Agora voice/video.",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-5 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="space-y-3">
          <button className="w-full px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700">
            View Medication Schedule
          </button>
          <button className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Show Health Summary
          </button>
          <button className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
            Emergency Help
          </button>
          <button className="w-full px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-black">
            Start Video Call (Coming Soon)
          </button>
        </div>
      </aside>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="p-4 border-b bg-white flex items-center gap-3">
          <Bot className="text-purple-600" size={24} />
          <h1 className="text-xl font-semibold">AI Health Assistant</h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-2 text-gray-500">
              <Bot size={18} />
              <div className="animate-pulse text-sm">Assistant is typing…</div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <input
            className="flex-1 border rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Ask something…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="p-3 rounded-md bg-gray-200 hover:bg-gray-300">
            <Mic size={20} />
          </button>
          <button
            className="p-3 rounded-md bg-purple-600 text-white hover:bg-purple-700"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
