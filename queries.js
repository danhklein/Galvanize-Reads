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
    deleteBook: function(book_id) {
        return Books().where('id', book_id).del();
    },
    deleteBookFromCatalog: function(book_id) {
        return knex('catalog').where('book_id', book_id).del();
    },
    // addBook: function (newBook) {
    //     return Books().insert({
    //         title: newBook.title,
    //         img_url: newBook.img_url,
    //         description: newBook.description,
    //         genre_id: newBook.genre
    //     }).returning('id');
    // },
    addAuthorstoBook: function(book_id, author_id) {
        return knex('catalog').insert({
            book_id: book_id,
            author_id: author_id });
    },
     addBook: function(body) {
    if (!Array.isArray(body.authors)) {
    body.authors = [body.authors];
        }
  return Books().insert({
    title: body.title,
    genre_id: body.genres,
    description: body.description,
    img_url: body.img_url
  }).returning('id')
  .then(function(book) {
    var author_ids = body.authors || [body.authors];
    var authorPromises = author_ids.map(function(id) {
      return Authors().where('id', id).returning('id');
    });
    return Promise.all(authorPromises).then(function(ids) {
      var bookObject = ids.map(function(id) {
         return {
          book_id: book[0],
          author_id: id[0].id
        };
      });
      console.log('Book!', bookObject);
      return knex('catalog').insert(bookObject).returning('book_id');
    });
    // map over authors and make new query for each author, then get array of promises.
    // then promise.all and do something with that.  the result is an array of what im returning.
  });
}

}