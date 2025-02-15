import { Server } from "socket.io";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  bootstrap({ strapi }) {
    // Attach WebSocket to Strapi's HTTP server
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5174", // Allow frontend
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("message", async (data) => {
        console.log("Received message:", data);
        const { userId, message } = data;

        try {
          // Save chat message in Strapi (PostgreSQL)
          const response = await strapi.entityService.create("api::chat.chat", {
            data: {
              message_text: message,
              user: userId,
            },
          });

          console.log("Message saved:", response);

          // Broadcast the message to all connected clients
          io.emit("message", response);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  },
});
