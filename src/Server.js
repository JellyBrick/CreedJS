const Logger = require('./utils/logger');

class Server {
    constructor() {
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
        this.logger = new Logger();
    }

    /**
     * @description
     * 자식 프로세서로부터 온 메세지를 처리합니다.
     * @param {Object} msg
     */
    messageHandler(msg) {
        
    }

    get clients() {
        return this.clients;
    }

    /**
     * @description
     * 플레이어가 클라이언트에 접속할 때 호출됩니다.
     * @param {Client} client
     * @param {Player} player
     */
    onPlayerJoin(player, client) {
        client.players.push(player);
    }

    /**
     * @description 플레이어가 클라이언트에서 나갈 때 호출됩니다.
     * @param {Client} client
     * @param {Player} player
     */
    onPlayerQuit(client, player) {
        client.players.splice(client.players.indexOf(player), 1);
    }

    /**
     * @description 클라이언트가 켜질 때 호출됩니다.
     * @param {Client} client
     */
    onClientOpen(client) {
        this.clients[client.domain] = client;
    }

    /**
     * @description 클라이언트가 꺼질 때 호출됩니다.
     * @param {Client} client
     */
    onClientClose(client) {
        this.clients[client.domain] = undefined;
    }
}

module.exports = Server;