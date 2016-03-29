var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
var queries = require("../../../queries.js");

//Render Book list
router.get('/', function(req, res, next){

  var promises = [];
  promises.push(queries.getAllBooks());
  promises.push(queries.getAllAuthors());
  return Promise.all(promises)

  .then( function (result) {
    res.render('books', { title: 'Galvanize Reads | Book List',
                          books: result[0],
                          authors: result[1].rows }
    );
  })

  .catch( function (error) { console.log(error); return error; });

});
// //Show form to create new book
// router.get('/new', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// //Show form to edit single book
// router.get('/edit/:id', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//Show Single Book
router.get('/:id', function(req, res, next) {
    var promises = [];
    promises.push(queries.getBook(req.params.id));
    promises.push(queries.getAllAuthors());
    return Promise.all(promises)

    .then( function (result) {
    res.render('showbooks', { title: 'Galvanize Reads',
                          books: result[0],
                          authors: result[1].rows });
  })

  .catch( function (error) { console.log(error); return error; });

});

// //Delete single book
router.post('/delete/:id', function (req, res, next) {
    var promises = [];
    promises.push(queries.deleteBook(req.params.id));
    promises.push(queries.deleteBookFromCatalog(req.params.id));
    return Promise.all(promises)
    .then(function(result) {
      res.redirect('/books')
    });

})

// //Post form to create new book
// router.post('/new')



// //Edit single book
// router.post('/edit/:id')
module.exports = router;