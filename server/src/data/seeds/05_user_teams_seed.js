/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('user_teams').del();

  // Get users and teams
  const users = await knex('users').select('user_id');
  const teams = await knex('teams').select('team_id');

  // Insert seed data
  await knex('user_teams').insert([
    {
      user_id: users[0].user_id,  // john_doe
      team_id: teams[0].team_id,  // Development Team
    },
    {
      user_id: users[0].user_id,  // john_doe
      team_id: teams[3].team_id,  // Product Team
    },
    {
      user_id: users[1].user_id,  // jane_smith
      team_id: teams[1].team_id,  // Design Team
    },
    {
      user_id: users[2].user_id,  // bob_wilson
      team_id: teams[2].team_id,  // Marketing Team
    }
  ]);
};
