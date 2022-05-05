module.exports = {
  development: {
    client: "cockroachdb",
    debug: false,
    pool: { min: 0, max: 100 },
    migrations: { disableTransactions: true, tableName: "migrations" },
    connection: {
      host: "localhost",
      port: "26257",
      user: "root",
      password: "",
      database: "sajcms",
      ssl: false,
    },
  },
};
