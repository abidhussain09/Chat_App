import { io } from "socket.io-client";
const socket = io("https://chat-app-igty.onrender.com:3001");

export default socket;
