var fs = require('fs');

var global = require('./app/gnu_global');
var app = require('./app/server')
var highlight = require('./app/highlight');
var project = require('./app/project');

var src_root = process.argv[2] ? process.argv[2] : '.';

/* home page */
app.get('/', function (req, res) {
	res.redirect('source/');
});

/* read src file */
app.get('/source/(*)', function (req, res) {

	var file_path = src_root + '/' + req.params[0];
	var relative_path = './' + req.params[0];

	project.readPath(file_path, function () {
		res.render('source_reader', {
			type: 'file',
			codes: 'loading',
			file: relative_path,
			title: req.params[0]
		});
	}, function () {
		if (req.originalUrl.lastIndexOf('/') == req.originalUrl.length - 1) {
			res.render('source_reader', {
				type: 'dir',
				files: 'loading ...',
				file: relative_path,
				title: relative_path
			});
		} else {
			res.redirect(req.originalUrl + '/');
		}
	});
});

/* ajax call; get highlight codes */
app.get('/ajax/code/(*)', function (req, res) {
	var file_path = src_root + '/' + req.params[0];
	highlight(file_path, function (error, stdout, stderr) {

		if (!error) {
			res.send(stdout);
		}

	});
});

/* ajax call; get highlight codes */
app.get('/ajax/dir/(*)', function (req, res) {
	var file_path = src_root + '/' + req.params[0];
	var relative_path = './' + req.params[0];

	fs.readdir(file_path, function (err, files) {
		if (!err) {

			if (relative_path.lastIndexOf('/') != relative_path.length - 1) {
				relative_path = relative_path + '/';
			}

			res.render('template/file_list', {
				type: 'dir',
				files: files,
				file: relative_path,
				title: relative_path
			});
		}
	});

});

app.get('/ajax/outline/(*)', function (req, res) {
	var file = req.params[0];
	global.getSymbolDefines(src_root, file, function (error, symbols) {
		res.render('template/defines', {
			symbols: symbols,
			base_url:'source/'+file
		});
	});
});

global.gtags(src_root, function () {
	app.listen(80);
})
