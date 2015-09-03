
var
  Iterator = require('../'),
  Pipeflow = require('pipeflow'),
  Stream = require('pipeflow-stream'),
  expect = require('chai').expect;

describe('iterator plugin', () => {
  
  it('should iterate through elements synchronously', (done) => {
    // arrange
    var app = Pipeflow();
    app.use(Iterator);
    
    app
      .iterate((n, s) => n(s * 10))
      .pipe(assert);
    
    // act
    app.start(Stream.of([1, 2 ,3]));
    
    // assert
    function assert(next, stream) {
      var actual = stream.toArray();
      expect(actual).to.include(10);
      expect(actual).to.include(20);
      expect(actual).to.include(30);
      done();
    }
  });
  
  it('should iterate through elements asynchronously', (done) => {
    // arrange
    var app = Pipeflow();
    app.use(Iterator);
    
    app
      .iterate((n, s) => setTimeout(() => n(s * 10), 0))
      .pipe(assert);
      
    // act
    app.start(Stream.of([1, 2, 3]));
    
    // assert
    function assert(next, stream) {
      var actual = stream.toArray();
      expect(actual).to.include(10);
      expect(actual).to.include(20);
      expect(actual).to.include(30);
      done();
    }
  });
  
});
