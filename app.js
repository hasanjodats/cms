// COMMENT: Load modules
const Routes = require("./routes");

class App {
  constructor(opts) {
    this.opts = opts;
  }

  init = async () => {
    // COMMENT: Register server routes
    await this.opts.engine.register(Routes);
  }
}

module.exports = App;