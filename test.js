var fs = require('fs');
var doiuse = require('doiuse/stream');

var sourceFile = 'test/fixtures/backgrounds.css';
var OPTIONS = [];
OPTIONS.browsers = [ '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1' ];

fs
	.createReadStream( sourceFile )
	.pipe( doiuse( OPTIONS.browsers ) )
	.on('data', function( usageInfo ) {
		console.log(usageInfo.message)
	});