const AuthenticationController =
  require("./../controller/AuthenticationController");
const PrivilegeController = require("./../controller/PrivilegeController");
const PrivilegeSchema = require("./../schema/PrivilegeSchema");

// COMMENT: Create permission routes plugin
module.exports = async (fastify, options) => {
  const authenticationController = new AuthenticationController(fastify.knex);
  const privilegeController = new PrivilegeController(fastify.knex);

  // COMMENT: return all privileges
  fastify.route({
    method: "GET",
    url: "/",
    schema: PrivilegeSchema.all,
    handler: privilegeController.all,
  });

  // COMMENT: return one privilege
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: PrivilegeSchema.one,
    handler: privilegeController.one,
  });

  // COMMENT: create new privilege
  fastify.route({
    method: "POST",
    url: "/",
    schema: PrivilegeSchema.create,
    preHandler: [authenticationController.restrictTo("CREATE_PRIVILEGE")],
    handler: privilegeController.create,
  });

  // COMMENT: update entire privilege
  fastify.route({
    method: "PATCH",
    url: "/:id",
    schema: PrivilegeSchema.update,
    preHandler: [authenticationController.restrictTo("UPDATE_PRIVILEGE")],
    handler: privilegeController.update,
  });

  // COMMENT: edit specific property of privilege
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: PrivilegeSchema.edit,
    preHandler: [authenticationController.restrictTo("UPDATE_PRIVILEGE")],
    handler: privilegeController.edit,
  });

  // COMMENT: delete one privilege
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: PrivilegeSchema.del,
    preHandler: [authenticationController.restrictTo("DELETE_PRIVILEGE")],
    handler: privilegeController.delete,
  });

  // COMMENT: delete all privilege
  fastify.route({
    method: "DELETE",
    url: "/",
    schema: PrivilegeSchema.deleteAll,
    preHandler: [authenticationController.restrictTo("DELETE_PRIVILEGE")],
    handler: privilegeController.deleteAll,
  });
};
