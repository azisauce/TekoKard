/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('posts').del();

  // Get users
  const users = await knex('users').select('user_id');

  // Insert seed data
  await knex('posts').insert([
    {
      user_id: users[0].user_id,  // john_doe
      title: 'New Development Framework Proposal',
      content: 'I think we should consider adopting a new framework for our upcoming projects. Here are my thoughts...',
      is_anonymous: false,
      status: 'published'
    },
    {
      user_id: users[1].user_id,  // jane_smith
      title: 'Updated Design System Guidelines',
      content: 'I\'ve updated our design system with new components and guidelines. Please review and provide feedback.',
      is_anonymous: false,
      status: 'published'
    },
    {
      user_id: users[2].user_id,  // bob_wilson
      title: 'Team Building Event Ideas',
      content: 'Let\'s plan our next team building event. I have some exciting ideas to share...',
      is_anonymous: false,
      status: 'published'
    },
    {
      user_id: users[0].user_id,  // john_doe
      title: 'Anonymous Feedback',
      content: 'Here\'s some constructive feedback about our current processes...',
      is_anonymous: true,
      status: 'published'
    },
    {
      user_id: users[1].user_id,  // jane_smith
      title: 'Draft: Upcoming Features',
      content: 'Working on documenting our upcoming features. Will share more details soon.',
      is_anonymous: false,
      status: 'draft'
    }
  ]);
};
