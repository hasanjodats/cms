// COMMENT: Load modules
const Routes = require("./routes");

class App {
  constructor(opts) {
    this.opts = opts;
  }

  init = async () => {
    const routes = new Routes();

    // COMMENT: Register server routes
    await this.opts.engine.register(routes.register);
  }
}

module.exports = App;