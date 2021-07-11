/* eslint-disable no-unused-vars */
require('dotenv').config();

class GeneticService {
  constructor(knex, logger, error) {
    this.knex = knex;
    this.logger = logger;
    this.error = error;
  }

  async getResult(req) {
    try {
      const { userId } = req;
      const { type } = req.query;
      let dbFilter = {
        user_id: userId,
      };

      if (type !== undefined && type !== null) {
        dbFilter = { ...dbFilter, type_id: type };
      }

      const result = await this.knex('genetic_results')
        .select(
          'genetic_results.id as id',
          'genetic_result_types.name as type',
          'genetic_results.data as data',
          'genetic_results.created_at as createdAt',
          'genetic_results.updated_at as updatedAt',
        )
        .innerJoin('genetic_result_types', 'genetic_result_types.id', 'genetic_results.type_id')
        .where({ ...dbFilter })
        .first();

      return result;
    } catch (e) {
      this.logger.error('geneticService getResult - ', e);
      throw this.error('Request Error', 'Failed to fulfill the request', 400);
    }
  }
}

module.exports = GeneticService;
