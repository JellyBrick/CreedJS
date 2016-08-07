var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');

var config = require('./config');

var cluster = require('cluster');
var os = require('os');
var path = require('path');

if(cluster.isMaster) {
	os.cpus.forEach(() => cluster.fork());
	cluster.on('exit', (worker, code, signal) => {
		console.log('worker #${worker.id} died: ${signal || code}');
		cluster.fork();
	});
} else{
	let id = cluster.worker.id;
	let app = express();
	
	let index = require('./routes');
	let api = require('./routes/api');

	mongoose.connect(config.database);

	app.set('view engine', 'pug');
	app.use(express.static(path.join(__dirname, 'static')));
	app.use(morgan('dev');

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use('/', index);
	app.use('/api', api);

	app.listen(process.env.PORT || config.port, () => console.log('Listening on worker #${id}'));
}
