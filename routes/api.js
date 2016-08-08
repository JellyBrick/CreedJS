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
});

router.get('/auth', (req, res) => {
  /* Using JWT with Telegram bot api*/
});

module.exports = router;
