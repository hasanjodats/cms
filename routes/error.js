module.exports = (fastify, handler) => {
  fastify.setErrorHandler(handler);
};
