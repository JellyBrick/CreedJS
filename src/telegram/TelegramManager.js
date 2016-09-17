/*global minejet */
const async = require('async');

var RegisterQuery = require('./query/RegisterQuery');

module.exports = class {
    constructor(bot) {
        this.askIds = [];
        this.bot = minejet.server.getTelegramBot();
    }

    /**
     * @description
     * 텔레그램 명령어들을 처리합니다.
     * 이미 명령어가 실행중일 경우를 예외처리합니다.
     * @param {string} msg
     */
    handleTelegramMessages(msg) {
        if (msg.entities && msg.entities[0].type == 'bot_command') {
            console.log(this.askIds);
            if (this.askIds.indexOf(msg.from.id) !== -1) {
                this.bot.sendMessage(msg.from.id, 'First, please complete the previous answer');
                return;
            }
            this.askIds.push(msg.from.id);
            let split = msg.text.toLowerCase().split(' ');
            let command = split[0];
            let id = msg.from.id;
            switch (command) {

                /**
                 * @description
                 * 회원가입 명령어입니다.
                 */
                case '/register':
                    this.handleTelegramRegistrationMessage(id);
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
    handleTelegramRegistrationMessage(id) {
        let query = new RegisterQuery(this.bot, id);

        //Function.apply 우회용
        let _ = function(name) {
            return function(...args) {
                query[name](...args);
            };
        };

        async.waterfall([
            _('askNickName'),
            _('checkDuplicatedNickName'),
            _('askPassword'),
            _('askEmailAddress'),
            _('askRegisterIntention')
        ], () => {
            this.askIds.splice(this.askIds.indexOf(id));
            console.log('askIds.pull');
            return _('checkFinalIntention');
        });
    }
};
