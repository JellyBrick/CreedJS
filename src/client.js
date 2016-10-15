const Client = require('./models/client');

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

    get players() {
        return this.players;
    }

    /**
     * @description
     * ip로 클라이언트를 가져옵니다.
     * @param {string} ip
     * @return Promise
     */
    static getByIp(ip) {

    }

    /**
     * @description
     * This generates JWT for Client authentication.
     * 이 메소드는 클라이언트 인증을 위한 JWT를 생성합니다.
     */
    static genKey() {

    }
};
