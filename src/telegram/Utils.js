/*global bot */

module.exports = class {
    constructor() {
        this.askIds = [];
    }
    
    /**
     * @description
     * target에게 메세지를 보내고 응답 결과를 콜백으로 전달합니다.
     * @param {number} target, {string} message, {function} callback
     * 
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
};