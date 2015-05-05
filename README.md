grunt-doiuse
============

> Grunt plugin to run [DOIUSE](https://github.com/anandthakker/doiuse)

[![NPM](https://nodei.co/npm/grunt-doiuse.png)](https://nodei.co/npm/grunt-doiuse/)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide,
as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar
with that process, you may install this plugin with this command:

```shell
npm install grunt-doiuse --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-doiuse');
```

## The "doiuse" task

### Overview
In your project's Gruntfile, add a section named `doiuse` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	doiuse: {
		options: {
			"browsers": ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
		},
		files: {
			'purged.css': 'bigFile.css',
		},
	},
})
```

### Options

#### options.browsers
Type: `array`
Default value: `['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']`

Browser definition to check against.

**Browser names** can be any of the following (case insensitive):

* `Android` for old Android stock browser.
* `BlackBerry` or `bb` for Blackberry browser.
* `Chrome` for Google Chrome.
* `Firefox` or `ff` for Mozilla Firefox.
* `Explorer` or `ie` or `InternetExplorer` for Internet Explorer.
* `iOS` or `ios_saf` for iOS Safari.
* `Opera` for Opera.
* `Safari` for desktop Safari.
* `OperaMobile` or `op_mob` for Opera Mobile.
* `OperaMini` or `op_mini` for Opera Mini.
* `ChromeAndroid` or `and_chr` for Chrome for Android
  (mostly same as common `Chrome`).
* `FirefoxAndroid` or `and_ff` for Firefox for Android.
* `ExplorerMobile` or `ie_mob` for Internet Explorer Mobile.

**Browser versions** can be specified in the following three ways:

* Direct selection - `[9, 10, 11]` or `'11'`
* Versions newer than - `'> 9'` or `'>= 8'`
* Versions with Global Usage greater than - `'> 10%'`

### Usage Examples

#### Default Options

```js
doiuse: {
	files: {
		'purged.css': 'bigFile.css',
	},
},
```

#### Custom Options

```js
doiuse: {
	all: {
		files: [{
			src: [
				'backgrounds.css',
				'counters.css',
			],
		}],
	},
},
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using the [Grunt](http://gruntjs.com/) task already set up.

## Release History
0.0.1 - alpha test

## License
Copyright (c) 2015 Dominik Wilkowski. Licensed under the [GNU GPL](https://github.com/dominikwilkowski/grunt-doiuse/blob/master/LICENSE).