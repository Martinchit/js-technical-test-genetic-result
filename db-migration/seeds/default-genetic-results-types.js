exports.seed = (knex) => {
  return knex.raw('TRUNCATE TABLE genetic_result_types RESTART IDENTITY CASCADE')
    .then(() => {
      return knex('genetic_result_types').insert([
        {
          name: 'General'
        }
      ]);
    });
};
