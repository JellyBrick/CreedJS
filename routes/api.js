/* global creedjs */
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const Player = require('../src/player');
const Client = require('../src/client');
const limiter = require('../src/api/limiter');

const Account = require('../src/models/Account');

router.get('/', (req, res) => {
    res.render('api-description', {
        title: 'CreedJS'
    });
});

/**
 * @description
 * This is only for authenticating an account.
 */
router.get('/auth/:nickname', (res, req) => {
    let password = req.query.passsword;
});

/**
 * @description
 * When player joins the server, you must POST /join
 * 플레이어가 서버에 접속할 땐 만드시 /join에 POST 해야합니다.
 */
router.post('/join', limiter.join, (req, res) => {
    let nickname = req.body.nickname;
    let password = req.body.password;
    let response = {};
    if (!nickname || !password) {
        return error(new Error('request.bodyerror'), req);
    }

    Account.findOne({
        nickname: nickname
    }).then(data => {
        bcrypt.compare(password, data.password, (err, result) => {
            if (err) return error(err, req);
            if (result) {
                Client.getClientByIp(req.ip, (err, client) => {
                    if (err) return error(err, req);
                    response.result = true;
                    let player = new Player(client, data);
                    //creedjs.server.onPlayerJoin(client, player);
                    res.json(response);
                });
            } else {
                response.result = false;
                res.json(response);
            }
        });
    }).catch(err => {
        creedjs.server.logger.error(err);
    });
});

/**
 * @description
 * Handles error
 * @param {Error} err
 * @param {Request} req
 */
function error(err, req) {
    let response = {};
    response.result = false;
    response.error = String(err);
    req.json(response);
    creedjs.server.logger.error(err);
}

module.exports = router;
