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
var Fs = require('fs');
var Promise = require('promise');
var Doiuse = require('doiuse/stream');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt plugin
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function GruntTask(grunt) {

	grunt.registerMultiTask('doiuse', 'Check your css against the CanIUse database', function GruntMultiTask() {

		var done = this.async();
		var allFiles = [];

		//default options
		var OPTIONS = this.options({
			browsers: this.options.browsers || ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] //define a browser matrix
		});


		this.files.forEach(function TargetLoop( files ) {

			//run DoIUse
			var promises = files.src.map(function ListPromises(file) {

				allFiles.push( file );

				return new Promise(function NewPromise(resolve, reject) {

					var stats = Fs.lstatSync( file );
					var usageInfos = [];

					if( !stats.isFile() ) {
						grunt.log.warn( 'Source file "' + file + '" not found.' );
						return false;
					}

					Fs
						.createReadStream( file )
						.pipe( new Doiuse( OPTIONS.browsers ) )
						.on('data', function GetData(info) { usageInfos.push(info); })
						.on('end', function End() { resolve(usageInfos); })
						.on('error', reject);

				});
			});


			Promise
				.all(promises)
				.then(function(usageInfos) {

					var i = 0;

					allFiles.forEach(function MessageLoop( file ) {

						console.log(file); //headline

						usageInfos[i].forEach(function UsageLoop( usage ) {
							console.log( usage.message.replace( '<streaming css input>', '') );
						});

						i++;
					});

					done(true);
				}, function(err) {
					console.error("(At least) one of them failed", err);

					done(true);
				});

		});


	});

};