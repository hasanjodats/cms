// COMMENT: Load modules
const Engine = require("./engine");
const App = require("./app");

class Server {
  constructor(opts) {
    this.opts = opts;

    // COMMENT: Create server
    this.engine = new Engine(opts.engineConfig);

    // COMMENT: Create application
    this.app = new App({ engine: this.engine });
  }

  // COMMENT: Start server
  start = async () => {
    try {
      await this.engine.start();
      await this.app.init();

      await this.engine.listen(this.opts.host, this.opts.port);
      console.log("Server successfully started");
    } catch (err) {
      this.engine.log.error(err);
      process.exit(1);
    }
  };

  // COMMENT: Close server
  close = () => {
    this.engine.close().then(
      () => {
        console.log("Server successfully closed");
        process.exit(1);
      },
      (err) => {
        console.log("An error happened on server close", err);
      }
    );
  };
}

module.exports = Server;