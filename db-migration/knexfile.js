require('dotenv').config();

module.exports = {

  development: {
    debug: true,
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query('SET timezone = \'UTC\'', err => {
          cb(err, conn);
        });
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  testing: {
    debug: true,
    client: 'postgresql',
    connection: {
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query('SET timezone = \'UTC\'', err => {
          cb(err, conn);
        });
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.STAGE_DATABASE_HOST,
      database: process.env.STAGE_DB_NAME,
      user: process.env.STAGE_DB_USERNAME,
      password: process.env.STAGE_DB_PASSWORD,
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query('SET timezone = \'UTC\'', err => {
          cb(err, conn);
        });
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.PRODUCTION_DATABASE_HOST,
      database: process.env.PRODUCTION_DB_NAME,
      user: process.env.PRODUCTION_DB_USERNAME,
      password: process.env.PRODUCTION_DB_PASSWORD,
      timezone: 'UTC'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query('SET timezone = \'UTC\'', err => {
          cb(err, conn);
        });
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
