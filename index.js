const mongoose = require('mongoose');

const os = require('os');
const fs = require('fs');
const cluster = require('cluster');
const path = require('path');

const Server = require('./src/server');
const EventEmitter = require('./src/event-emitter');

/* global creedjs */
global.creedjs = {};

creedjs.PLUGIN_PATH = __dirname + '/plugins/';
creedjs.BOT_PATH = __dirname + '/telegram-bots/';

creedjs.config = require('./config');

/**
 * @description
 * Telgram bot tokens are stored.
 * 
 */
creedjs.botTokens = require('./telegram-bots/token.json');

connectDB();
creedjs.mongo = mongoose.connection;

creedjs.event = new EventEmitter();
creedjs.server = new Server();

if(cluster.isMaster) {
    loadPlugins();
    loadTelegramBots();

    os.cpus().forEach(() => cluster.fork());
    cluster.on('exit', (worker, code, signal) => {
        creedjs.server.logger.notice(`#${worker.id}: died (${signal || code})`);
        cluster.fork();
    });
    cluster.on('fork', worker => {
        creedjs.server.logger.notice(`#${worker.id} forked`);
    });
    creedjs.mongo.on('error', err => creedjs.server.logger.error('connection error:' + err));
    creedjs.mongo.once('open', () => creedjs.server.logger.info('mongodb connected'));
    return;
}

/**
 * @description
 * Loads every modules(plguin) in creedjs.PLUGIN_PATH.
 * creedjs.PLUGIN_PATH 안에 있는 모든 모듈을 불러옵니다.
 */
function loadPlugins() {
    creedjs.server.logger.notice('Loading plugins...');
    let modules = require('require-all')(creedjs.PLUGIN_PATH);
    Object.keys(modules).forEach(k => {
        let m = modules[k];
        creedjs.server.logger.info(`-----------------[${m.name || 'NoName'}]-----------------`);
        creedjs.server.logger.info(`author: ${m.author || 'unknown'}`);
        creedjs.server.logger.info(`version: ${m.version || '1.0.0'}`);
        creedjs.server.logger.info(`description: ${m.description || ''}`);
        if(typeof m.init === 'function') {
            m.init();
        }
    });
    //TODO: 플러그인 폴더 내에 단일 파일이 아닌 폴더형 플러그인 불러오기.
    creedjs.server.logger.info('-------------------------------------------------');
    creedjs.server.logger.notice('Every plugin was loaded.');
}

/**
 * @description
 * Loads all telegram bots in creedjs.BOT_PATH.
 * creedjs.BOT_PATH내에 있는 모든 텔레그램 봇들을 로드합니다.
 */
function loadTelegramBots() {
    creedjs.server.logger.notice('Loading telegram bots...');
    let botFolders = fs.readdirSync(creedjs.BOT_PATH).filter(file => {
        return fs.statSync(path.join(creedjs.BOT_PATH, file)).isDirectory();
    });
    //TODO: Implementation
    creedjs.server.logger.info('-------------------------------------------------');
    creedjs.server.logger.notice('Every telegram bot was loaded.');
}

/**
 * @description
 * Cofiguration database and connect.
 * DB를 세팅하고 연결합니다.
 */
function connectDB() {
    mongoose.Promise = Promise;
    mongoose.connect(creedjs.config.database, {
        config: {
            user: creedjs.config.dbuser,
            pass: creedjs.config.dbpass
        }
    });
}