/* jshint esversion: 6 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var cluster = require('cluster');
var os = require('os');
var path = require('path');

global.config = require('./config');
global.mongo = mongoose.createConnection(global.config.database);

if(cluster.isMaster) {
	os.cpus().forEach(() => cluster.fork());

	cluster.on('exit', (worker, code, signal) => {
		console.log('worker #${worker.id} died: ${signal || code}');
		cluster.fork();
	});

	global.mongo.on('error', console.error.bind(console, 'connection error:'));

	global.mongo.on('open', () => console.log('mongodb connected'));
} else{
	let id = cluster.worker.id;
	let app = express();

	let index = require('./routes');
	let api = require('./routes/api');
	let test = require('./routes/test');

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');

	app.use(express.static(path.join(__dirname, 'static')));
	app.use(morgan('dev'));

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use('/', index);
	app.use('/api', api);
	app.use('/test', test);

	require('./src/telegram')();
	app.listen(process.env.PORT || global.config.port, () => console.log('Listening on worker #' + id));
}
