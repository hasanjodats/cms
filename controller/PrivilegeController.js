/**
 * @param { import("knex").Knex } knex
 */
module.exports = (knex) => ({
  all: async (request, reply) => {
    const data = await knex.select().from("privileges");
    console.log(data);
    reply.status(200).send({ data, count: data.length });
  },
  one: async (request, reply) => {
    const data = await knex
      .select()
      .from("privileges")
      .where({ id: request.params.id });
    console.log(data);
    return { data };
  },
  create: async (request, reply) => {
    const { name } = request.body;
    const data = await knex("privileges").insert({ name });
    console.log(data);
    return { data };
  },
  update: async (request, reply) => {
    const data = await knex("privileges")
      .where({ id: request.params.id })
      .update(request.body);
    console.log(data);
    return { data };
  },
  edit: async (request, reply) => {
    const data = await knex("privileges")
      .where({ id: request.params.id })
      .update({ name: request.body.name });
    console.log(data);
    return { data };
  },
  delete: async (request, reply) => {
    const data = await knex("privileges")
      .where({ id: request.params.id })
      .del();
    console.log(data);
    return { data };
  },
  deleteAll: async (request, reply) => {
    const data = await knex("privileges").del();
    console.log(data);
    return { data };
  },
});