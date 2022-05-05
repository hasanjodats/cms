module.exports = async (fastify, handler) => {
  // fastify.setNotFoundHandler(
  //   {
  //     preValidation: (req, reply, done) => {
  //       done();
  //     },
  //     preHandler: (req, reply, done) => {
  //       done();
  //     },
  //   },
  //   function (request, reply) {
  //     reply.status(404).send({ message: "not found" });
  //   }
  // );

  await fastify.register(function (instance, opts, done) {
    instance.setNotFoundHandler(handler);
    done();
  });
};
