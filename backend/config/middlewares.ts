module.exports = [
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["https://your-frontend.onrender.com"], // Allow frontend to access backend
    },
  },
  "strapi::security",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
