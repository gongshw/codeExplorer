/**
 * Created by shigong on 13-12-19.
 */
var exec = require('child_process').exec;

var CMD_GTAGS = 'gtags';
var CMD_GLOBAL_F = 'global -f';
var CMD_GLOBAL = 'global -x';

/* exec gtags in given path*/
exports.gtags = function (path, callback) {
	exec(CMD_GTAGS, {cwd: path}, function (error, stdout, stderr) {
		callback(error, stdout, stderr);
	});
}

function resolveGlobalOut(out) {
	var lines = out.split(/\n/g);
	var symbols = [];
	for (var index in lines) {
		if (lines[index]) {
			var symbol = {}, token = lines[index].split(/\s+/);
			symbol['name'] = token[0];
			symbol['line'] = token[1];
			symbol['file'] = token[2];
			symbol['define'] = token.slice(3).join(' ');
			symbols[index] = symbol;
		}
	}
	return symbols;
}

/* get all symbol defines */
/* assume that filename not contain whitespace*/
exports.getSymbolDefines = function (root_path, file, callback) {
	exec(CMD_GLOBAL_F + ' "' + file + '"', {cwd: root_path}, function (error, stdout, stderr) {
		var symbols = resolveGlobalOut(stdout);

		callback(error, symbols);

	});
}

exports.searchSymbol = function (root_path, symbol, callback) {
	exec(CMD_GLOBAL + ' "' + symbol + '"', {cwd: root_path}, function (error, stdout, stderr) {

		callback(resolveGlobalOut(stdout));

	});
}
