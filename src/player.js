/* global creedjs */
const Account = require('./models/Account');

class Player {
	/**
	 * @param {Client} client
	 * @param {Document|Object} data
	 */
    constructor(data, client) {
        this._client = client;
        this.name = data.name;
        this.telegramId = data.telegram.userId;
        this.banned = data.isBanned;
    }

    get client() {
        return this._client;
    }

    set client(val) {
        this._client = val;
    }

    /**
     * @description
     * This method bans player. After that he can't join the client next time.
     * 이 메소드는 플레이어를 밴합니다. 그 뒤로는 해당 플레이어는 클라이언트에 접속하지 못합니다.
     */
    setBanned() {
        return new Promise((resolve, reject) => {
            Account.findOneAndUpdate({
                nickname: this.name
            }, {
                $set: {
                    isBanned: true
                }
            }).catch(err => {
                creedjs.server.logger.error(err);
                reject(new Error('server.dberror'));
            });
        });
    }
	
    /**
     * @description
     * Get player instance by nickname
     * 닉네임으로 플레이어를 가져옵니다.
     * @param {string} name
     * @param {Client} client
     */
    static getByNickName(name, client) {
        return new Promise((resolve, reject) => {
            Account.findOne({nickname: name}).then(data => {
                resolve(new Player(data, client));
            }).catch(err => {
                creedjs.server.logger.error(err);
                reject(new Error('server.dberror'));
            });
        });
    }

    /**
     * @description
     * Get player instance by telegram id.
     * 텔레그램 아이디로 플레이어를 가져옵니다.
     * @param {number} id telegram id
     * @param {Client} client
     */
    static getByTelegramId(id, client) {
        return new Promise((reject, resolve) => {
            Account.findByTelegramId(id).then(data => {
                resolve(new Player(data, client));
            }).catch(err => {
                creedjs.server.logger.error(err);
                reject(new Error('server.dberror'));
            });
        });
    }
}

module.exports = Player;