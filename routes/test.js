/* jshint esversion: 6 */
var User = require( '../src/models/User');
var Server = require('../src/models/Server');
var ServerStatus = require('../src/models/ServerStatus');

var router = require('express').Router();

router.get('/', (req, res) => {
  var mohi = new User({
   telegram: {
 		userId: 000000000
 	},
 	password: 'password',
 	registerDate: new Date(),
 	isAuthenticated: true,
 	nickname: '110eim'
  });
  
  var testStatus = new ServerStatus({
    date: new Date(),
    ip: '127.0.0.1',
    users: 30
  });
  
  var testServer = new Server({
    admin: User.findOne({userId: 00000000})._id,
    name: 'Test Server',
    domain: 'domain.com',
    visitors: 405
  });

  mohi.save(err => {
    if(err) throw err;

    console.log('User saved successfully');
    res.json({success: true});
  });
  
  testStatus.save(err => {
   if(err) throw err;
   
   console.log('ServerStatus saved successfully');
   res.join({success: true});
  });
  
  testServer.save(err => {
    if(err) throw err;
    
    console.log('Server saved successfully');
    res.join({success: true});
  });
});


module.exports = router;
