/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('reactions').del();

  // Get users, posts, and reaction types
  const users = await knex('users').select('user_id');
  const posts = await knex('posts').select('post_id');
  const reactionTypes = await knex('reaction_types').select('reaction_type_id', 'name');

  // Helper function to find reaction type id by name
  const getReactionTypeId = (name) => {
    const type = reactionTypes.find(rt => rt.name === name);
    return type ? type.reaction_type_id : null;
  };

  // Insert seed data
  await knex('reactions').insert([
    {
      post_id: posts[0].post_id,  // New Development Framework Proposal
      user_id: users[1].user_id,  // jane_smith
      reaction_type_id: getReactionTypeId('insightful')
    },
    {
      post_id: posts[0].post_id,  // New Development Framework Proposal
      user_id: users[2].user_id,  // bob_wilson
      reaction_type_id: getReactionTypeId('like')
    },
    {
      post_id: posts[1].post_id,  // Updated Design System Guidelines
      user_id: users[0].user_id,  // john_doe
      reaction_type_id: getReactionTypeId('celebrate')
    },
    {
      post_id: posts[1].post_id,  // Updated Design System Guidelines
      user_id: users[2].user_id,  // bob_wilson
      reaction_type_id: getReactionTypeId('love')
    },
    {
      post_id: posts[2].post_id,  // Team Building Event Ideas
      user_id: users[0].user_id,  // john_doe
      reaction_type_id: getReactionTypeId('support')
    },
    {
      post_id: posts[2].post_id,  // Team Building Event Ideas
      user_id: users[1].user_id,  // jane_smith
      reaction_type_id: getReactionTypeId('laugh')
    }
  ]);
};
