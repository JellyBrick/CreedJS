module.exports = {
    ask: function(bot, target, messages, callback) {
        if(arguments.length < 5) {
            let result = [];
            bot.sendMessage(target, messages[0]);
            bot.once('text', (msg) => {
                result.push(msg);
                return arguments.callee(bot, target, messages, callback, result);
            });
        } else {
            let result = arguments[4];
            if(result.length === messages.length)  { return callback(result); }
            bot.sendMessage(target, messages[result.length]);
            bot.once('text', (msg) => {
                result.push(msg);
                return arguments.callee(bot, target, messages, callback, result);
            });
        }
        //TODO: 결과 한 개가 나올 때 마다 호출하는 콜백 비스무리한게 필요할 듯
        }
};