var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        //The async.parallel() method is passed an object with functions for getting the counts for each of our models. These functions are all started at the same time. When all of them have completed the final callback is invoked with the counts in the results parameter (or an error).

        book_count: function(callback) {
            Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        //On success the callback function calls res.render() specifying a view (template) named 'index' and an object containing the data that is to be inserted into it (this includes the results object that contains our model counts). The data is supplied as key-value pairs, and can be accessed in the template using the key.

        //Note: The callback function from async.parallel() above is a little unusual in that we render the page whether or not there was an error (normally you might use a separate execution path for handling the display of errors).
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all Books.
exports.book_list = function(req, res, next) {

    //The method uses the model's find() function to return all Book objects, selecting to return only the title and author as we don't need the other fields (it will also return the _id and virtual fields), and then sorts the results by the title alphabetically using the sort() method. Here we also call populate() on Book, specifying the author field—this will replace the stored book author id with the full author details.

    Book.find({}, 'title author')
      .sort({title : 1})
      .populate('author')
      .exec(function (err, list_books) {
        if (err) { return next(err); }
        
        //Successful, so render

        //The title and book_list wil be employed in the book_list.pug template.
        
        res.render('book_list', { title: 'Book List', book_list: list_books });
      });
  
  };
  

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    //The method uses async.parallel() to find the Book and its associated copies (BookInstances) in parallel. The approach is exactly the same as described for the Genre detail page. Since the key 'title' is used to give name to the webpage (as defined in the header in 'layout.pug'), this time we are passing results.book.title while rendering the webpage.

    async.parallel({
        book: function(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        book_instance: function(callback) {

          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
    });

};


// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
