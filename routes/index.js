module.exports = async (fastify, opts) => {
  // COMMENT: Handle public notfound route
  await require("./notfound")(fastify, function (request, reply) {
    reply.status(404).send({ message: "not found" });
  });

  // COMMENT: Handle public error route
  require("./error")(fastify, function (error, request, reply) {
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
  await fastify.register(await require("./api"), { prefix: "/api/v1" });

  // fastify.ready(() => {
  // // COMMENT: Print all routes
  // console.log(
  // fastify.printRoutes({
  // commonPrefix: false,
  // includeHooks: true,
  // includeMeta: ["metaProperty"],
  // })
  // );

  // // COMMENT: Print all plugins
  // // console.log(fastify.printPlugins());
  // });
};
