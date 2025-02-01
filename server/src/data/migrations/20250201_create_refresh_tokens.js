exports.up = function(knex) {
    return knex.schema.createTable('refresh_tokens', table => {
        table.increments('id').primary();
        table.uuid('user_id').notNullable();
        table.string('token').notNullable().unique();
        table.timestamp('expires_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('refresh_tokens');
};
