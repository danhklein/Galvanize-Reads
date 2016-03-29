
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('title');
    table.string('img_url');
    table.text('description')
    table.integer('genre_id').references('genres(id)');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};

