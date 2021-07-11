require('dotenv').config();

module.exports = {
  development: {
    debug: true,
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC',
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query("SET timezone = 'UTC'", err => {
          cb(err, conn);
        });
      },
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC',
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query("SET timezone = 'UTC'", err => {
          cb(err, conn);
        });
      },
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      timezone: 'UTC',
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.query("SET timezone = 'UTC'", err => {
          cb(err, conn);
        });
      },
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
