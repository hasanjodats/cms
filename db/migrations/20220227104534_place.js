/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("countries", function (t) {
      t.increments("id").primary();
      t.string("name")
        .notNullable()
        .unique()
        .comment("This is the country name");
    })
    .createTable("provinces", function (t) {
      t.increments("id").primary();
      t.string("name")
        .notNullable()
        .unique()
        .comment("This is the province name");
      t.integer("countryId")
        .notNullable()
        .references("id")
        .inTable("countries")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("cities", function (t) {
      t.increments("id").primary();
      t.string("name")
        .notNullable()
        .unique()
        .comment("This is the city name");
      t.integer("provinceId")
        .notNullable()
        .references("id")
        .inTable("provinces")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("cities")
    .dropTableIfExists("provinces")
    .dropTableIfExists("countries");
};
