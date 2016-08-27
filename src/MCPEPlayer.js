module.exports = class {

	/**
	 * @param {Server} server
	 * @param {Document} doc
	 */
	constructor(server, doc) {
		this.server = server;
		this.doc = doc;
	}

	get doc() {
		return this.doc;
	}

	get server() {
		return this.server;
	}
};
