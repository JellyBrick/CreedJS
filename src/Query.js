module.exports = class {
	static findAccountByNickNameCached(nickname, callback) {
		global.redis.get(nickname, (err, reply) => {
			if(err) {
				callback(null);
			} else if(reply) {
				callback(JSON.parse(reply));
			}
		});
	}
}
