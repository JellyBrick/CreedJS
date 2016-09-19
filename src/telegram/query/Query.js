/* global minejet */

module.exports = class {
	constructor(bot, id) {
		this.bot = bot;
		this.id = id;
		this.isFailed = false; // 명령어 실패 여부. 명령어 처리 도중에 유저가 다른 명령어를 사용할 경우 이 변수가 true가 됨.
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
        this.bot.once('text', msg => {
			if(msg.from.id !== target) { // 메세지 보낸 상대가 다른 사람이면 다시 대기탐
				return this.ask(target, message, callback);
			}
			if(msg.entities && msg.entities[0].type == 'bot_command') { // 유저가 다른 커맨드를 사용했다면
				this.isFailed = true;
			}
            callback(msg.text);
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
