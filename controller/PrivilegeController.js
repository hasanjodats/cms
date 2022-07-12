exports.all = async (request, reply) => {
  console.log(request);
  console.log(reply);
  const data = await this.knex.select().from("privileges");
  console.log(data);
  reply.status(200).send({ data, count: data.length });
}

exports.one = async (request, reply) => {
  const data = await this.knex
    .select()
    .from("privileges")
    .where({ id: request.params.id });
  console.log(data);
  return { data };
}

exports.create = async (request, reply) => {
  const { name } = request.body;
  const data = await this.knex("privileges").insert({ name });
  console.log(data);
  return { data };
}

exports.update = async (request, reply) => {
  const data = await this.knex("privileges")
    .where({ id: request.params.id })
    .update(request.body);
  console.log(data);
  return { data };
}

exports.edit = async (request, reply) => {
  const data = await this.knex("privileges")
    .where({ id: request.params.id })
    .update({ name: request.body.name });
  console.log(data);
  return { data };
}

exports.delete = async (request, reply) => {
  const data = await this.knex("privileges")
    .where({ id: request.params.id })
    .del();
  console.log(data);
  return { data };
}

exports.deleteAll = async (request, reply) => {
  const data = await this.knex("privileges").del();
  console.log(data);
  return { data };
}
