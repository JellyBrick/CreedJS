/* global creedjs */
const event = creedjs.event;
const logger = creedjs.server.logger;

event.on('open', () => {
    logger.info('Server is opened!');
});

event.on('close', () => {
    logger.info('Server is closed!');
});

event.on('playerjoin', player => {
    logger.info(`${player.nickname} joined client(${player.client.name})`);
});

event.on('playerquit', player => {
    logger.info(`${player.nickname} quit client(${player.client.name})`);
});

module.exports = {
    name: 'ExamplePlugin',
    author: 'Example',
    version: '1.0',
    init() {
        logger.info('Hello, world!');
    }
};