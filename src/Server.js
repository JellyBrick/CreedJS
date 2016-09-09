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
        /**
         * @description
         * It creates a worker as the number of CPU cores.
         * CPU 수 만큼 워커를 생성합니다.
         */
        for (let i = 0; i < this.getOs().cpus().length; i++) {
            let id = this.getCluster().fork().id;
            this.app.listen(process.env.PORT || config.port, () => console.log('Listening on worker #' + id));
        }
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
     * It returns the Cluster module.
     * 클러스터 모듈을 반환합니다.
     * @return {object}
     */
    getCluster() {
        return require('cluster');
    }

    /**
     * @description
     * It returns the OS module.
     * OS 모듈을 반환합니다.
     * @return {object}
     */
    getOs() {
        return require('os');
    }

    /**
     * @description
     * It returns the worker to using index. (1 ~ CPU Cores)
     * 1~CPU코어수 중의 숫자를 입력받아 해당되는 순서의 워커를 반환합니다.
     * @param {integer} index
     * @return {object}
     */
    getWorker(index) {
        let count = 0;
        let workers = {};
        for (let key in this.getCluster().workers) {
            workers[count++] = this.getCluster().workers[key];
        }
        let target = workers[index];
        if (target == null) {
            for (let key in this.getCluster().workers) {
                target = this.getCluster().workers[key];
                break;
            }
        }
        return target;
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
