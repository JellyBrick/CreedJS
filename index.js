const mongoose = require('mongoose');

const fs = require('fs');
const cluster = require('cluster');
const path = require('path');

const Protocal = require('./src/network/process-protocal');
const Server = require('./src/server');
const EventEmitter = require('./src/event-emitter');
const Datastore = require('./src/database/datastore');

/* global creedjs */
global.creedjs = {};

creedjs.datastore = new Datastore();

creedjs.PLUGIN_PATH = __dirname + '/plugins/';
creedjs.BOT_PATH = __dirname + '/telegram-bots/';

creedjs.config = require('./config');

/**
 * @description
 * Telgram bot tokens are stored.
 * 텔레그램 봇 토큰들이 저장됩니다.
 */
creedjs.botTokens = require('./telegram-bots/token.json');

connectDB();
creedjs.mongo = mongoose.connection;
creedjs.event = new EventEmitter();

creedjs.server = new Server(__dirname);

if(cluster.isMaster) {
    loadPlugins();
    loadTelegramBots();
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
    let plugins = {};
    let dirs = fs.readdirSync(creedjs.PLUGIN_PATH).filter(f => fs.statSync(path.join(creedjs.PLUGIN_PATH, f)).isDirectory());
    Object.keys(dirs).forEach(k => {
        try {
            plugins.k = require(creedjs.PLUGIN_PATH + dirs[k]); // 플러그인 폴더의 index.js만 로드합니다.
            let m = plugins[k]; // index.js
            if(!m) {
                creedjs.server.logger.error(new Error(`Plugin ${dirs[k]} must exports any Object`));
                process.send({
                    type: Protocal.SHUTDOWN
                });
            } else {
                creedjs.server.logger.info(`-----------------[${m.name || dirs[k]}]-----------------`);
                creedjs.server.logger.info(`author: ${m.author || 'unknown'}`);
                creedjs.server.logger.info(`version: ${m.version || '1.0.0'}`);
                creedjs.server.logger.info(`description: ${m.description || ''}`);
                if(typeof m.init === 'function') {
                    m.init();
                }
            }
            
        } catch(e) {
            creedjs.server.logger.error(new Error(`Plugin + ${dirs[k]} + has'nt index.js`));
            process.send({
                type: Protocal.SHUTDOWN
            });
        }
        
    });
    creedjs.server.logger.info('-------------------------------------------------');
    creedjs.server.logger.notice('Every plugin was loaded.');
}

/**
 * @description
 * Loads all telegram bots in creedjs.BOT_PATH.
 * creedjs.BOT_PATH내에 있는 모든 텔레그램 봇들을 로드합니다.
 */
function loadTelegramBots() {
    let bots = {};
    creedjs.server.logger.notice('Loading telegram bots...');
    let dirs = fs.readdirSync(creedjs.BOT_PATH).filter(f => fs.statSync(path.join(creedjs.BOT_PATH, f)).isDirectory());
    Object.keys(dirs).forEach(k => {
        try {
            bots.k = require(creedjs.BOT_PATH + dirs[k]); // 플러그인 폴더의 index.js만 로드합니다.
            let m = bots[k]; // index.js
            if(!m) {
                creedjs.server.logger.error(new Error(`Telegram Bot ${dirs[k]} must exports any Object`));
                process.send({
                    type: Protocal.SHUTDOWN
                });
            } else {
                creedjs.server.logger.info(`-----------------[${m.name || dirs[k]}]-----------------`);
                creedjs.server.logger.info(`author: ${m.author || 'unknown'}`);
                creedjs.server.logger.info(`version: ${m.version || '1.0.0'}`);
                creedjs.server.logger.info(`description: ${m.description || ''}`);
                if(typeof m.init === 'function') {
                    m.init();
                }
            }
        } catch(e) {
            creedjs.server.logger.error(new Error(`Telegram Bot + ${dirs[k]} + has'nt index.js`));
            process.send({
                type: Protocal.SHUTDOWN
            });
        }
    });
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