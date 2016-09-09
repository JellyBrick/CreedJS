/* jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var Account = require('../src/Player');
var Server = require('../src/Server');
var limiter = require('../src/api/limiter');
var Query = require('../src/Query');

var User = require('../src/models/Account');

router.get('/', (req, res) => {
    res.render('api-description', {
        title: 'MineJet'
    });
});

/**
 * @description  This is only for authenticating an account.
 */
router.get('/auth/:nickname:password', (res, req) => {

});

/**
 * @description  When player joins the server, you should use this api
 */
router.post('/join', limiter.join, (req, res) => {
    Query.findAccountByNickNameCached(req.body.nickname, reply => {
        res.json(reply);
    });
});

module.exports = router;
