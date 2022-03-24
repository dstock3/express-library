var Author = require('../models/author');

//The module first requires the model that we'll later be using to access and update our data. It then exports functions for each of the URLs we wish to handle (the create, update and delete operations use forms, and hence also have additional methods for handling form post requests 


//We could also include the next function to be called if the method does not complete the request cycle, but in all these cases it does, so we've omitted it. 


//Display list of all Authors
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
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


