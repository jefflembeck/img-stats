/*global require:true, process:true, console: true*/
var img_stats = require('../lib/img-stats.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['img-stats'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function( test ) {
    test.expect(1);
    // tests here
    test.throws( function(){
      img_stats.stats();
    }, Error , 'Needs a filename.');
    test.done();
  },
  'cat.png dimensions': function( test ){
    test.expect(2);
    img_stats.stats( process.cwd() + '/test/cat.png' , function( data ){
      test.equal( data.width , 100 , "Width should be 100" );
      test.equal( data.height , 100 , "Height should be 100" );
      test.done();
    });
  },
  'file is not png' : function( test ){
    test.expect(1);
    test.throws( function(){
      img_stats.stats( process.cwd() + '/test/starfish.jpg' , function( data ){
      });
    }, Error , "File must be in .png format." );
    test.done();
  }
};
