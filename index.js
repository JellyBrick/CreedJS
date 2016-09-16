/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const path = require('path');

var TelegramManager = require('./src/telegram/TelegramManager');

var app = express();

var index = require('./routes');
var api = require('./routes/api');

init();

minejet.mongo.on('error', console.error.bind(console, 'connection error:'));
minejet.mongo.once('open', () => console.log('mongodb connected'));

console.log('end of index');

/**
 * @description
 * 초기 설정을 하는 함수입니다
 */
function init() {
    global.minejet = {};
    global.config = require('./config');
    minejet.mongo = mongoose.createConnection(config.database, {
        config: {
            user: config.dbuser,
            pass: config.dbpass
        }
    });
    minejet.server = new(require('./src/Server'))();
    minejet.telegramManager = new TelegramManager();
    require('./src/telegram')(minejet.server.getTelegramBot());
    initApp();
    console.log('init finish');
}

/**
 * @description
 * Express 초기 셋팅 입니다.
 */
function initApp() {
    app.set('port', 80);

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

    app.listen(app.get('port'));
    console.log('initApp finish');
}
