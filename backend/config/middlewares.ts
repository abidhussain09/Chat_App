module.exports = [
  "strapi::errors", // Required for error handling
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: "*", // Allow all origins (for now)
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      headers: ["Content-Type", "Authorization"],
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
