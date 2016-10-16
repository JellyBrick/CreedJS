# CreedJS

A useful server and user management web application/telegram bot for SandBox Games.

## License

``` license
The MIT License (MIT)

Copyright (c) 2016 110EIm
```

## API
### Plugin
#### Event
You can handle events by using src/event-emmiter.js
```javascript
var event = require('../src/event-emmitter);
var logger = global.creedjs.logger;

event.on('playerjoin', player => {
    logger.info(`${player.name} joined on ${player.client.name}`);
});

event.on('clientstart', client => {
    logger.info(`Client ${client.name} opened`);
})
```
Event list : `open`, `close` `playerjoin`, `playerquit`, `clientopen`, `clientclose`
