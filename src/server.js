/* global creedjs */
const Logger = require('./utils/logger');
const Protocal = require('./network/process-protocal');

const express = require('express');

const cluster = require('cluster');
const path = require('path');

class Server {
    constructor(ipath) {
        this.path = ipath;
        this._init();
    }

    _init() {
        /**
         * @description
         * Every clients using minejet are stored in this.
         * 모든 클라이언트 객체가 여기에 담깁니다.
         * @type {Client}
         */
        this.clients = {};
        this.logger = new Logger(this.path, creedjs.config.debug);

        /**
         * @description
         * Implementation of master.
         * 마스터 서버의 처리를 구현합니다.
         */
        if(cluster.isMaster) {
            cluster.on('online', worker => {
                worker.on('message', this.masterIncommingMessageHandler);
            });
            this.logger.info('Server start!');
        }

        /**
         * @description
         * Implementation of master.
         * 워커 서버의 처리를 구현합니다.
         */
        if(cluster.isWorker) {
            const bodyParser = require('body-parser');
            const app = express();
            /* app setting & listen */
            app.set('port', 80);

            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'pug');

            app.use(express.static(path.join(__dirname, 'public')));

            app.use(bodyParser.urlencoded({
                extended: false
            }));
            app.use(bodyParser.json());

            app.listen(app.get('port'));
            this.logger.info(`Worker #${process.pid} listens on ${app.get('port')}.`);
        }
        creedjs.event.emit('open');
    }

    /**
     * @description
     * Handles messages which was sent by child process.
     * 워커에서 마스터로 전송된 메세지를 처리합니다.
     */
    masterIncommingMessageHandler(msg) {
        switch(msg.type) {
            case Protocal.PLAYER_JOIN: {
                this.onPlayerJoin(msg.client, msg.player);
                break;
            }
            case Protocal.PLAYER_QUIT: {
                this.onPlayerQuit(msg.client, msg.player);
                break;
            }
            case Protocal.CLIENT_START: {
                this.onClientOpen(msg.client);
                break;
            }
            case Protocal.CLIENT_STOP: {
                this.onClientOpen(msg.client);
                break;
            }
            case Protocal.LOG: {
                let level = msg.level;
                let message = msg.message;
                this.logger.log(level, message);
                break;
            }
            case Protocal.PROCESS_STOP_CHECK: {
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * @description
     * Handles messages which was sent by master process.
     * 마스터에서 워커로 전송된 메세지를 핸들링합니다.
     */
    processIncomingMessageHandler(msg) {
        switch(msg.type) {
            case Protocal.PROCESS_STOP: {
                process.send({
                    type: Protocal.PROCESS_STOP_CHECK
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * @description
     * 플레이어가 클라이언트에 접속할 때 호출됩니다.
     * @param {Client} client
     * @param {Player} player
     */
    onPlayerJoin(player, client) {
        if(cluster.isMaster) {
            creedjs.event.emit('playerjoin', player);
            client.playerJoin(player);
            return;
        }
        process.send({
            type: Protocal.PLAYER_JOIN,
            player: player,
            client: client
        });
    }

    /**
     * @description 플레이어가 클라이언트에서 나갈 때 호출됩니다.
     * @param {Client} client
     * @param {Player} player
     */
    onPlayerQuit(client, player) {
        if(cluster.isMaster()) {
            creedjs.event.emit('playerquit', player);
            client.playerQuit(player);
            return;
        }
        process.send({
            type: Protocal.PLAYER_QUIT,
            player: player,
            client: client
        });
    }

    /**
     * @description 클라이언트가 켜질 때 호출됩니다.
     * @param {Client} client
     */
    onClientOpen(client) {
        if(cluster.isMaster()) {
            creedjs.event.emit('clientopen', client);
            this.clients[client.ip].push(client);
            return;
        }
        process.send({
            type: Protocal.CLIENT_OPEN,
            client: client
        });
    }

    /**
     * @description 클라이언트가 꺼질 때 호출됩니다.
     * @param {Client} client
     */
    onClientClose(client) {
        if(cluster.isMaster()) {
            creedjs.event.emit('clientclose', client);
            delete this.clients[client.ip];
            return;
        }
        process.send({
            type: Protocal.CLIENT_OPEN,
            client: client
        });
    }
}

module.exports = Server;