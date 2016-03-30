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
    return knex.raw("SELECT c.book_id, array_agg(' ' || a.f_name || ' ' || a.l_name) as name, array_agg(a.id) as id FROM catalog c INNER JOIN authors a ON (c.author_id = a.id) GROUP BY c.book_id ORDER BY c.book_id;");
    },

    //Get single book
    getBook: function(book_id) {
     return Books()
        .select('books.id', 'books.title', 'books.description', 'books.img_url', 'genres.name')
        .innerJoin('genres', 'books.genre_id', 'genres.id').where('books.id', book_id);
    },

    getGenres: function() {
        return knex('genres').select();
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
        return Authors().where('id', author_id);
    },
    //delete book
    deleteBook: function(book_id) {
        return Books().where('id', book_id).del();
    },
    //delete book from catalog
    deleteBookFromCatalog: function(book_id) {
        return knex('catalog').where('book_id', book_id).del();
    },
    //Add new book and add it and authors to catalog
    addBook: function(body) {
        if (!Array.isArray(body.authors)) {
            body.authors = [body.authors];
        }
        return Books().insert({
            title: body.title,
            genre_id: body.genres,
            description: body.description,
            img_url: body.img_url
        })
        .returning('id')
        .then(function(book) {
            var author_ids = body.authors || [body.authors];
            var authorPromises = author_ids.map(function(id) {
            return Authors().where('id', id).returning('id');
            });
            return Promise.all(authorPromises).then(function(ids) {
                var catObject = ids.map(function(id) {
                    return {
                        book_id: book[0],
                        author_id: id[0].id
                    };
                });

                return knex('catalog').insert(catObject).returning('book_id');
            });
        });
    }

}