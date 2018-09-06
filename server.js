const express = require("express");
const app = express();

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');

const WebSocket = require('ws');
const wss = new WebSocket('ws://192.99.236.78:8089');

wss.on('connect', function(){
  console.log('connected to server');
});


app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
   next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/ping", function(req, res) {
  res.json({ message: "pong" });
});

app.use(express.static(__dirname + "/public"));

let port = process.env.PORT || 5051;
app.listen(port, function() {
  console.log("Listening on " + port);
});
