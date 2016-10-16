var RateLimit = require('express-rate-limit');

module.exports.join = new RateLimit({
    windowMs: 10*60*1000, // 10 minutes
    max: 500,
});
module.exports.auth = new RateLimit({
    windowsMs: 10*60*1000,
    max: 1000
});