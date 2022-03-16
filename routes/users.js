//The route file /routes/users.js is shown below (route files share a similar structure, so we don't need to also show index.js). First, it loads the express module and uses it to get an express.Router object. Then it specifies a route on that object and lastly exports the router from the module (this is what allows the file to be imported into app.js).

var express = require('express');
var router = express.Router();

/* GET users listing. */
//The route defines a callback that will be invoked whenever an HTTP GET request with the correct pattern is detected. 

router.get('/', function(req, res, next) {
  
  //One thing of interest above is that the callback function has the third argument 'next', and is hence a middleware function rather than a simple route callback. While the code doesn't currently use the next argument, it may be useful in the future if you want to add multiple route handlers to the '/' route path.

  res.send('respond with a resource');
});

//The matching pattern is the route specified when the module is imported ('/users') plus whatever is defined in this file ('/'). In other words, this route will be used when a URL of /users/ is received.

module.exports = router;
