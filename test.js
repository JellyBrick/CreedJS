var utils = require('./src/telegram/utils');
var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot('x', {polling: true});

utils.ask(bot, 1, ['What\'s your name?', 'How old are you?', 'Are you sleepy?'], result => {
    console.log(result);
});

/*
[ { message_id: 29,
    from: { id: 1, first_name: '물외한인', username: 'Cloneable' },
    chat: 
     { id: 1,
       first_name: '물외한인',
       username: 'Cloneable',
       type: 'private' },
    date: 1471133320,
    text: 'SeongMin Park' },
  { message_id: 31,
    from: { id: 1, first_name: '물외한인', username: 'Cloneable' },
    chat: 
     { id: 1,
       first_name: '물외한인',
       username: 'Cloneable',
       type: 'private' },
    date: 1471133326,
    text: '16' },
  { message_id: 33,
    from: { id: 1, first_name: '물외한인', username: 'Cloneable' },
    chat: 
     { id: 1,
       first_name: '물외한인',
       username: 'Cloneable',
       type: 'private' },
    date: 1471133335,
    text: 'Of course' } ]
*/