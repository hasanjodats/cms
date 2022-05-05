async function routes(fastify, options) {
  const defaultRoute = function (req, res) {
    res.end("hello world");
  };

  fastify.setDefaultRoute(defaultRoute);

  fastify.register(
    function (instance, options, done) {
      instance.setNotFoundHandler(function (request, reply) {
        // Handle not found request without preValidation and preHandler hooks
        // to URLs that begin with '/v1'
      });
      done();
    },
    { prefix: "/v1" }
  );

  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(409).send({ ok: false });
  });

  fastify.get("/", async (request, reply) => {
    const { knex } = fastify;

    const r = await knex("permissions").select({
      id: "id",
      name: "name",
    });

    return { r };
  });

  const opts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
  };

  fastify.get("/hi", opts, async (request, reply) => {
    return { hello: "world" };
  });

  fastify.route({
    method: "GET",
    url: "/bye",
    schema: {
      querystring: {
        name: { type: "string" },
        excitement: { type: "integer" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
    handler: function (request, reply) {
      reply.send({ hello: "world" });
    },
  });
}

module.exports = routes;
