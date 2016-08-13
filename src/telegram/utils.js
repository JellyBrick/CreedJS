module.exports = {
  ask: (bot, target, messages, callback) => {  //TODO: Using messages with generator
    if(arguments.length < 6) {
      let result = [];
      bot.sendMessage(target, messages[0]);
      bot.once('text', (msg) => {
        result.push(msg);
        this.ask(bot, target, messages, callback, result);
      });
      return;
    }

    let result = arguments[5];
    if(result.length === messages.length)  { return callback(result); }
    bot.sendMessage(target, messages[result.length]);
    bot.once('text', (msg) => {
      result.push(msg);
      this.ask(bot, target, messages, callback, result);
    });
  }
};