/* jshint esversion: 6 */
var bot = new require('node-telegram-bot-api')(global.config.botToken, {polling: true});

module.exports = () => {
  bot.on('text', msg => {
    /* handling text messages */
    if(msg.entities[0].type == 'bot_command') {
      var split = msg.text.toLowerCase().split(' ');
      var command = split[0];
      switch(command) {
        case '/register':
        case '/가입':

        case '/addserver':
        case '/서버추가':

      }
    }
  });
};
