export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: [
        process.env.FRONTEND_URL || "http://localhost:5174", // ✅ Allow frontend
        "https://chat-app-ngfj.onrender.com", // ✅ Allow backend requests
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true, // ✅ Allow cookies and authentication tokens
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
