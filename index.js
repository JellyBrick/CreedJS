/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const redis = require('redis');

const path = require('path');

global.minejet = {};
global.config = require('./config');
minejet.bot = new (require('node-telegram-bot-api'))(config.botToken, {
    polling: true
});
minejet.mongo = mongoose.createConnection(config.database, {
    config: {
        user: config.dbuser,
        pass: config.dbpass
    }
});
minejet.redisClient = redis.createClient();

minejet.database = {};

var app = express();

var index = require('./routes');
var api = require('./routes/api');

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

passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

require('./src/telegram')();

//mongo.on('error', console.error.bind(console, 'connection error:'));
//mongo.once('open', () => console.log('mongodb connected'));

minejet.server = new (require('./src/Server'))(app);
