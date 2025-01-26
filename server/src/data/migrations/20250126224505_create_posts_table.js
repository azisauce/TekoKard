/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('posts', table => {
        table.uuid('post_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('user_id').references('user_id').inTable('users').onDelete('SET NULL');
        table.string('title', 255).notNullable();
        table.text('content').notNullable();
        table.boolean('is_anonymous').defaultTo(false);
        table.string('status', 20).checkIn(['draft', 'published', 'archived']).defaultTo('draft');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
