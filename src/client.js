/* global creedjs */
const Client = require('./models/client');
const Account = require('./models/account');
const jwt = require('jsonwebtoken');

module.exports = class {

    /**
     * @param {string} ip
     * @param {string} token
     * @param {Document|Object} data
     */
    constructor(ip, data) {
        this.admin = data.admin;
        this.today = new Date();
        this.ip = ip;
        this.name = data.name;
        Account.findOne({_id: data.admin}).then(data => {
            this.admin = data;
        });
        this.token = data.token;
        this._players = [];
        this.visitors = data.visitors;
    }

    get players() {
        return this._players.slice(0);
    }

    /**
     * @description
     * Call when player join this client.
     * This message is not
     * 플레이어가 이 클라이언트에 접속할 때 호출합니다.
     * 이 메소드는 player의 상태를 바꿉니다.
     */
    playerJoin(player) {
        this._players.push(player);
        player.client = this;
        if(this.today.getDay() !== new Date().getDay()) {
            this.visitors.today = 0;
            this.today = new Date();
        }
        this.visitors.today++;
        this.visitors.total++;
    }

    /**
     * @description
     * Call when player quit this client
     * 플레이어가 이 클라이언트에서 나갈 때 호출됩니다.
     */
    playerQuit(player) {
        this._players.slice(this._player.indexOf(player));
        if(this.today.getDay() !== new Date().getDay()) {
            this.visitors.today = 0;
            this.today = new Date();
        }
    }

    save() {
        return new Promise((resolve, reject) => {
            Client.findOneAndUpdate({
                token: this.token
            }, {
                $set: this.createSaveData()
            }).then(() => resolve())
            .catch(err => {
                creedjs.server.logger.error(err);
                reject(new Error('server.dberror'));
            });
        });
        
    }

    createSaveData() {
        let data = {};
        Object.keys(this).forEach(v => {
            data[v] = this[v];
        });
        return data;
    }

    /**
     * @description
     * Get Client instance by ip
     * ip로 클라이언트를 가져옵니다.
     * @param {string} ip
     * @return {Promise}
     */
    static getByIp(lastIp) {
        return new Promise((resolve, reject) => {
            Client.findOne({lastIp}).then(data => {
                for(let ct in creedjs.server.clients) {
                    if(ct.name === data.name) {
                        resolve(ct);
                    }
                }
                resolve(data);
            }).catch(err => {
                if(err) {
                    creedjs.server.logger.error(err);
                    reject(new Error('server.dberror'));
                }
            });
        });
    }

    /**
     * @description
     * Get Client instance by name
     * 이름으로 클라이언트를 가져옵니다.
     */
    static getByName(name) {
        return new Promise((resolve, reject) => {
            Client
            .findOne({name})
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                creedjs.server.logger.error(err);
                reject(new Error('server.dberror'));
            });
        });
    }

    /**
     * @description
     * This generates JWT for Client authentication.
     * 이 메소드는 클라이언트 인증을 위한 JWT를 생성합니다.
     */
    static generateToken(client) {
        let token = jwt.sign(client, creedjs.config.secret, {
            expiresIn: '30 days'
        });
        return token;
    }
};
