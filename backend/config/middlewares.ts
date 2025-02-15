module.exports = [
  "strapi::errors", // REQUIRED: Handles errors
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: ["https://chat-app-two-ivory.vercel.app/"], // Allow frontend access
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    },
  },
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
