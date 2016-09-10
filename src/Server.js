/* global config */
var serverInstance = null;

module.exports = class Server {
    constructor(app) {
        if (!serverInstance) {
            serverInstance = this;
        }
        this.app = app
        this._init();
    }

    _init() {
        /**
         * @description
         * 모든 클라이언트(마크 서버) 객체가 여기에 담깁니다.
         * Every clients(MCPE Server) using minejet is stored in this.
         * @type {Client}
         */
        this.servers = {};
        this.bot = new(require('node-telegram-bot-api'))(config.botToken, {
            polling: true
        });
        require('./telegram')(this);
        this.mongo = require('mongoose').createConnection(config.database, {
            config: {
                user: config.dbuser,
                pass: config.dbpass
            }
        });
    }

    getServers() {
        return this.server;
    }

    /**
     * @description
     * It returns Telegram bot instance
     * 텔레그램 봇 인스턴스를 반환합니다.
     * @return {object}
     */
    getTelegramBot() {
        return this.bot;
    }

    /**
     * @description
     * 플레이어가 클라이언트에 접속할 때 호출됩니다.
     * @param {Server} server
     * @param {Player} player
     */
    onPlayerJoin(server, player) {
        server.players.push(player);
    }

    /**
     * @description 플레이어가 클라이언트에서 나갈 때 호출됩니다.
     * @param {Server} server
     * @param {Player} player
     */
    onPlayerQuit(server, player) {
        server.players.splice(server.players.indexOf(player), 1);
    }

    /**
     * @description 클라이언트가 켜질 때 호출됩니다.
     * @param {Server} server
     */
    onClientOpen(server) {
        this.servers.push(server);
    }

    /**
     * @description 클라이언트가 꺼질 때 호출됩니다.
     * @param {Server} server
     */
    onClientClose(server) {
        this.server.splice(this.server.indexOf(server), 1);
    }
};
