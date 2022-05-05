// COMMENT: Load modules
const fastify = require("fastify");
const multipart = require("fastify-multipart");
const formbody = require('fastify-formbody')
const helmet = require("fastify-helmet");
const middie = require("middie");
const dns = require("dns-prefetch-control");
const frameguard = require("frameguard");
const ienoopen = require("ienoopen");
const xssProtection = require("x-xss-protection");
// const cors = require("fastify-cors");
// const static = require("fastify-static");
// const hsts = require("hsts");
const formbodyConfig = require("./config/formbody");
const multipartConfig = require("./config/multipart");
const helmetConfig = require("./config/helmet");
const dbConfig = require("./db");
const dbConnectionConfig = require("./db/knexfile");
const dnsConfig = require("./config/dnsPrefetchControl");
const frameguardConfig = require("./config/frameguard");
// const corsConfig = require("./config/cors");
// const staticConfig = require("./config/static");
// const hstsConfig = require("./config/hsts");

class Engine {
    constructor(opts) {
        this.opts = opts;
        this.core = fastify(opts);
        this.log = this.core.log;
        this.register = this.core.register;
        this.close = this.core.close;
    }

    start = async () => {
        // COMMENT: Register application/x-www-form-urlencoded parser plugin for posted data
        await this.core.register(formbody, formbodyConfig);

        // COMMENT: Register multipart parser plugin for posted data
        await this.core.register(multipart, multipartConfig);

        // COMMENT: Register helmet plugin
        await this.core.register(helmet, helmetConfig);

        // COMMENT: Register cors plugin
        // await this.core.register(cors, corsConfig);

        // COMMENT: Register static plugin
        // await this.core.register(static, staticConfig);

        // COMMENT: Register middleware support
        await this.core.register(middie, {
            hook: "onRequest", // default
        });

        // COMMENT: Register database plugin
        await this.core.register(
            dbConfig,
            dbConnectionConfig["development"]
        );

        this.core.use(dns(dnsConfig));
        this.core.use(frameguard(frameguardConfig));
        // this.core.use(hsts(hstsConfig));
        this.core.use(ienoopen());
        this.core.use(xssProtection());

    }

    listen = async (host, port) => {
        await this.core.listen(port, host);
    }
}

module.exports = Engine;