const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const os = require('os');
const fs = require('fs');
const cluster = require('cluster');
const path = require('path');

const Server = require('./src/server');
const app = express();

/* global creedjs */
global.creedjs = {};

creedjs.PLUGIN_PATH = __dirname + '/plugins/';
creedjs.config = require('./config');
creedjs.mongo = mongoose.connection;
creedjs.botTokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'telegram-bots', 'token.json'), 'utf8'));

mongoose.Promise = Promise;
mongoose.connect(creedjs.config.database, {
    config: {
        user: creedjs.dbuser,
        pass: creedjs.dbpass
    }
});

if(cluster.isMaster){
    os.cpus().forEach(() => cluster.fork());
    cluster.on('exit', (worker, code, signal) => {
        console.log(`#${worker.id}: died (${signal || code})`);
        cluster.fork();
    });
    creedjs.mongo.on('error', console.error.bind(console, 'connection error:'));
    creedjs.mongo.once('open', () => console.log('mongodb connected'));
    creedjs.server = new Server();
    return;
}

/* app setting & listen */
app.set('port', 80);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.listen(app.get('port'));
