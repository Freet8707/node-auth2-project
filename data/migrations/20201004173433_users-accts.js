
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments()
        table.string("username", 128).notNull().unique()
        table.string("password").notNull()
        table.string("department", 128).notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
