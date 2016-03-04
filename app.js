var config = require('./config.js')
var logger = require('./modules/logger.js')

var a = 'APP'
var s = 'SKT'
var l = 'LST'
var e = 'EXR'

logger.log(a, "user packages initialised")

var spawn = require('child_process').spawn
var path = require('path')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

logger.log(a, "required packages initialised")
logger.success(a, "server started in mode: " + config.environment)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static('./static'))

logger.log(e, "static files being served")

io.on('connection', function(socket){
  socket.on('bat', function(msg, callback){
    logger.log(s, "received string: " + msg)
    logger.log(s, "someone is logging in with: " + msg[1])
    var found = false;
    var user = "";
    for (var i = 0; i < config.users.length; i++) {
      if (config.users[i].password == msg[1]) {
        found = true;
        user = config.users[i].user
        break;
      }
    }
    if (found) {
      var sourceData = [];
      logger.log(s, user + " is executing: " + String(config.batFiles[msg[0]].name))
      ls    = spawn('cmd.exe', ['/c', String(path.resolve(config.batFiles[msg[0]].path))]);
      ls.stdout.on('data', function (data) {
        try {
          data = String(data).split("\r\n")
          data.pop()
          data = data.join("<br />")
        } catch (err) {
          var error = null
        }
        logger.log(s, 'stdout: ' + JSON.stringify(String(data)))
        sourceData.push(data)
      });
      ls.stderr.on('data', function (data) {
        if (data) { logger.error(s, 'stderr: ' + data); callback(false) }
      });
      ls.on('exit', function (code) {
        if (code == 0) {
          logger.success(s, 'child process exited with code ' + code)
          callback(JSON.stringify(String(sourceData.join("<br />"))))
        }
        else logger.error(s, 'child process exited with code ' + code)
      });
    } else {
      callback("invalid")
    }
  });
  socket.on('files', function(msg, callback) {
    var batFileList = [];
    for (i=0; i<config.batFiles.length; i++) {
      batFileList.push(config.batFiles[i].name)
    }
    callback(batFileList)
  })
});

http.listen(config.port, function(){
  logger.success(l, 'listening on *:' + config.port);
});
