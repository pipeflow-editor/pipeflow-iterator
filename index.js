
/*
 *  pipeflow
 *  (c) 2015 Mehdi Golchin <golchin@outlook.com>
 *  MIT licensed
 */

var 
  Pipeflow = require('pipeflow'),
  Stream = require('pipeflow-stream'),
  Queue = require('./queue');

module.exports = function (pipeflow) {
  pipeflow.iterate = function (middleware) {
    this.pipe(function (next, stream) {
      var
        self = this,
        result = [];
        
      var queue = Queue(function () {
        next(Stream.of(result));
      });
        
      function collect(stream) {
        result.push(stream);
      }
       
      stream.read(function (er, chunk) {
        middleware.call(self, queue.subscribe(collect), chunk);
      }, queue.end()); 
    });
    return this;
  };
};
