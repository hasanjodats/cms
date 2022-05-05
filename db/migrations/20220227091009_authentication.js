/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("privileges", function (t) {
      t.increments("id").primary();
      t.string("name")
        .notNullable()
        .unique()
        .comment("This is the privilege name");
    })
    .createTable("roles", function (t) {
      t.increments("id").primary();
      t.string("name").notNullable().unique().comment("This is the role name");
    })
    .createTable("roleprivileges", function (t) {
      t.increments("id").primary();
      t.integer("roleId")
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("privilegeId")
        .notNullable()
        .references("id")
        .inTable("privileges")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("customers", function (t) {
      t.increments("id").primary();
      t.string("username")
        .notNullable()
        .unique()
        .comment("This is the customer's username");
      t.string("email")
        .notNullable()
        .unique()
        .comment("This is the customer's email");
      t.string("password")
        .notNullable()
        .comment("This is the customer's password");
      t.string("firstName").comment("This is the customer's first name");
      t.string("lastName").comment("This is the customer's last name");
      t.string("avatar").comment("This is the customer's avatar");
      t.string("cellphone")
        .notNullable()
        .comment("This is the customer's cellphone");
      t.enu("type", ["admin", "user", "customer"], {
        useNative: true,
        // existingType: true,
        enumName: "admintype",
      })
        .defaultTo("customer")
        .notNullable()
        .comment("This is the customer's type");
    })
    .createTable("customerroles", function (t) {
      t.increments("id").primary();
      t.integer("customerId")
        .notNullable()
        .references("id")
        .inTable("customers")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("roleId")
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("customerprivileges", function (t) {
      t.increments("id").primary();
      t.boolean("status")
        .notNullable()
        .defaultTo(true)
        .comment("Specify customer must have privilege or not");
      t.integer("customerId")
        .notNullable()
        .references("id")
        .inTable("customers")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("privilegeId")
        .notNullable()
        .references("id")
        .inTable("privileges")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("profiles", function (t) {
      t.increments("id").primary();
      t.string("theme")
        .defaultTo("default")
        .comment("This is the customer's default dashboard theme");
      t.integer("customerId")
        .notNullable()
        .references("id")
        .inTable("customers")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("logs", function (t) {
      t.increments("id").primary();
      t.text("level").notNullable().comment("This is the log's level");
      t.text("category").notNullable().comment("This is the log's category");
      t.text("language").comment("This is the log's language");
      t.text("label").notNullable().comment("This is the log's label");
      t.text("message").notNullable().comment("This is the log's message");
      t.text("meta").comment("This is the log's meta");
      t.dateTime("occurDate", { precision: 6 })
        .notNullable()
        .defaultTo(knex.fn.now(6))
        .comment("This is the log's occurrence date");
      t.integer("customerId")
        .notNullable()
        .references("id")
        .inTable("customers")
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
    .dropTableIfExists("customerprivileges")
    .dropTableIfExists("customerroles")
    .dropTableIfExists("roleprivileges")
    .dropTableIfExists("profiles")
    .dropTableIfExists("logs")
    .dropTableIfExists("customers")
    .dropTableIfExists("roles")
    .dropTableIfExists("privileges");
};
