/**
 * @param { import("knex").Knex } knex
 */
module.exports = (knex) => ({
  protect: (options) => async (request, reply, done) => {
    done();
  },
  restrictTo: (options) => async (request, reply, done) => {
    done();
  },
});
