const path = require('path');
const debug = require('debug')(':server');
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');


var cors =  require('cors');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var config = require('../config/DB');
var bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the Database' +  err) }
);

var db = mongoose.connection;
db.on('Error ', console.error.bind(console, 'MongoDB connection error: '));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));

/*
app.use((req, res, next)=>{
   res.status(503).send('Site is currently down. Check back soon!');
});
*/
app.use('/api', indexRouter);
app.use('/user', usersRouter);

app.use(function(req, res, next){
  next(createError(404));
});

app.use(function(err, req, res, next){
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
/*const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, '../public');



console.log("dist_dir "+ DIST_DIR);
//app.use(express.static(DIST_DIR));
app.use(express.static(HTML_FILE));
app.get('*', (req, res) => {
	res.sendFile(HTML_FILE);
});
*/





var port  = normalizePort(process.env.PORT || '3000');
app.set('port', port);
//const PORT = process.env.PORT || 80;

var server = http.createServer(app);

server.listen(port, ()=>{
	console.log(`App listening to ${port}....`);
	server.on('error', onError);

	console.log('Press CTRL+C to quit.');
	server.on('listening', onListening);

});

function normalizePort(val){
	var port = parseInt(val , 10);
	if(isNaN(port)){
		return val;
	}
	if(port >= 0){
		return port;
	}
	return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


