/**
 * Created by shigong on 13-12-19.
 */

var exec = require('child_process').exec;
var highlight_cmd = 'pygmentize -f html -Plinenos=table -Plinespans=l -Plineanchors=l ';

module.exports = function (file_path, callback) {
	exec(highlight_cmd + '"' + file_path + '"', {
		maxBuffer: 1024 * 1024
	}, function (error, stdout, stderr) {

		callback(error, stdout, stderr);

	});
}
