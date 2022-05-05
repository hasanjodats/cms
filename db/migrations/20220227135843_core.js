/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("storages", function (t) {
      t.increments("id").primary();
      t.string("name")
        .notNullable()
        .unique()
        .comment("This is the storage name");
      t.enu("type", ["oracel", "mssql", "mysql", "postgresql", "cockroach"], {
        useNative: true,
        // existingType: true,
        enumName: "storagetype",
      })
        .notNullable()
        .defaultTo("cockroach")
        .comment("This is the storage database type");
      t.text("url").comment("This is the storage connection string");
      t.string("client").comment("This is the storage driver");
      t.string("host").comment("This is the storage host");
      t.string("port").comment("This is the storage port");
      t.string("username").comment("This is the storage username");
      t.string("password").comment("This is the storage password");
      t.string("db").comment("This is the storage database name");
      t.boolean("ssl")
        .defaultTo(false)
        .comment("This is the storage support ssl");
    })
    .createTable("layouts", function (t) {
      t.increments("id").primary();
      t.string("label").notNullable().comment("This is the layout label");
      t.string("fileName")
        .notNullable()
        .unique()
        .comment("This is the layout file name");
    })
    .createTable("sites", function (t) {
      t.increments("id").primary();
      t.string("label").notNullable().comment("This is the site label");
      t.string("title").notNullable().comment("This is the site title");
      t.string("culture")
        .notNullable()
        .defaultTo("en-us")
        .comment("This is the site culture");
      t.string("timeZone")
        .defaultTo("UTC")
        .notNullable()
        .comment("This is the site time zone");
      t.string("path")
        .notNullable()
        .defaultTo("*")
        .comment(
          "This is the site path for access in browser(http://example.com/[restaurant]|http://example.com/[fastfood])"
        );
      t.boolean("online")
        .notNullable()
        .defaultTo(true)
        .comment("This is the option for making site available or not");
      t.boolean("ssl")
        .notNullable()
        .defaultTo(false)
        .comment("This is the site https");
      t.string("emailHost").comment("This is the site email host");
      t.string("emailPort").comment("This is the site email host port");
      t.string("emailUsername").comment("This is the site email host username");
      t.string("emailPassword").comment("This is the site email host password");
      t.string("emailFrom").comment("This is the site email sender");
      t.string("emailSSL").comment(
        "This is the option for specify site email host ssl is active or not"
      );
      t.json("domains")
        .notNullable()
        .comment("This is the site domains(['example.com', 'test.com'])");
      t.json("agents").comment(
        "This is the site agents(['chrome', 'firefox'])"
      );
    })
    .createTable("htmlmetablocks", function (t) {
      t.increments("id").primary();
      t.string("name").notNullable().comment("This is the htmlmetablock name");
      t.string("content").comment("This is the htmlmetablock content");
      t.string("httpequiv")
        .notNullable()
        .comment("This is the htmlmetablock httpequiv");
      t.string("charset").comment("This is the htmlmetablock charset");
      t.integer("siteId")
        .notNullable()
        .references("id")
        .inTable("sites")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("customfields", function (t) {
      t.increments("id").primary();
      t.string("name").notNullable().comment("This is the customfield name");
      t.string("value").comment("This is the customfield value");
      t.integer("siteId")
        .notNullable()
        .references("id")
        .inTable("sites")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("pages", function (t) {
      t.increments("id").primary();
      t.string("label").notNullable().comment("This is the page label");
      t.string("title").comment("This is the page title");
      t.string("shorthandTitle").comment("This is the page shorthand title");
      t.string("path")
        .notNullable()
        .defaultTo("*")
        .comment(
          "This is the page path for access in browser(http://example.com/restaurant/[foodlist]|http://example.com/restaurant/[basket])"
        );
      t.integer("viewOrder")
        .unsigned()
        .notNullable()
        .defaultTo(0)
        .comment("This is the page order for menu");
      t.string("role").comment("This is the role for accessing page");
      t.boolean("online")
        .notNullable()
        .defaultTo(true)
        .comment("This is the option for making page available or not");
      t.boolean("showInMenu")
        .notNullable()
        .defaultTo(true)
        .comment(
          "This is the option for making page link available or not in menu"
        );
      t.boolean("showInBreadcrumb")
        .notNullable()
        .defaultTo(true)
        .comment(
          "This is the option for making page link available or not in breadcrumb"
        );
      t.boolean("defaultPage")
        .notNullable()
        .defaultTo(true)
        .comment("This is the option for making page if first page for site");
      t.enu("type", ["static", "dynamic"], {
        useNative: true,
        // existingType: true,
        enumName: "pagetype",
      })
        .notNullable()
        .defaultTo("static")
        .comment("This is the page type");
      t.boolean("edited")
        .notNullable()
        .defaultTo(false)
        .comment("This is the option for specify page is edited or not");
      t.boolean("published")
        .notNullable()
        .defaultTo(false)
        .comment(
          "This is the option for specify page is published or not after edit page"
        );
      t.dateTime("lastPublishedDate").comment(
        "This is the page last published date"
      );
      t.integer("layoutId")
        .notNullable()
        .references("id")
        .inTable("layouts")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("siteId")
        .notNullable()
        .references("id")
        .inTable("sites")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("parentId")
        .notNullable()
        .references("id")
        .inTable("pages")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("pageparameters", function (t) {
      t.increments("id").primary();
      t.string("name").notNullable().comment("This is the pageparameter name");
      t.string("value").comment("This is the pageparameter value");
      t.integer("pageId")
        .notNullable()
        .references("id")
        .inTable("pages")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("zonecontents", function (t) {
      t.increments("id").primary();
      t.string("name").notNullable().comment("This is the zone name");
      t.json("content")
        .notNullable()
        .comment("This is the zone content value in json format");
      t.integer("pageId")
        .notNullable()
        .references("id")
        .inTable("pages")
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
    .dropTableIfExists("zonecontents")
    .dropTableIfExists("pageparameters")
    .dropTableIfExists("pages")
    .dropTableIfExists("customfields")
    .dropTableIfExists("htmlmetablocks")
    .dropTableIfExists("sites")
    .dropTableIfExists("layouts")
    .dropTableIfExists("storages");
};
