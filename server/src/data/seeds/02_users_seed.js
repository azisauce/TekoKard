// seeds/01_users.js
const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete existing entries
  await knex('users').del();

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const password1 = await bcrypt.hash('password123', salt);
  const password2 = await bcrypt.hash('password456', salt);
  const password3 = await bcrypt.hash('password789', salt);

  // Insert seed data
  await knex('users').insert([
    {
      username: 'john_doe',
      email: 'john@example.com',
      password_hash: password1,
      full_name: 'John Doe',
      bio: 'Software developer passionate about coding',
      avatar_url: 'https://example.com/avatars/john.jpg',
      is_active: true
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password_hash: password2,
      full_name: 'Jane Smith',
      bio: 'Digital artist and web designer',
      avatar_url: 'https://example.com/avatars/jane.jpg',
      is_active: true
    },
    {
      username: 'bob_wilson',
      email: 'bob@example.com',
      password_hash: password3,
      full_name: 'Bob Wilson',
      bio: 'Tech enthusiast and blogger',
      avatar_url: 'https://example.com/avatars/bob.jpg',
      is_active: false
    }
  ]);
};