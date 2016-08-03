'use strict'

var express = require('express');
var cluster = require('cluster');
var os = require('os');,

if(cluster.isMaster) {
	os.cpus.forEach(() => cluster.fork());
	cluster.on('exit', (worker, code, signal) => {
		console.log('worker #${worker.id} died: ${signal || code}');
		cluster.fork();
	});
} else{
	let id = cluster.worker.id;
	let app = express();
	
	app.set('view engine', 'pug');
	app.use(express.static(path.join(__dirname, 'static')));
	require(./routes)(app);
	app.listen(8080, () => console.log('Listening on worker #${id}'));
}