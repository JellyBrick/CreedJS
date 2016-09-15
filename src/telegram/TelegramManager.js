/*global minejet */

module.exports = class {
    constructor() {
        this.askIds = [];
        this.bot = minejet.server.getTelegramBot();
    }

    /**
     * @description
     * target에게 메세지를 보내고 결과를 콜백으로 전달합니다.
     * @param {number} target
     * @param {string} message
     * @param {function} callback
     */
    ask(target, message, callback) {
        if (this.askIds[target]) {
            return;
        }
        this.askIds.push(target);
        this.bot.on('text', msg => {
            callback(msg);
            this.askIds.splice(this.askIds.indexOf(target));
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

    /**
     * @description
     */
    handleTelegramMessages(msg) {
        if (msg.entities && msg.entities[0].type == 'bot_command') {
            let split = msg.text.toLowerCase().split(' ');
            let command = split[0];
            let id = msg.from.id;
            switch (command) {

                /**
                 * @description
                 * 회원가입 명령어입니다.
                 */
                case '/register':
                    this.handleTelegramRegistrationMessage(msg)
                    break;

                    /**
                     * @description
                     * 비밀번호를 변경합니다
                     */
                case '/changepassword':
                    break;

                    /**
                     * @description
                     * 새 서버를 등록합니다.
                     */
                case '/newserver':
                    break;
            }
        }
    }

    /**
     * @description
     * 회원가입 명령어를 처리합니다.
     */
    handleTelegramRegistrationMessage(msg, id) {
        let req = new RegisterRequest(this.bot, id);

        async.waterfall([
            req.askNickName,
            req.checkOverlappedNickName,
            req.askPassword,
            req.askEmailAddress,
            req.askRegisterIntention
        ], req.checkFinalIntention);
    }
};
