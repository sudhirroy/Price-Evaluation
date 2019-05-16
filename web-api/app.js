var express = require('express');
var path = require('path');
let mongoose = require('mongoose');
var http = require('http');

var app = express();
var cors = require('cors');
var morgan = require('morgan');
var config = require('./config');
var route = require('./router');
// view engine setup
mongoose.connect('mongodb://' + config.database.server + '/' + config.database.name, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', route);

var server = http.createServer(app);

server.listen(config.port, () => {
  console.log('Server (' + config.server + ') listening on port ' + config.port);
});
