/* jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var Account = require('../src/MCPEPlayer');
var Server = require('../src/MCPEServer');

var User = require('../src/models/User');

router.get('/', (req, res) => {
    res.render('api-description', {
        title: 'MineJet'
    });
});

router.post('/login', (req, res) => {
    /* Server login(auth) api */
    /* Only using this for the first time someone join the 'server' */
    /* Next time, Password will be cached on local*/
    var user = new Account();
    var user = global.mongo.collection('Users').findOne({
        nickcname: req.body.nickname
    });
    if (user.password == req.body.password) {
        res.json({
            result: 'success'
        });
    } else {
        res.join({
            result: 'fail'
        });
    }
});

module.exports = router;
