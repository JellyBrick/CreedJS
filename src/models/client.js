/* global creedjs */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let clientSchema = new Schema({
    admin: ObjectId,
    name: {
        type: String,
        maxlength: 15,
        minlength: 2
    },
    visitors: {
        today: Number,
        total: Number
    },
    lastIp: String,
    token: String
});

class Client extends mongoose.model('Client', clientSchema) {
    static getClientByIp(lastIp) {
        return new Promise((reject, resolve) => {
            Client.findOne({lastIp}).then(data => {
                resolve(data);
            }).catch(err => {
                creedjs.server.logger.error(err);
                reject(err);
            });
        });
    }
}

module.exports = Client;
