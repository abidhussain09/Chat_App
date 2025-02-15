import { io } from "socket.io-client";

const socket = io("https://chat-app-ngfj.onrender.com", {
  transports: ["websocket", "polling"], // ✅ Fallback if WebSockets fail
  withCredentials: true, // ✅ Ensures authentication works
  reconnection: true, // ✅ Retry if the connection drops
  reconnectionAttempts: 5, // ✅ Retry up to 5 times
  timeout: 20000, // ✅ Avoids immediate timeouts
  forceNew: true, // ✅ Forces new WebSocket connection instead of reusing old ones
});

// Debugging
socket.on("connect", () => {
  console.log("✅ Connected to WebSocket server!", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ WebSocket Connection Error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ WebSocket Disconnected:", reason);
});

export default socket;
