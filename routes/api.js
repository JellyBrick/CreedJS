/* jshint esversion: 6 */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('api-description', {title: 'MineJet'});
});

router.get('/status', (req, res) => {
  /* ServerStatus */
});

router.get('/user', (req, res) => {
  /* User */
  /* IDK why I route this.. */
});

router.get('/auth', (req, res) => {
  /* Using JWT with Telegram bot api*/
});

router.get('/login', (req, res) => {
	/* Server login api */
	/* Only using this for the first time he join the 'server' */
	/* Next time, Password will be cached on local*/
	var user = global.mongo.collection('Users').findOne({nickcname: req.body.nickname});
	if(user.password == req.body.password) {
		res.json({result: 'success'});
	} else {
		res.join({result: 'fail'});
	}
});

module.exports = router;
