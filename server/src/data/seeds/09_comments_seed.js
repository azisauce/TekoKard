/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('comments').del();

  // Get users and posts
  const users = await knex('users').select('user_id');
  const posts = await knex('posts').select('post_id');

  // Insert seed data
  await knex('comments').insert([
    {
      user_id: users[0].user_id,  // john_doe
      post_id: posts[0].post_id,  // New Development Framework Proposal
      content: 'Great progress on the new feature!',
      is_anonymous: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      user_id: users[1].user_id,  // jane_smith
      post_id: posts[0].post_id,  // New Development Framework Proposal
      content: 'The design looks fantastic, just needs minor tweaks.',
      is_anonymous: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      user_id: users[2].user_id,  // bob_wilson
      post_id: posts[1].post_id,  // Updated Design System Guidelines
      content: 'When is the next team meeting scheduled?',
      is_anonymous: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      user_id: users[0].user_id,  // john_doe
      post_id: posts[1].post_id,  // Updated Design System Guidelines
      content: 'Thanks for the feedback!',
      is_anonymous: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
