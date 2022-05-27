class AuthenticationController {
  /**
  * @param { import("knex").Knex } knex
  */
  constructor(knex) {
    this.knex = knex;
  }

  protect = async (request, reply) => {
  }

  restrictTo = async (request, reply) => {
  }
}

module.exports = AuthenticationController;
