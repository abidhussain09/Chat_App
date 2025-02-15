export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://chat-app-psi-beige-21.vercel.app", // ✅ Allow frontend
        "https://chat-app-ngfj.onrender.com", // ✅ Allow backend requests
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // ✅ Allow all methods
      headers: ["Content-Type", "Authorization", "Origin", "Accept"], // ✅ Explicitly allow headers
      credentials: true, // ✅ Allow authentication & cookies
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
