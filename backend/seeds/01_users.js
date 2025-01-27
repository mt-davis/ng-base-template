exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          isActive: true
        },
        {
          email: 'user1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'user',
          isActive: true
        },
        {
          email: 'user2@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'user',
          isActive: true
        }
      ]);
    });
}; 