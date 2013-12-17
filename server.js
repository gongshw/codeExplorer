var express = require('express');
var app = express();
var exec = require('child_process').exec;
var fs = require('fs');

var highlight_cmd = 'pygmentize -f html -Plinenos=table -Plinespans=l -Plineanchors=l ';
var highlight_text_cmd = highlight_cmd + '-ltext';
var src_root = process.argv[2] ? process.argv[2] : '.';

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'))


/* home page */
app.get('/', function (req, res) {
	res.redirect('source/');
});

/* read src file */
app.get('/source/(*)', function (req, res) {

	var file_path = src_root + '/' + req.params[0];
	var relative_path = './' + req.params[0];

	fs.stat(file_path, function (err, stats) {
		if (!err) {
			if (stats.isFile()) {
				/* path is file. show a code view*/
				exec(highlight_cmd + '"' + file_path + '"', {
					maxBuffer: 1024 * 1024
				}, function (error, stdout, stderr) {

					console.log(stderr);

					res.render('source_reader', {
						type: 'file',
						codes: stdout,
						file: relative_path,
						title: req.params[0]
					});

				});
			} else if (stats.isDirectory()) {
				/* show all files */
				fs.readdir(file_path, function (err, files) {
					if (!err) {

						if (relative_path.lastIndexOf('/') != relative_path.length - 1) {
							relative_path = relative_path + '/';
						}

						res.render('source_reader', {
							type: 'dir',
							files: files,
							file: relative_path,
							title: relative_path
						});
					}
				});
			}
		} else {
			res.send('404');
		}
	});
});

app.listen(80);
