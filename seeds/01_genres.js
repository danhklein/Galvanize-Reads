
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('genres').del(),

    // Inserts seed entries
    knex('genres').insert({id: 1, name: 'Python'}),
    knex('genres').insert({id: 2, name: 'JavaScript'}),
    knex('genres').insert({id: 3, name: 'Ruby'})
  );
};
