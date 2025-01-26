/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('teams', table => {
            table.uuid('team_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('name', 50).unique().notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('user_teams', table => {
            table.uuid('user_id').references('user_id').inTable('users').onDelete('CASCADE');
            table.uuid('team_id').references('team_id').inTable('teams').onDelete('CASCADE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.primary(['user_id', 'team_id']);
          })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTable('user_roles')
      .dropTable('roles');
};
