/*global minejet */
const async = require('async');

var RegisterQuery = require('./query/RegisterQuery');

module.exports = class {
    constructor(bot) {
        this.askIds = [];
        this.bot = minejet.server.getTelegramBot();
    }

    getIds() {
        return this.askIds;
    }

    /**
     * @description
     * 텔레그램 명령어들을 처리합니다.
     * 이미 명령어가 실행중일 경우를 예외처리합니다.
     * @param {string} msg
     */
    handleTelegramMessages(msg) {
        console.log(this.askIds);
        if (msg.entities && msg.entities[0].type == 'bot_command') {
            let id = msg.from.id;

            let idIndex = this.askIds.indexOf(id);
            if(!this.isAsking(id)) {
                this.askIds.push(id);
            }

            let split = msg.text.toLowerCase().split(' ');
            let command = split[0];
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
                case '/addserver':
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
        var _ = function(name) {
            return function(...args) {
                    if(query.isFailed) {
                        return;
                    }
                    query[name](...args);
                }
            };
        async.waterfall([
            _('askNickName'),
            _('askPassword'),
            _('askRegisterIntention')
        ], function(err, result) {
            let index = minejet.telegramManager.getIds().indexOf(id);
            minejet.telegramManager.getIds().splice(index);
            console.log('askIds.pull');
            return _('checkFinalIntention')(err, result);
        });
    }

    /**
     * @description
     * 해당 유저(id)가 커맨드를 사용하고 있는지를 불린형으로 반환합니다.
     * @param {number} id
     * @return {boolean}
     */
    isAsking(id) {
        return minejet.telegramManager.getIds().indexOf(id) !== -1
    }
};
