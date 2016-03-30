var bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    knex('users').insert(
      {
        name: 'Dan',
        email: 'danhkelin@gmail.com',
        password: bcrypt.hashSync('test', 10),
        admin: true
      }),
    knex('users').insert(
      {
        name: 'Berry',
        email: 'berrydahlin@gmail.com',
        password: bcrypt.hashSync('test', 10),
        admin: true
      }),
    knex('users').insert(
      {
        name: 'Ghost',
        email: 'ghost@ghost.com',
        password: bcrypt.hashSync('test', 10),
        admin: false
      }),
    knex('users').insert(
      {
        name: 'Horse',
        email: 'Horse@Horse.com',
        password: bcrypt.hashSync('test', 10),
        admin: false
      })
  );
};