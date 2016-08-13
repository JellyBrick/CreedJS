/* jshint esversion: 6 */
var bot = new (require('node-telegram-bot-api'))(global.config.botToken, {polling: true});
var utils = require('./utils');
var User = require('../models/User');

module.exports = (mongo) => {
  bot.on('text', msg => {
    /* handling text messages */
    if(msg.entities[0].type == 'bot_command') {
      var split = msg.text.toLowerCase().split(' ');
      var command = split[0];
      switch(command) {
        case '/register':
          //동일 id의 유저 존재 유무 처리
          utils.ask(bot, msg.from.id, ["Your mc:pe nickname :", "Your password : "], result => {
            
          });
          break;
        case '/addserver':
          utils.ask(bot, msg.from.id, ["Name of server : "], result => {
            
          });
          break;
      }
    }
  });
};
