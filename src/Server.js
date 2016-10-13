/* global config */
var serverInstance = null;

module.exports = class Server {
    constructor() {
        if (!serverInstance) {
            serverInstance = this;
        }
        this._init();
    }

    _init() {
        /**
         * @description
         * 모든 클라이언트(마크 서버) 객체가 여기에 담깁니다.
         * Every clients(MCPE Server) using minejet is stored in this.
         * @type {Client}
         */
        this.clients = [];
    }

    messageHandler(msg) {

    }

    getClients() {
        return this.clients;
    }

    /**
     * @description
     * 플레이어가 클라이언트에 접속할 때 호출됩니다.
     * @param {Client} client
     * @param {Player} player
     */
    onPlayerJoin(client, player) {
        client.players.push(player);
    }

    /**
     * @description 플레이어가 클라이언트에서 나갈 때 호출됩니다.
     * @param {Client} client
     * @param {Player} player
     */
    onPlayerQuit(client, player) {
        client.players.splice(server.players.indexOf(player), 1);
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
        this.clients[client.domain] = null;
    }
};
