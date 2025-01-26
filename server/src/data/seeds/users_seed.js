exports.seed = function (knex) {
  return knex('users').del().then(() => {
    return knex('users').insert([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  });
};
