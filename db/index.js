const fastifyPlugin = require("fastify-plugin");
const knex = require("knex");

function dbPlugin(fastify, options, done) {
  try {
    const db = knex(options);

    fastify.decorate("knex", db).addHook("onClose", (instance, done) => {
      if (instance.knex === db) {
        instance.knex.destroy();
        delete instance.knex;
      }

      done();
    });

    done();
  } catch (err) {
    done(err);
  }
}

module.exports = fastifyPlugin(dbPlugin);
