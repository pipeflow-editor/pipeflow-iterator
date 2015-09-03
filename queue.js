/*
 *  pipeflow
 *  (c) 2015 Mehdi Golchin <golchin@outlook.com>
 *  MIT licensed
 */

function Queue(callback) {
  var
    count = 0,
    ended = false;

  function done() {
    if (count === 0 && ended) {
      callback();
    }
  }

  this.subscribe = function (callback) {
    if (ended) {
      return;
    }
    count++;
    return function () {
      callback.apply(this, arguments);
      count--;
      done();
    };
  };

  this.end = function () {
    return function () {
      ended = true;
      done();
    };
  };
}

module.exports = function (callback) {
  return new Queue(callback);
};
