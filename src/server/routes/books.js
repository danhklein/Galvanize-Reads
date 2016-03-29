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
    console.log('books', result[0])
    console.log('authors', result[1].rows);
    res.render('books', { title: 'Galvanize Reads | Books',
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

// //Show Single Book
// router.get('/:id', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// //Post form to create new book
// router.post('/new')

// //Delete single book
// router.post('/delete/:id')

// //Edit single book
// router.post('/edit/:id')
module.exports = router;