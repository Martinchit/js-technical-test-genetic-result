
exports.up = (knex) => {
  return knex.schema.createTable('users', (users) => {
    users.increments('id').unsigned().primary();
    users.string('first_name', 50).notNull();
    users.string('last_name', 50).notNull();
    users.string('email', 50).unique().notNull();
    users.string('password', 256).notNull();
    users.datetime('date_of_birth', { precision: 6 }).defaultTo(knex.fn.now(6)).notNull();
    users.string('policy_code', 8).unique().notNull();
    users.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
    users.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
