var yargs = require('yargs');
var fs = require('fs');

// merge with default parameters
var args = Object.assign({
	'prod': false,
	'metronic': false,
	'keen': false,
	'default': false,
	'angular': false
}, yargs.argv);

var theme = 'metronic';
var package = 'default';
['metronic', 'keen'].forEach(function (t) {
	if (args[t]) {
		theme = t;
	}
	['default', 'angular'].forEach(function (p) {
		if (args[p]) {
			package = p;
		}
	});
});


var confPath = './../themes/' + theme + '/' + package + '.conf.json';
console.log('Using config ' + confPath);
module.exports = require(confPath);
