/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('roles', table => {
            table.uuid('role_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('name', 50).unique().notNullable();
            table.jsonb('permissions').notNullable().defaultTo('{}');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('user_roles', table => {
            table.uuid('user_id').references('user_id').inTable('users').onDelete('CASCADE');
            table.uuid('role_id').references('role_id').inTable('roles').onDelete('CASCADE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.primary(['user_id', 'role_id']);
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
