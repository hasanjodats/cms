// COMMENT: Load routes
const PrivilegeRoute = require("./PrivilegeRoute");

// COMMENT: Load controllers
const AuthenticationController =
  require("./../controller/AuthenticationController");


module.exports = async (fastify, opts) => {
  // COMMENT: Register permission routes
  await fastify.register(async (instance, opts, done) => {
    instance.use(AuthenticationController.protect);//fastify.knex
    instance.use(AuthenticationController.restrictTo("READ_PRIVILEGE"));

    await instance.register(
      await PrivilegeRoute,
      {
        prefix: "/privileges",
      }
    );

    done();
  });
};
