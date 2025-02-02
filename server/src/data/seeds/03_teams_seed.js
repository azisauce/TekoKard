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
      tag: 'dev1JuniorGoolg',
    },
    {
      name: 'Design Team',
      tag: 'UI4Life',
    },
    {
      name: 'Marketing Team',
      tag: 'ToSkyTeam2',
    },
    {
      name: 'Product Team',
      tag: 'ProductTeam3',
    }
  ]).returning('*');

  return teams;
};