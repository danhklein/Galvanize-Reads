
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('f_name');
    table.string('l_name');
    table.text('biography');
    table.string('img_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
