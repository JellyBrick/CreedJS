/* jshint esversion: 6 */
var bot = new require('node-telegram-bot-api')(global.config.botToken, {polling: true});

module.exports = () => {
  bot.on('text', msg => {
    /* handling text messages */
  });
};
