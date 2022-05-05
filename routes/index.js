// COMMENT: Load modules
const notFound = require("./notfound");
const error = require("./error");
const api = require("./api");

class Routes {
  register = async (fastify, opts) => {
    // COMMENT: Handle public notfound route
    await notFound(fastify, function (request, reply) {
      reply.status(404).send({ message: "not found" });
    });

    // COMMENT: Handle public error route
    error(fastify, function (error, request, reply) {
      // COMMENT: Log error
      let statusCode = error.statusCode;
      if (statusCode >= 500) {
        console.error(error);
      } else if (statusCode >= 400) {
        console.info(error);
      } else {
        console.error(error);
      }
      // COMMENT: Send error to client
      reply.status(500).send({ message: "occure error" });
    });

    // COMMENT: Register server routes
    await fastify.register(api, { prefix: "/api/v1" });

    /*fastify.ready(() => {
      // COMMENT: Print all routes
      console.log(
        fastify.printRoutes({
          commonPrefix: false,
          includeHooks: true,
          includeMeta: ["metaProperty"],
        })
      );
  
      // COMMENT: Print all plugins
      console.log(fastify.printPlugins());
    });*/
  };
}

module.exports = Routes;