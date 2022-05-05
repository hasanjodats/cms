module.exports = async (fastify, options) => {
  const AuthenticationController =
    require("./../controller/AuthenticationController")(fastify.knex);

  // COMMENT: Handle notfound route
  await require("./notfound")(fastify, function (request, reply) {
    reply.status(404).send({ message: "not found api" });
  });

  // COMMENT: Handle error route
  require("./error")(fastify, function (error, request, reply) {
    // COMMENT: Log error
    var statusCode = error.statusCode;
    if (statusCode >= 500) {
      console.error(error);
    } else if (statusCode >= 400) {
      console.info(error);
    } else {
      console.error(error);
    }
    // COMMENT: Send error to client
    reply.status(500).send({ message: "occure error in api" });
  });

  // COMMENT: Register permission routes
  await fastify.register(async (instance, options, done) => {
    instance.use(AuthenticationController.protect());
    instance.use(AuthenticationController.restrictTo("READ_PRIVILEGE"));

    await instance.register(
      await require("./PrivilegeRoute"),
      {
        prefix: "/privileges",
      }
    );

    done();
  });
};
