const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const os = require('os');
const cluster = require('cluster');
const path = require('path');

const Server = require('./src/server');
var app = express();

if(cluster.isMaster){
    os.cpus().forEach(() => cluster.fork());
    cluster.on('exit', (worker, code, signal) => {
        console.log(`#${worker.id}: died (${signal || code})`);
        cluster.fork();
    });
    global.server = new Server();
    return;
}

initApp();

creedjs.mongo.on('error', console.error.bind(console, 'connection error:'));
creedjs.mongo.once('open', () => console.log('mongodb connected'));

/**
 * @description
 * 초기 설정을 하는 함수입니다
 */
function init() {
    /* global creedjs */
    global.creedjs = {};

    creedjs.PLUGIN_PATH = __dirname + '/plugins';
    creedjs.config = require('./config');
    mongoose.Promise = Promise;
    mongoose.connect(creedjs.config.database, {
        config: {
            user: creedjs.dbuser,
            pass: creedjs.dbpass
        }
    });
    creedjs.mongo = mongoose.connection;
    require('./src/telegram')(creedjs.server.getTelegramBot());
    initApp();
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

    app.listen(app.get('port'));
}
