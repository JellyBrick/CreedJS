module.exports = class Utils {
    static ask(bot, target, messages, callback) {
        if(arguments.length < 5) {
            let result = [];
            bot.sendMessage(target, messages[0]);
            bot.once('text', (msg) => {
                result.push(msg);
                return Utils.ask(bot, target, messages, callback, result);
            });
        } else {
            let result = arguments[4];
            if(messages.length -1 == result.length) {
                bot.sendMessage(target, messages[messages.length -1]);
                bot.once('text', msg => {
                    result.push(msg);
                    callback(result);
                });
                return;
            }
            bot.sendMessage(target, messages[result.length]);
            if(result.length === messages.length)  { return; }
            bot.once('text', msg => {
                result.push(msg);
                callback(result); // result.length 로 걸러내야함
                return Utils.ask(bot, target, messages, callback, result);
            });
        }
    }
};