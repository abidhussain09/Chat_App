import { Server, ServerOptions } from "socket.io";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer as any, {
      cors: {
        origin: [
          "https://chat-app-psi-beige-21.vercel.app", // ✅ Allow frontend
        ],
        methods: ["GET", "POST"],
        credentials: true,
      },
      transports: ["websocket", "polling"] as ServerOptions["transports"], // ✅ Fix TypeScript issue
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("message", async (data) => {
        console.log("Received message:", data);
        const { userId, message } = data;

        try {
          const response = await strapi.entityService.create("api::chat.chat", {
            data: {
              message_text: message,
              user: userId,
            },
          });

          console.log("Message saved:", response);
          io.emit("message", response); // ✅ Broadcast to all clients
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    // Attach io instance to Strapi for global use
    strapi.io = io;
  },
});
