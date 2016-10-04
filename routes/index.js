/* jshint esversion: 6 */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {title: 'CreedJS'});
});

module.exports = router;
