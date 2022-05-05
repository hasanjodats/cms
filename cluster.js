// COMMENT: Require npm & core module
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

// COMMENT: Check if cluster is master
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
    require("./index.js");
}