import { io } from "socket.io-client";

// Retrieve JWT token from localStorage
const userToken = localStorage.getItem("jwt");

const socket = io("https://chatapp-production-0e9e.up.railway.app", {
  path:"/socket.io",
  transports: ["websocket", "polling"], // ✅ Fallback in case WebSockets are blocked
  withCredentials: true, // ✅ Ensures authentication cookies are sent
  extraHeaders: {
    Authorization: `Bearer ${userToken}`, // ✅ Send JWT token for authentication
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  secure:true,
  rejectUnauthorized:false,
  timeout: 20000,
  forceNew: true,
});

// Debugging logs
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
