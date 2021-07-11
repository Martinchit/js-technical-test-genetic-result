/* eslint-disable no-unused-vars */
require('dotenv').config();

class GeneticService {
  constructor(knex, logger, error) {
    this.knex = knex;
    this.logger = logger;
    this.error = error;
  }

  async getPersonalInfo(req) {
    try {
      const { userId } = req;

      const dbFilter = {
        id: userId,
      };

      const data = await this.knex('users')
        .select(
          'id',
          'first_name as firstName',
          'last_name as lastName',
          'email',
          'date_of_birth as dateOfBirth',
          'created_at as createdAt',
        )
        .where({ ...dbFilter })
        .first();

      return data;
    } catch (e) {
      this.logger.error('geneticService getResult - ', e);
      throw this.error('Request Error', 'Failed to fulfill the request', 400);
    }
  }
}

module.exports = GeneticService;
