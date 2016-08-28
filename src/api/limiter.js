var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');

module.exports.join = new RateLimit({
    store: new RedisStore({
        client: global.redisClient,
    }),
	windowMs: 5*6*1000, //5 minutes
    max: 5000,
	delayAfter: 800,
    delayMs: 500
});
