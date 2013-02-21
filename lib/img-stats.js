/*
 * img-stats
 * https://github.com/jlembeck/img-stats
 *
 * Copyright (c) 2013 Jeffrey Lembeck
 * Licensed under the MIT license.
 */

(function(exports) {
  var fs = require( 'fs' );

  var isPng = function( data ){
    var d = data.slice(0,8).toString( 'hex' );
    return d === "89504e470d0a1a0a";
  };

  exports.stats = function( filename , callback ) {
    var ret = {};
    if( !filename ){ throw new Error("Needs a filename"); }
    fs.readFile( filename , function( err , data ){
      if( err ) { throw err; }
      if( isPng( data ) ){
        var i = 8;
        for( l = data.length; i < l; i++ ){
          var d = data.slice(i, i+4).toString( 'hex' );
          if( d === "49484452" ){
            i = i+4;
            break;
          }
        }

        ret.width = parseInt(data.slice( i, i+4 ).toString( 'hex' ) , 16 );
        i = i+4;
        ret.height = parseInt(data.slice( i, i+4 ).toString( 'hex' ) , 16 );
        callback( { width: ret.width, height: ret.height } );
      }
    });
  };

}(typeof exports === 'object' && exports || this));
