import { io } from "socket.io-client";

// Connect WebSocket to backend (No need for :3001)
const socket = io("https://chat-app-ngfj.onrender.com", {
  transports: ["websocket"], // Use WebSocket transport
});

export default socket;
