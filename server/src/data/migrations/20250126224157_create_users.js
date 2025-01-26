/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      // Enable UUID extension
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  
      // Users table
      .createTable('users', table => {
        table.uuid('user_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('username', 50).unique().notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password_hash', 255).notNullable();
        table.string('full_name', 100);
        table.text('bio');
        table.string('avatar_url', 255);
        table.boolean('is_active').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTable('users');
};
