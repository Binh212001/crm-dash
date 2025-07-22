import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/app/axiosInstance";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

function RoomChat() {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Tách logic fetch messages và socket ra thành 2 useEffect riêng biệt
  // Fetch messages for the room from backend when roomId changes
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/rooms/message", {
          params: { roomId },
        });
        setMessages(res.data.data);
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  // Socket logic: join room, listen for new messages
  useEffect(() => {
    if (!roomId) return;

    // Only create socket if not already created
    if (!socketRef.current) {
      // Get token from localStorage (or wherever you store it)
      const token = localStorage.getItem("accessToken");
      socketRef.current = io("http://localhost:3000", {
        transports: ["polling", "websocket"],
        reconnectionAttempts: 5,
        extraHeaders: {},
        timeout: 10000,
        auth: {
          token: token ? `Bearer ${token}` : undefined,
        },
      });
    }

    const socket = socketRef.current;

    const handleConnect = () => {
      socket?.emit("joinRoom", { roomId });
    };

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("connect", handleConnect);
    socket.on("newMessage", handleNewMessage);

    // Nếu socket đã kết nối thì join luôn
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  // Use the correct event name and payload structure as expected by chats.gateway.ts ("createMessage")
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Send message to backend via socket if connected
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("createMessage", {
        roomId,
        content: input,
        sender: {
          id: "0198269d-0abc-732b-9007-7c893a72484c",
          name: "Bạn",
        },
      });
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Danh sách tin nhắn */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
        {loading && <div className="text-gray-500">Đang tải tin nhắn...</div>}
        {!loading && messages.length === 0 && (
          <div className="text-gray-500">Chưa có tin nhắn nào.</div>
        )}
        {!loading &&
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender.name === "Bạn" || msg.sender.id === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender.name === "Bạn" || msg.sender.id === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="block text-xs font-semibold mb-1">
                  {msg.sender.name}
                </span>
                <span>{msg.content}</span>
              </div>
            </div>
          ))}
      </div>
      {/* Form gửi tin nhắn */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2"
      >
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}

export default RoomChat;
