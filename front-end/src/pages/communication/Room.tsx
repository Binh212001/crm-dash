import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// This would be replaced by a real API call to fetch room messages
async function fetchRoomMessages(roomId: string): Promise<Message[]> {
  // Simulate API call
  return [
    {
      id: "1",
      sender: "John Doe",
      content: "Hey there! How's it going?",
      timestamp: "2024-06-10T10:00:00Z",
    },
    {
      id: "2",
      sender: "Jane Smith",
      content: "All good! Working on the new project.",
      timestamp: "2024-06-10T10:01:00Z",
    },
    {
      id: "3",
      sender: "John Doe",
      content: "Awesome! Let me know if you need any help.",
      timestamp: "2024-06-10T10:02:00Z",
    },
  ];
}

// This would be replaced by a real API call to send a message
async function sendRoomMessage(roomId: string, message: Omit<Message, "id" | "timestamp">): Promise<Message> {
  // Simulate API call and return the message with id and timestamp
  return {
    ...message,
    id: Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
  };
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const Room: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (roomId) {
      fetchRoomMessages(roomId).then((msgs) => {
        if (mounted) {
          setMessages(msgs);
          setLoading(false);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !roomId) return;
    setSending(true);
    const newMessage: Omit<Message, "id" | "timestamp"> = {
      sender: "You",
      content: input,
    };
    try {
      const sent = await sendRoomMessage(roomId, newMessage);
      setMessages((prev) => [...prev, sent]);
      setInput("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-white rounded-lg shadow p-4">
      <div className="border-b pb-3 mb-3">
        <h1 className="text-2xl font-bold">Room {roomId}</h1>
        <p className="text-gray-500 text-sm">Chat with your team in real time</p>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 px-1">
        {loading ? (
          <div className="text-center text-gray-400 mt-8">Loading messages...</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="text-xs font-semibold mb-1">
                  {msg.sender}
                  <span className="ml-2 text-[10px] text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Room;
