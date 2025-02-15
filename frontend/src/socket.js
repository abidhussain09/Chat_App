import { io } from "socket.io-client";

// Retrieve the JWT token from localStorage
const userToken = localStorage.getItem("jwt");

if (!userToken) {
  console.error("❌ No JWT token found. WebSocket connection will fail.");
} else {
  console.log("✅ Found JWT token:", userToken);
}

const socket = io("https://chat-app-ngfj.onrender.com", {
  transports: ["websocket", "polling"], // ✅ Ensures fallback to polling
  withCredentials: true, // ✅ Ensures authentication cookies are sent
  extraHeaders: {
    Authorization: `Bearer ${userToken}`, // ✅ Send JWT for authentication
  },
  reconnection: true,
  reconnectionAttempts: 5,
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
