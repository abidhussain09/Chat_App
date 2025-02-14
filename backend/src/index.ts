export default {
  register() { },

  bootstrap({ strapi }) {
    const { Server } = require("socket.io");
    const io = new Server(3001, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // Handle message event
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

          // Send the saved message back to the frontend
          io.to(socket.id).emit("message", response);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  },
};
