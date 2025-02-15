// socket.js
import { io } from "socket.io-client";

const socket = io("https://chat-app-igty.onrender.com:3001", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
    transports: ['websocket', 'polling'],
    secure: true,
    rejectUnauthorized: false,
});

// Add error handling
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

socket.on('connect_timeout', (timeout) => {
    console.error('Connection timeout:', timeout);
});

socket.on('reconnect_attempt', (attemptNumber) => {
    console.log('Reconnection attempt:', attemptNumber);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

socket.on('message', (message) => {
    console.log('Received message:', message);
});

export default socket;