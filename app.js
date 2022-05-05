// COMMENT: Load modules
const routes = require("./routes");

class App {
  constructor(opts) {
    this.opts = opts;
  }

  init = async () => {
    // COMMENT: Register server routes
    await this.opts.engine.register(routes);
  }
}

module.exports = App;