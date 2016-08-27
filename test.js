let mongoose = require('mongoose');

var cluster = require('cluster');
var os = require('os');

if(cluster.isMaster) {
    os.cpus().forEach(() => {
        cluster.fork();
    });
} else {
    let mongo = mongoose.createConnection('mongodb:/localhost/minejet', { config: { autoIndex: false, user: 'abc', pass: 'defg!' } });
    let Account = require('./src/models/Account');
    let testUser = new Account();

    mongo.on('error', console.error.bind(console, 'connection error:'));
    mongo.once('open', () => console.log('mongodb connected'));
    console.log('This is worker #' + cluster.worker.id);
}
