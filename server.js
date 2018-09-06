const express = require("express");
const app = express();

const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');

// ############################################
let key;
let cert;

try{
  key = fs.readFileSync('key.pem');
}catch(err){
  key == null
}

try{
  cert = fs.readFileSync('cert.pem');
}catch(err){
  cert  == null
}

function checkSSL(key, cert){
  var server;
  if(key != null && cert != null){
    const serverConfig = {
      key: key,
      cert: cert
    };
    server = https.createServer(serverConfig,app);
    console.log("Starting https Server");
  }else{
    server = http.createServer(app);
    console.log("Starting http Server");
  }

  return server;
}

const server = checkSSL(key, cert);
// ############################################


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
server.listen(port, function() {
  console.log("Listening on " + port);
});
