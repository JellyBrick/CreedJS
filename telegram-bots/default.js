/* global creedjs */
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram(creedjs.botTokens.default);

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong');
    }

    get routes() {
        return {
            'ping': 'pingHandler'
        };
    }
}

tg.router
    .when(
        new TextCommand('ping', 'ping'),
        new PingController()
    );
