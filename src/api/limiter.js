var RateLimit = require('express-rate-limit');

module.exports.join = new RateLimit({
	windowMs: 10*60*1000, // 10 minutes
    max: 500,
});
