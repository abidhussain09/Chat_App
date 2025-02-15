module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_FILENAME", ".tmp/data.db"), // SQLite stores data in this file
    },
    useNullAsDefault: true,
  },
});
