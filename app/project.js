/**
 * Created by shigong on 13-12-19.
 */

var fs = require('fs');
var exec = require('child_process').exec;
var file_cmd = 'file -b';
var text_reg = /.*text.*/g;

exports.readPath = function (file_path, file_callback, dir_callback) {
	fs.stat(file_path, function (err, stats) {
		if (!err) {
			if (stats.isFile()) {
				/* path is file. show a code view*/

				file_callback(stats);

			} else if (stats.isDirectory()) {
				/* show all files */

				dir_callback(stats);

			}
		} else {
		}
	});
}

exports.fileType = function (file, callback) {
	exec(file_cmd + ' ' + file, function (error, stdout, stderr) {
		if (!error) {
			var type = stdout;
			var isText = type.match(text_reg) != null;
			var fileSize = fs.statSync(file)['size'];
			callback({isText: isText, type: type, size: fileSize});
		} else {
			callback(stderr);
		}
	})
}
