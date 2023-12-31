var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let loginRouter = require('./routes/loginRouter');
let dashboardRouter = require('./routes/dashboardRouter');
let accountsRouter = require('./routes/accountsRouter');
let messagesRouter = require('./routes/messagesRouter');
const groupsRouter = require('./routes/groupsRouter');
const personalRouter = require('./routes/personalRouter');

// create app
var app = express();

// create http server
const server = require('http').createServer(app);

// create io connection
const { Server } = require('socket.io');
const io = new Server(server);

// config io to listen for database changes
require('./socketIO').config(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/', dashboardRouter);
app.use('/accounts', accountsRouter);
app.use('/groups', groupsRouter);
app.use('/messages', messagesRouter);
app.use('/personal', personalRouter);

// path setup 
var pathConfig = require('./path');
global.__base = __dirname;
global.__path_views = __base + pathConfig.folder_views;
global.__path_elements = __base + pathConfig.folder_elements;
global.__path_avatars = __base + pathConfig.folder_avatars;
global.__path_posts = __base + pathConfig.folder_posts;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require('dotenv').config();
module.exports = {
  app: app,
  server: server
}
