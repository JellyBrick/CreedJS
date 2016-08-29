moudle.exports = class Server {
    constructor() {
        this.init();
    }

    init() {
        /**
         * @description Every servers using minejet is stored in this.
         * @type {MCPEServer}
         */
        this.servers = {};
        /**
         * @description if someone's account information is changed, his nickname is stored in this.
         * @type {Object}
         */
        this.changedUsers = {}
    }

    get servers() {
        return this.server;
    }

    get changedUsers() {
        return this.changedUsers;
    }

    /**
	 * @description 플레이어가 서버에 접속할 때 호출됩니다.
     * @param {Server} server
     * @param {Player} player
     */
    onPlayerJoin(server, player) {
        server.players.push(player);
    }

    /**
	 * @description 플레이어가 서버에서 나갈 때 호출됩니다.
     * @param {Server} server
     * @param {Player} player
     */
    onPlayerQuit(server, player) {
        server.players.splice(server.players.indexOf(player), 1);
    }

    /**
	 * @description 서버가 켜질 때 호출됩니다.
     * @param {Server} server
     */
    onServerOpen(server) {
        this.servers.push(server);
    }

    /**
     * @description 서버가 꺼질 때 호출됩니다.
     * @param {Server} server
     */
    onServerClose(server) {
        this.server.splice(this.server.indexOf(server), 1);
    }
};
