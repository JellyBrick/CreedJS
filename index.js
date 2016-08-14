/* jshint esversion: 6 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var cluster = require('cluster');
var os = require('os');
var path = require('path');

global.config = require('./config');

if(cluster.isMaster) {
	os.cpus().forEach(() => cluster.fork());
	
	require('./src/telegram')();

	cluster.on('exit', (worker, code, signal) => {
		console.log('worker #' + worker.id + ' died: ' + signal || code);
		cluster.fork();
	});
} else{
	//let mongo = mongoose.createConnection(global.config.database);
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

	//mongo.on('error', console.error.bind(console, 'connection error:'));
	//mongo.once('open', () => console.log('mongodb connected'));
	
	app.listen(process.env.PORT || global.config.port, () => console.log('Listening on worker #' + id));
}