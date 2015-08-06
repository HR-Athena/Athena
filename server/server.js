var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static(__dirname + "/../client"));

module.exports = app;
