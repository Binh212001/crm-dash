import { io } from "socket.io-client";
const socket = io("http://localhost:800/chats", {
  // Nếu cần gửi token:
  // extraHeaders: { authorization: "Bearer <token>" }
});

export default socket;