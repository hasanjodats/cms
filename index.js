// COMMENT: Configure to handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION?? Shutting down...");
  console.log(err.name, err.message);
  console.log(err);

  process.exit(1);
});

// COMMENT: Load modules
const dotenv = require("dotenv");
const Server = require("./server");
const engineConfig = require("./config/engine");

// COMMENT: Load environment configuration
dotenv.config({
  path: "./configuration.env",
});

(async () => {
  // COMMENT: Load server configuration
  const server = new Server({
    engineConfig,
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || "3000",
  });

  // COMMENT: Start server
  await server.start();

  // COMMENT: Configure to handle unhandled rejection exception
  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION?? Shutting down...");
    console.log(err);
    server.close();
  });
})();
