require('./api/data/db.js');
var express 	= require('express'),
	app			= express(),
	path		= require('path'),
	bodyParser	= require('body-parser'),
	routes		= require('./api/routes'),
	mongoose	= require('mongoose');

app.set('port', 3000);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://junaid:password123@ds059546.mlab.com:59546/todo-app")

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.log('Server Started on port ' + port);
});