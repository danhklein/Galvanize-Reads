var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
var test = require("../../../queries.js");

//Render Book list
router.get('/', function(req, res, next){

  var promises = [];

  promises.push(test.getAllBooks());

  promises.push(test.getAllAuthors());

  return Promise.all(promises)

  .then( function (result) {
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