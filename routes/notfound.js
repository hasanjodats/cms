module.exports = async (fastify, handler) => {
  await fastify.register(function (instance, opts, done) {
    instance.setNotFoundHandler(handler);
    done();
  });
};
