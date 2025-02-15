require("dotenv").process.config();
export default {
  register() { },
  bootstrap({ strapi }) {
    const { Server } = require("socket.io");
    const io = new Server(3001, {
      cors: {
        origin: "http://localhost:5174",
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
      
      socket.on("message", async (data) => {
        try {
          const { userId, message } = data;
          const response = await strapi.entityService.create("api::chat.chat", {
            data: {
              message_text: message,
              user: userId,
            },
          });
          
          // Broadcast to all connected clients
          io.emit("message", response);
          
          // Send back to sender
          socket.emit("message", response);
        } catch (error) {
          console.error("Error handling message:", error);
          socket.emit("error", { message: "Failed to process message" });
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  },
};