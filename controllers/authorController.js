var Author = require('../models/author');

//The module first requires the model that we'll later be using to access and update our data. It then exports functions for each of the URLs we wish to handle (the create, update and delete operations use forms, and hence also have additional methods for handling form post requests 


//We could also include the next function to be called if the method does not complete the request cycle, but in all these cases it does, so we've omitted it. 


// Display list of all Authors.
exports.author_list = function(req, res, next) {
    
    //The method uses the model's find(), sort() and exec() functions to return all Author objects sorted by family_name in alphabetic order. The callback passed to the exec() method is called with any errors (or null) as the first parameter, or a list of all authors on success. 
    
    Author.find()
      .sort([['family_name', 'ascending']])
      .exec(function (err, list_authors) {
        
        //If there is an error it calls the next middleware function with the error value, and if not it renders the author_list(.pug) template, passing the page title and the list of authors (author_list).
        
        if (err) { return next(err); }
        //Successful, so render
        res.render('author_list', { title: 'Author List', author_list: list_authors });
      });
  
  };
  
//Display detail page for a specific Author
//NOTE: If a controller function is expected to receive path parameters, these are output in the message string 
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail ' + req.params.id);
};

//Display Author create form on GET
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

//Handle Author create on POST
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

//Handle Author delete form on GET
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

//Handle Author delete on POST
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};


