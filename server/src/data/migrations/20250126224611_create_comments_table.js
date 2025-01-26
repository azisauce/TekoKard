/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('comments', table => {
        table.uuid('comment_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('post_id').references('post_id').inTable('posts').onDelete('CASCADE');
        table.uuid('user_id').references('user_id').inTable('users').onDelete('SET NULL');
        table.text('content').notNullable();
        table.boolean('is_anonymous').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
