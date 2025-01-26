/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('reaction_types', table => {
        table.uuid('reaction_type_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name', 50).unique().notNullable();
        table.string('emoji', 10).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('reactions', table => {
        table.uuid('reaction_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('post_id').references('post_id').inTable('posts').onDelete('CASCADE');
        table.uuid('user_id').references('user_id').inTable('users').onDelete('CASCADE');
        table.uuid('reaction_type_id').references('reaction_type_id').inTable('reaction_types').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.unique(['post_id', 'user_id', 'reaction_type_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('reactions')
    .dropTable('reaction_types');
};
