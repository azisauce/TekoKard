/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('teams').del();

  // Insert seed data
  const teams = await knex('teams').insert([
    {
      name: 'Development Team',
    },
    {
      name: 'Design Team',
    },
    {
      name: 'Marketing Team',
    },
    {
      name: 'Product Team',
    }
  ]).returning('*');

  return teams;
};