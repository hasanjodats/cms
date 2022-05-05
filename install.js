const { spawn } = require("child_process");
const inquirer = require("inquirer");
const CFonts = require("cfonts");
const fs = require("fs");

const banner = () => CFonts.say("SAJCMS", require("./config/install/banner"));

const client = {
  name: "client",
  message: "Select your database:",
  type: "rawlist",
  choices: [
    "cockroachdb",
    "postgres",
    "mysql",
    "oracledb",
    "mssql",
    "mariadb",
    "sqlite3",
  ],
};

const url = {
  name: "url",
  message: "Enter your database connection string:",
  type: "input",
};

const host = {
  name: "host",
  message: "Enter your database host IP:",
  type: "input",
};

const port = {
  name: "port",
  message: "Enter your database host port:",
  type: "number",
};

const username = {
  name: "username",
  message: "Enter your database username:",
  type: "input",
};

const password = {
  name: "password",
  message: "Enter your database password:",
  type: "password",
};

const database = {
  name: "database",
  message: "Enter your database name:",
  type: "input",
};

const ssl = {
  name: "ssl",
  message: "Do you wana use ssl?",
  type: "confirm",
};

const connection = (client, conn) =>
  `module.exports = { development: { client: "${client}", debug: false, pool: { min: 0, max: 100, }, migrations: { disableTransactions: true, tableName: "migrations", }, ${conn} }, };`;

const knexConfig = (
  client,
  url,
  host,
  port,
  username,
  password,
  database,
  ssl
) => {
  if (url !== undefined && url !== null && url !== "") {
    if (client === "sqlite3") {
      return connection(client, `connection: { filename: "${url}", },`);
    } else {
      return connection(client, `connection: "${url}",`);
    }
  } else {
    return connection(
      client,
      `connection: { host: "${host}", port: "${port}", user: "${username}", password: "${password}", database: "${database}", ssl: ${ssl}, },`
    );
  }
};

(() => {
  banner();

  inquirer
    .prompt([client, url, host, port, username, password, database, ssl])
    .then(async (answers) => {
      const dbConfig = knexConfig(
        answers.client,
        answers.url,
        answers.host,
        answers.port,
        answers.username,
        answers.password,
        answers.database,
        answers.ssl
      );

      const data = new Uint8Array(Buffer.from(dbConfig));
      await fs.writeFileSync("./db/knexfile.js", data);

      const migration = spawn("cmd", ["/c", "npm run migrateUp"]);
      migration.stdout.on("data", (data) => console.log(data));
      migration.stderr.on("data", (data) => console.log(data));
      migration.on("close", (code) => {
        // console.log(`Exit code: ${code}`);
        const seed = spawn("cmd", ["/c", "npm run seed"]);
        seed.stdout.on("data", (data) => console.log(data));
        seed.stderr.on("data", (data) => console.log(data));
        // seed.on("close", (code) => console.log(`Exit code: ${code}`));
      });
    })
    .catch((error) => console.log(error));
})();
