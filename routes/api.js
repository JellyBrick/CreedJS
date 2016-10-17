/* global creedjs */
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const Player = require('../src/player');
const Client = require('../src/client');
const limiter = require('../src/api/limiter');
const Protocal = require('../src/network/process-protocal');

const Account = require('../src/models/Account');
const Response = require('../src/api/response');

router.get('/', (req, res) => {
    res.render('api-description', {
        title: 'CreedJS'
    });
});

/**
 * @description
 * This is only for authenticating an account.
 * 단순히 계정 비밀번호 인증을 위한 GET 라우터입니다.
 */
router.get('/auth/:nickname', (res, req) => {
    let password = req.query.passsword;
});

/**
 * @description
 * When player joins the server, you must POST /join
 * 플레이어가 서버에 접속할 땐 만드시 /join에 POST 해야합니다.
 */
router.post('/join/:nickname', limiter.join, (req, res) => {
    let nickname = req.params.nickname;
    let password = req.body.password;
    let response = new Response();
    if (!nickname || !password) {
        return error(new Error('request.bodyerror'), req);
    }

    Account.findByNickName(nickname).then(data => {
        bcrypt.compare(password, data.password, (err, result) => {
            if (err) Promise.reject(err);
            if (result) {
                Client.getClientByIp(req.ip, (err, client) => {
                    if (err) Promise.reject(err);
                    response.result = true;
                    let player = new Player(client, data);
                    process.send({
                        type: Protocal.PLAYER_JOIN,
                        player,
                        client
                    });
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