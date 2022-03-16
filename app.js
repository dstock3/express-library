var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Next, we create the app object using our imported express module, and then use it to set up the view (template) engine. 
var app = express();

// view engine setup
//There are two parts to setting up the engine. First, we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views). Then we set the 'view engine' value to specify the template library (in this case "pug").

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//The next set of functions call app.use() to add the middleware libraries into the request handling chain. 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// In addition to the 3rd party libraries we imported previously, we use the express.static middleware to get Express to serve all the static files in the /public directory in the project root.

app.use(express.static(path.join(__dirname, 'public')));

//Now that all the other middleware is set up, we add our (previously imported) route-handling code to the request handling chain. The imported code will define particular routes for the different parts of the site:

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//The last middleware in the file adds handler methods for errors and HTTP 404 responses.

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//The last step is to add it to the module exports (this is what allows it to be imported by /bin/www).
module.exports = app;
