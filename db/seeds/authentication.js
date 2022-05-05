const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("customers").del();
  await knex("roles").del();
  await knex("privileges").del();

  const privileges = await knex("privileges").insert([
    { name: "Login" },
    { name: "Dashboard" },
    { name: "Privilege_Create" },
    { name: "Privilege_Read" },
    { name: "Privilege_Update" },
    { name: "Privilege_Delete" },
    { name: "Role_Create" },
    { name: "Role_Read" },
    { name: "Role_Update" },
    { name: "Role_Delete" },
    { name: "User_Create" },
    { name: "User_Read" },
    { name: "User_Update" },
    { name: "User_Delete" },
    { name: "Country_Create" },
    { name: "Country_Read" },
    { name: "Country_Update" },
    { name: "Country_Delete" },
    { name: "Province_Create" },
    { name: "Province_Read" },
    { name: "Province_Update" },
    { name: "Province_Delete" },
    { name: "City_Create" },
    { name: "City_Read" },
    { name: "City_Update" },
    { name: "City_Delete" },
    { name: "Storage_Create" },
    { name: "Storage_Read" },
    { name: "Storage_Update" },
    { name: "Storage_Delete" },
    { name: "Layout_Create" },
    { name: "Layout_Read" },
    { name: "Layout_Update" },
    { name: "Layout_Delete" },
    { name: "Site_Create" },
    { name: "Site_Read" },
    { name: "Site_Update" },
    { name: "Site_Delete" },
    { name: "Page_Create" },
    { name: "Page_Read" },
    { name: "Page_Update" },
    { name: "Page_Delete" },
    { name: "Page_Editor" },
  ]);
  const roles = await knex("roles").insert([{ name: "Administrator" }]);
  const customers = await knex("customers").insert([
    {
      username: "administrator",
      email: "admin@admin.com",
      password: await bcrypt.hash("123456", 12),
      cellphone: "00000000000",
      type: "admin",
    },
  ]);

  await knex("roleprivileges").insert([
    { roleId: roles[0], privilegeId: privileges[0] },
  ]);
};
