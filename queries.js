var knex = require('./db/knex');

function Books() {
    return knex('books');
}

function Authors() {
    return knex('authors');
}

module.exports = {
    //Get all Books Data
    getAllBooks: function() {
        return Books()
        .select('books.id', 'books.title', 'books.description', 'books.img_url', 'genres.name')
        .innerJoin('genres', 'books.genre_id', 'genres.id');
    },
    //Get all Authors
    getAllAuthors : function() {
    return knex.raw("SELECT c.book_id, array_agg(' ' || a.first || ' ' || a.last) as name FROM catalog c INNER JOIN authors a ON (c.auth_id = a.id) GROUP BY c.book_id ORDER BY c.book_id;");
    },
    //Get single book
    getBook: function(book_id) {
        return Books().where('id', book_id)
    },

    //Get single genre
    getBookGenre: function(genre_id) {
        return knex('genres').where('id', genre_id)
    },
    //Get All Authors
    getAuthors: function() {
        return Authors().select();
    },
    //Get Single Author
    getAuthor: function(author_id) {
        return Authors.where('id', author_id)
    }

}