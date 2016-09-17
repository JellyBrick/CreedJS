/* global minejet */

module.exports = class {
	constructor(bot, id) {
		this.bot = bot;
		this.id = id;
	}

	/**
     * @description
     * target에게 메세지를 보내고 결과를 콜백으로 전달합니다.
     * @param {number} target
     * @param {string} message
     * @param {function} callback
     */
    ask(target, message, callback) {
        this.bot.sendMessage(target, message);
        this.bot.on('text', msg => {
            callback(msg);
        });
    }

	/**
     * @description
     * 수락을 했는지 체크합니다.
     * @param {string} res
     */
    isAcceptance(res) {
        if (res == 'y' || res == 'yes') {
            return true;
        }
    }
}
