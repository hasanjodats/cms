module.exports = {
  development: {
    client: "cockroachdb",
    debug: false,
    pool: {
      min: 0,
      max: 100,
    },
    connection: {
      user: "root",
      password: "",
      database: "sajcms",
      host: "localhost",
      port: "26257",
      ssl: false,
    },
    migrations: {
      disableTransactions: true,
      tableName: "migrations",
    },
    // log: {
    //   warn(message) {
    //     console.log(message);
    //   },
    //   error(message) {
    //     console.log(message);
    //   },
    //   deprecate(message) {
    //     console.log(message);
    //   },
    //   debug(message) {
    //     console.log(message);
    //   },
    // },
  },

  staging: {},

  production: {},
};
// cockroach sql --url "postgresql://root@DESKTOP-8LDVJJ7:26257/sajcms?sslmode=disable"
