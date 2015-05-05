/*
 * grunt-doiuse
 * https://github.com/dominikwilkowski/grunt-doiuse
 *
 * Copyright (c) 2014 Dominik Wilkowski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {
	require( 'load-grunt-tasks' )( grunt ); // load all npm grunt tasks

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
				reporter: require( 'jshint-stylish' ),
			},
		},


		// Configuration to be run (and then tested).
		doiuse: {
			default_options: {
				options: {
				},
				files: [{
					src: [
						'./test/fixtures/backgrounds.css',
						'./test/fixtures/counters.css',
					],
				}],
			},
			custom_options: {
				options: {
					'browsers': 'ie >= 6',
				},
				files: [{
					src: [
						'./test/fixtures/backgrounds.css',
						'./test/fixtures/counters.css',
					],
				}],
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['doiuse', /*'nodeunit'*/]);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
