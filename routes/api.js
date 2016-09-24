/* global minejet */
const express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();

var Player = require('../src/Player');
var Server = require('../src/Client');
var limiter = require('../src/api/limiter');

var Account = require('../src/models/Account');

router.get('/', (req, res) => {
    res.render('api-description', {
        title: 'MineJet'
    });
});

/**
 * @description
 * This is only for authenticating an account.
 */
router.get('/auth/:nickname:password', (res, req) => {

});

/**
 * @description
 * When player joins the server, you must POST /join
 */
router.post('/join', limiter.join, (req, res) => {
    let nickname = req.body.nickname;
    let password = req.body.password;
    let response = {};
    if (!nickname || !password) {
        return handleErr('No data', req);
    }

    Account.findOne({
        nickname: nickname
    }, (err, doc) => {
        if (err) return handleErr(err, req);
        bcrypt.compare(password, doc.password, (err, result) => {
            if (err) return handleErr(err, req);
            if (result) {
                Client.getClientByIp(req.ip, (err, client) => {
                    if (err) return handleErr(err, req);
                    response.result = true;
                    let player = new Player(client, doc);
                    minejet.server.onPlayerJoin(client, player);
                    res.json(response);
                });
            } else {
                response.result = false;
                res.json(response);
            }
        });
    });
});

/**
 * @description
 * handles error
 * @param {Error} err
 * @param {Request} req
 */
function handleErr(err, req) {
    let response = {};
    response.result = false;
    response.error = err;
    res.json(response);
}

module.exports = router;
