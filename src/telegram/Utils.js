/*global bot */

module.exports = class {
    constructor() {
        this.askIds = [];
    }
    
    /**
     * @description
     * target에게 메세지를 보내고 결과를 콜백으로 전달합니다.
     * @param {number} target
     * @param {string} message
     * @param {function} callback
     */
    ask(target, message, callback) {
        if(this.askIds[target]) {
            return;
        }
        this.askIds.push(target);
        bot.on('text', msg => {
            callback(msg);
            this.askIds.splice(this.askIds.indexOf(target));
        });
    }
    
    /**
     * @description
     * 옳은 선택을 했는지 체크합니다.
     * @param {string} res
     */
    isYes(res) {
        if(res == 'y' || res == 'yes') {
            return true;
        }
    }
};