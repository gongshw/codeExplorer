/**
 * Created by shigong on 13-12-19.
 */

var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
	res.locals.query = req.query;
	next();
});

module.exports = app;
