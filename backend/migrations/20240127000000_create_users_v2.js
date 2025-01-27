exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('users');
    }
  }).then(() => {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('role').notNullable().defaultTo('user');
      table.boolean('isActive').notNullable().defaultTo(true);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
}; 