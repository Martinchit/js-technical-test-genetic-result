const RS = require('randomstring')

exports.seed = (knex) => {
  return knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    .then(() => knex.raw('TRUNCATE TABLE genetic_results RESTART IDENTITY CASCADE'))
    .then(() => {
      return knex('users').insert([
        {
          first_name: 'Ben',
          last_name: 'Chan',
          email: 'ben.chan@test.com',
          password: '$2b$04$QC0j2wxKgv.xTvY1jbjXiODoy6kof0c7oz15DpxnHQnIKcZ03hlDa',
          date_of_birth: '10/10/1990',
          policy_code: RS.generate({ length: 8, charset: 'alphanumeric' })
        },
        {
          first_name: 'Mary',
          last_name: 'Li',
          email: 'mary.li@test.com',
          password: '$2b$04$QC0j2wxKgv.xTvY1jbjXiODoy6kof0c7oz15DpxnHQnIKcZ03hlDa',
          date_of_birth: '01/10/1990',
          policy_code: RS.generate({ length: 8, charset: 'alphanumeric' })
        },
        {
          first_name: 'Winston',
          last_name: 'Yeung',
          email: 'winston.yrung@test.com',
          password: '$2b$04$QC0j2wxKgv.xTvY1jbjXiODoy6kof0c7oz15DpxnHQnIKcZ03hlDa',
          date_of_birth: '01/03/1990',
          policy_code: RS.generate({ length: 8, charset: 'alphanumeric' })
        },
      ]);
    })
    .then(() => {
      return knex('genetic_results').insert([
        {
          type_id: 1,
          user_id: 1,
          data: {
            "random": 45,
            "random float": 62.845,
            "bool": false,
            "date": "1997-04-10",
            "regEx": "helloooooooooooooooooooooooooooooooooooooooooooooooo world",
            "enum": "generator",
            "firstname": "Nerta",
            "lastname": "Felizio",
            "city": "Winnipeg",
            "country": "Libyan Arab Jamahiriya",
            "countryCode": "BD",
            "email uses current data": "Nerta.Felizio@gmail.com",
            "email from expression": "Nerta.Felizio@yopmail.com",
          },
        },
        {
          type_id: 1,
          user_id: 2,
          data: {
            "random": 45,
            "random float": 62.845,
            "bool": false,
            "date": "1997-04-10",
            "regEx": "helloooooooooooooooooooooooooooooooooooooooooooooooo world",
            "enum": "generator",
            "firstname": "Nerta",
            "lastname": "Felizio",
            "city": "Winnipeg",
            "country": "Libyan Arab Jamahiriya",
            "countryCode": "BD",
            "email uses current data": "Nerta.Felizio@gmail.com",
            "email from expression": "Nerta.Felizio@yopmail.com",
          },
        },
        {
          type_id: 1,
          user_id: 3,
          data: {
            "random": 45,
            "random float": 62.845,
            "bool": false,
            "date": "1997-04-10",
            "regEx": "helloooooooooooooooooooooooooooooooooooooooooooooooo world",
            "enum": "generator",
            "firstname": "Nerta",
            "lastname": "Felizio",
            "city": "Winnipeg",
            "country": "Libyan Arab Jamahiriya",
            "countryCode": "BD",
            "email uses current data": "Nerta.Felizio@gmail.com",
            "email from expression": "Nerta.Felizio@yopmail.com",
          },
        },
      ]);
    });
};
