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

    /**
	 * @description 플레이어가 서버에 접속할 때 호출됩니다.
     * @param {Server} server
     * @param {Player} player
     */
    onPlayerJoin(server, player) {

    }

    /**
	 * @description 플레이어가 서버에서 나갈 때 호출됩니다.
     * @param {Server} server
     * @param {Player} player
     */
    onPlayerQuit(server, player) {

    }
};
