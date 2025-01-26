/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('reaction_types').del();

  // Insert seed data
  const reactionTypes = await knex('reaction_types').insert([
    {
      name: 'like',
      emoji: '👍'
    },
    {
      name: 'love',
      emoji: '❤️'
    },
    {
      name: 'laugh',
      emoji: '😄'
    },
    {
      name: 'celebrate',
      emoji: '🎉'
    },
    {
      name: 'support',
      emoji: '🤝'
    },
    {
      name: 'insightful',
      emoji: '💡'
    }
  ]).returning('*');

  return reactionTypes;
};
