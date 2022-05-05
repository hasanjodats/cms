// COMMENT: Create permission routes plugin
module.exports = async (fastify, options) => {
  const AuthenticationController =
    require("./../controller/AuthenticationController")(fastify.knex);
  const PrivilegeController = require("./../controller/PrivilegeController")(
    fastify.knex
  );
  const PrivilegeSchema = require("./../schema/PrivilegeSchema");

  // COMMENT: return all privileges
  fastify.route({
    method: "GET",
    url: "/",
    schema: PrivilegeSchema.all,
    handler: PrivilegeController.all,
  });

  // COMMENT: return one privilege
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: PrivilegeSchema.one,
    handler: PrivilegeController.one,
  });

  // COMMENT: create new privilege
  fastify.route({
    method: "POST",
    url: "/",
    schema: PrivilegeSchema.create,
    preHandler: [AuthenticationController.restrictTo("CREATE_PRIVILEGE")],
    handler: PrivilegeController.create,
  });

  // COMMENT: update entire privilege
  fastify.route({
    method: "PATCH",
    url: "/:id",
    schema: PrivilegeSchema.update,
    preHandler: [AuthenticationController.restrictTo("UPDATE_PRIVILEGE")],
    handler: PrivilegeController.update,
  });

  // COMMENT: edit specific property of privilege
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: PrivilegeSchema.edit,
    preHandler: [AuthenticationController.restrictTo("UPDATE_PRIVILEGE")],
    handler: PrivilegeController.edit,
  });

  // COMMENT: delete one privilege
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: PrivilegeSchema.del,
    preHandler: [AuthenticationController.restrictTo("DELETE_PRIVILEGE")],
    handler: PrivilegeController.delete,
  });

  // COMMENT: delete all privilege
  fastify.route({
    method: "DELETE",
    url: "/",
    schema: PrivilegeSchema.deleteAll,
    preHandler: [AuthenticationController.restrictTo("DELETE_PRIVILEGE")],
    handler: PrivilegeController.deleteAll,
  });
};
