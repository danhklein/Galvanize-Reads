
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('catalog').del(),

    // Inserts seed entries
    knex('catalog').insert({ book_id: 1, author_id: 1}),
    knex('catalog').insert({ book_id: 1, author_id: 5}),
    knex('catalog').insert({ book_id: 1, author_id: 6}),
    knex('catalog').insert({ book_id: 2, author_id: 2}),
    knex('catalog').insert({ book_id: 3 , author_id: 3}),
    knex('catalog').insert({ book_id: 4, author_id: 4}),
    knex('catalog').insert({ book_id: 5, author_id: 4}),
    knex('catalog').insert({ book_id: 6 , author_id: 4})
  );
};
