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
	/*
		아 초보주제에 괜히 클러스터링으로 시작한듯;;
		클러스터링은 그냥 포기합니다 ㅠㅜ
		async나 제대로 공부해야지
	*/
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

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');

	app.use(express.static(path.join(__dirname, 'static')));
	app.use(morgan('dev'));

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use('/', index);
	app.use('/api', api);

	app.listen(process.env.PORT || global.config.port, () => console.log('Listening on worker #${id}'));
}
