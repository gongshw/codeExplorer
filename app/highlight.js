/**
 * Created by shigong on 13-12-19.
 */

var exec = require('child_process').exec;
var highlight_cmd = 'pygmentize -f html -Plinenos=table -Plinespans=l -Plineanchors=l ';
var highlight_text_cmd = 'pygmentize -f html -l text -Plinenos=table -Plinespans=l -Plineanchors=l ';
var maxBuffer = 1024 * 1024;

module.exports = function (file_path, callback) {
	exec(highlight_cmd + '"' + file_path + '"', {
		maxBuffer: maxBuffer
	}, function (error, stdout, stderr) {

		if (!error) {
			callback(error, stdout, stderr);
		} else {

			exec(highlight_text_cmd + '"' + file_path + '"', {
				maxBuffer: maxBuffer
			}, function (error, stdout, stderr) {
				callback(error, stdout, stderr);
			});
		}

	});
}
