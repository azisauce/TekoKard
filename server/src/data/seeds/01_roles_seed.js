/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('roles').del();

  // Insert seed data
  const roles = await knex('roles').insert([
    {
      name: 'admin',
      permissions: JSON.stringify({
        users: ['create', 'read', 'update', 'delete'],
        posts: ['create', 'read', 'update', 'delete'],
        roles: ['create', 'read', 'update', 'delete']
      })
    },
    {
      name: 'moderator',
      permissions: JSON.stringify({
        users: ['read'],
        posts: ['read', 'update', 'delete'],
        comments: ['read', 'update', 'delete']
      })
    },
    {
      name: 'user',
      permissions: JSON.stringify({
        posts: ['create', 'read'],
        comments: ['create', 'read']
      })
    }
  ]).returning('*');

  return roles;
};