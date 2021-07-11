
exports.up = (knex) => {
  return knex.schema.createTable('genetic_result_types', (geneticResultTypes) => {
    geneticResultTypes.increments('id').unsigned().primary();
    geneticResultTypes.string('name', 20).unique().notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('genetic_result_types');
};
