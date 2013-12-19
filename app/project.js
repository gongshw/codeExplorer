/**
 * Created by shigong on 13-12-19.
 */

var fs = require('fs');

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
			res.send('404');
		}
	});
}
