var Server = require('./models/Client');

module.exports = class Client {

    /**
     * @param {string} domain
     * @param {string} jwt
     * @param {Document} doc
     */
    constructor(domain, jwt,  doc) {
        this.domain = domain;
        this.jwt = jwt;
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
