exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
}; 