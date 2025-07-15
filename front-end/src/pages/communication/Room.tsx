import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const Room: React.FC = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected');

      socket.emit('events', { message: 'Xin chapo ban' });
    
    });

    socket.on('events', (data: any) => {
      console.log('event', data);
      if (data && data.message) {
        setReceivedMessage(data.message);
      }
    });

    socket.on('exception', (data: any) => {
      console.log('exception', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socketRef.current) {
      console.log("Sending message:", message);
      socketRef.current.emit("events", { message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
      <form onSubmit={handleSend} className="flex gap-2 mb-4">
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
      {receivedMessage && (
        <div className="bg-white border rounded p-4 shadow">
          <span className="font-semibold">Received:</span> {receivedMessage}
        </div>
      )}
    </div>
  );
};

export default Room;
