
exports.up = (knex) => {
  return knex.schema.createTable('genetic_results', (geneticResults) => {
    geneticResults.increments('id').unsigned().primary();
    geneticResults.jsonb('data').notNull();
    geneticResults.integer('type_id').unsigned();
    geneticResults.foreign('type_id').references('genetic_result_types.id');
    geneticResults.integer('user_id').unsigned();
    geneticResults.foreign('user_id').references('users.id');
    geneticResults.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
    geneticResults.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('genetic_results');
};
