const { Server } = require("socket.io");
const io = new Server(3001, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (msg) => {
        console.log("Message received: ", msg);
        socket.emit("message", "BRO "+msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
