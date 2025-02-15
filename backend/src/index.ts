import { Server,ServerOptions } from "socket.io";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  bootstrap({ strapi }) {
    // Wait for Strapi's server to be ready
    process.nextTick(() => {
      if (!strapi.server.httpServer) {
        console.error("❌ Strapi HTTP server not initialized.");
        return;
      }

      const io = new Server(strapi.server.httpServer, {
        cors: {
          origin: ["https://chat-app-psi-beige-21.vercel.app"], // ✅ Allow frontend
          methods: ["GET", "POST"],
          credentials: true,
        },
        transports: ["websocket", "polling"] as ServerOptions["transports"],
        allowEIO3: true,  
      });

      io.on("connection", (socket) => {
        console.log("✅ WebSocket Connected:", socket.id);

        socket.on("message", async (data) => {
          console.log("📩 Received message:", data);
          const { userId, message } = data;

          try {
            const response = await strapi.entityService.create("api::chat.chat", {
              data: {
                message_text: message,
                user: userId,
              },
            });

            console.log("💾 Message saved:", response);
            io.emit("message", response);
          } catch (error) {
            console.error("❌ Error saving message:", error);
          }
        });

        socket.on("disconnect", () => {
          console.log("⚠️ User disconnected:", socket.id);
        });
      });

      strapi.io = io; // Attach globally
    });
  },
});
