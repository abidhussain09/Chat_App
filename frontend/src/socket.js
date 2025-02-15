import { io } from "socket.io-client";

const socket = io("https://chat-app-ngfj.onrender.com", {
  transports: ["websocket", "polling"], // ✅ Ensures fallback connection
  withCredentials: true, // ✅ Ensures authentication
  reconnection: true, // ✅ Auto-reconnect if the connection drops
  reconnectionAttempts: 5, // ✅ Retry up to 5 times
  timeout: 20000, // ✅ Increase timeout to prevent Render disconnects
});

export default socket;
