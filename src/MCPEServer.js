module.exports = class {

    /**
     * @param {string} ip
     * @param {Document} doc
     */
    constructor(ip, doc) {
        this.ip = ip;
        this.doc = doc;
        this.players = [];
    }

	get ip() {
		return this.ip;
	}

	get doc() {
		return this.doc;
	}

	get players() {
		return this.players;
	}
};
