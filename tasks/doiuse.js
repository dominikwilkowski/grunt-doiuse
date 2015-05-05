/*
 * grunt-font
 * https://github.com/dominikwilkowski/grunt-doiuse
 *
 * Copyright (c) 2015 Dominik Wilkowski
 * Licensed under the GPLv2 license.
 */

'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var fs = require('fs');
var doiuse = require('doiuse/stream');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt plugin
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {

	grunt.registerMultiTask('doiuse', 'Check your css against the CanIUse database', function() {


		//default options
		var OPTIONS = this.options({
			browsers: this.options.browsers || ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] //define a browser matrix
		});


		this.files.forEach(function( files ) {


			//iterate over all files
			files.src.forEach(function(sourceFile) {

				var stats = fs.lstatSync( sourceFile );

				if( !stats.isFile() ) {
					grunt.log.warn( 'Source file "' + sourceFile + '" not found.' );
					return false;
				}


				try {

					grunt.log.oklns( 'Checking "' + sourceFile + '"' );


					//run DoIUse
					fs
						.createReadStream( sourceFile )
						.pipe( doiuse( OPTIONS.browsers ) )
						.on('data', function( usageInfo ) {
							grunt.log.oklns("message");
							console.log(usageInfo);
							console.log(usageInfo.message);
							done();
						});

				}
				catch( e ) {
					var err = new Error( 'DoIUse failed.' );

					if( e.msg ) {
						err.message += ', ' + e.msg + '.';
					}

					err.origError = e;
					grunt.log.warn( 'Scanning source file "' + sourceFile + '" failed.' );
					grunt.fail.warn( err );
				}

			});
		});


	});

};