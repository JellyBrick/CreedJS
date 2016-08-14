module.exports = class Utils {
    static ask(bot, target, messages, callback) {
        if(arguments.length < 5) {
            let result = [];
            bot.sendMessage(target, messages[0]);
            bot.once('text', (msg) => {
                result.push(msg);
                return arguments.callee(bot, target, messages, callback, result);
            });
        } else {
            let result = arguments[4];
            if(result.length === messages.length)  { return; }
            bot.sendMessage(target, messages[result.length]);
            bot.once('text', (msg) => {
                result.push(msg);
                callback(result); // result.length 로 걸러내야함
                return arguments.callee(bot, target, messages, callback, result);
            });
        }
    }
};