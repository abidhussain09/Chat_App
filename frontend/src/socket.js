import { io } from "socket.io-client";

const socket = io("https://chat-app-ngfj.onrender.com", {
  transports: ["websocket", "polling"], // ✅ Use WebSockets & polling for reliability
  withCredentials: true, // ✅ Ensure cookies & authentication work
});

export default socket;
