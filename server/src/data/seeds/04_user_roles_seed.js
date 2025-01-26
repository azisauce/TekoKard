/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Delete existing entries
  await knex('user_roles').del();

  // Get the first few users (assuming they exist from previous seeds)
  const users = await knex('users').select('user_id').limit(3);
  
  // Get role IDs
  const roles = await knex('roles').select('role_id').limit(3);

  // Insert user_roles
  await knex('user_roles').insert([
    {
      user_id: users[0].user_id,  // First user gets admin role
      role_id: roles[0].role_id
    },
    {
      user_id: users[1].user_id,  // Second user gets moderator role
      role_id: roles[1].role_id
    },
    {
      user_id: users[2].user_id,  // Third user gets user role
      role_id: roles[2].role_id
    }
  ]);

  // Clean up temporary table
  await knex.raw('DROP TABLE IF EXISTS temp_role_ids');
};