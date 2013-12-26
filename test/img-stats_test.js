/*global require:true, process:true, console: true*/
(function( exports ){
  "use strict";

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
    'cat.png is a png': function( test ){
      test.expect(1);
      img_stats.stats( process.cwd() + '/test/cat.png' , function( data ){
        test.equal( data.type , 'PNG' , "Cat should be a png" );
        test.done();
      });
    },
    'cat.png dimensions': function( test ){
      test.expect(2);
      img_stats.stats( process.cwd() + '/test/cat.png' , function( data ){
        test.equal( data.width , 100 , "Width should be 100" );
        test.equal( data.height , 100 , "Height should be 100" );
        test.done();
      });
    },
    'cat.png dimensions Sync': function( test ){
      test.expect(2);
      var data = img_stats.statsSync( process.cwd() + '/test/cat.png' );
      test.equal( data.width , 100 , "Width should be 100" );
      test.equal( data.height , 100 , "Height should be 100" );
      test.done();
    },
    'bear.svg is a SVG': function( test ){
      test.expect(1);
      img_stats.stats( process.cwd() + '/test/bear.svg' , function( data ){
        test.equal( data.type , "SVG" , "Bear should be an SVG" );
        test.done();
      });
    },
    'bear.svg dimensions sync': function( test ){
      test.expect(1);
      var data = img_stats.statsSync( process.cwd() + '/test/bear.svg' );
      test.equal( data.width , "100px" , "Bear width should be 100px" );
      test.done();
    }
  };
}(typeof exports === 'object' && exports || this));
