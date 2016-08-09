/* jshint esversion: 6 */
var User = require( '../src/models/User');
var Server = require('../src/models/Server');
var ServerStatus = require('../src/models/ServerStatus');

var router = require('express').Router();

router.get('/', (req, res) => {
 var mohi = new User({
  telegram: {
 		userId: 00000000
 	},
 	password: 'password',
 	registerDate: new Data(),
 	isAuthenticated: true,
 	nickname: '110eim'
  });

  //Server
  //ServerStatus

  mohi.save(err => {
    if(err) throw err;

    console.log('User saved successfully');
    res.json({result: 'success'});
  });
});

module.exports = router;
