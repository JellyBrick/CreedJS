var ServerModel = require('./models/Server');

module.exports = class {

    /**
     * @param {string} ip
     * @param {Document} doc
     */
    constructor(ip, doc) {
        this.domain = domain;
        this.doc = doc;
        this.players = [];
    }

	get domain() {
		return this.domain;
	}

	get doc() {
		return this.doc;
	}

	get players() {
		return this.players;
	}

    /**
     * @description
     * ip로 클라이언트를 가져옵니다.
     * @param {string} ip
     * @param {function} callback
     */
    static getClientByIp(ip, callback) {

    }
};
