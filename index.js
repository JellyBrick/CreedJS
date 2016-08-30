/* jshint esversion: 6 */
/* global config */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var redis = require('redis');

var path = require('path');

global.minejet = {};
minejet.config = require('./config');
minejet.bot = new (require('node-telegram-bot-api'))(config.botToken, {
    polling: true
});
minejet.utils = new (require('./src/Utils'))();
minejet.mongo = mongoose.createConnection(config.database, {
    config: {
        user: config.dbuser,
        pass: config.dbpass
    }
});
minejet.redisClient = redis.createClient();
minejet.server = new (require('./src/Server'))();

minejet.database = {};

var id = cluster.worker.id;
var app = express();

var index = require('./routes');
var api = require('./routes/api');
var test = require('./routes/test');

var Account = require('./src/models/Account');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api', api);
app.use('/test', test);

passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

require('./src/telegram')();

mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', () => console.log('mongodb connected'));

app.listen(process.env.PORT || config.port, () => console.log('Listening on worker #' + id));
