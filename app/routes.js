var form = require('connect-form2');
var bodyParser = require('body-parser');

var Routes = function (app) {
	/*
	This are the controllers
	- test is for development an debug porpusoses
	- anp store all the mobile app services
	- auth allows authentication 
	- admin is used by the CMS web app (by authenticated users)
	*/
	var controllers = [
		{ type: "test", file: "./controllers/tests.js" },
		{ type: "service", file: "./controllers/service.js" },
		{ type: "place", file: "./controllers/place.js" },
		{ type: "configuration", file: "./controllers/configuration.js" },
		{ type: "forum", file: "./controllers/forum.js" },
		{ type: "auth", file: "./controllers/auth.js" }
	];

	var authControllers = [
		{ type: "admin", file: "./controllers/admin.js" }
	];

	//This is middleware that allows to retrive parameters from the POST, PUT & DELETE request
	var formParser = form({ keepExtensions: true, multiples: true }); //POST
	var urlencodedParser = bodyParser.urlencoded({ extended: false }); //PUT, DELETE

	var authMiddleware = function (req, res, next) {
		var token = req.headers.authorization;
		if (!token) res.sendStatus(403);
		else {
			console.log('Request URL:', req.originalUrl);
		}
		next();
	};

	/*
	This are the routing functions. They separate the request to the diferents controllers.
	There is a special considerations when usig POST, to allow file uploads
	*/
	var postFunction = function (req, res) {
		req.form.complete((err, fields, files) => {
			var i, controller;
			for (i in controllers) {
				if (controllers[i].type === req.params.type) {
					controller = new require(controllers[i].file)();
					break;
				}
			}

			if (!controller) {
				for (i in authControllers) {
					if (authControllers[i].type === req.params.auth) {
						controller = new require(authControllers[i].file)();
						break;
					}
				}
			}

			if (controller) {
				var params = req.params;
				controller.post(params, req.headers.authorization, fields, files)
					.then(function (data) { res.send(data); })
					.catch(function (err) { res.status(err.htmlCode).send(err); });
			}
			else res.sendStatus(404);
		});
	};

	var getPutDeleteFunction = function (req, res) {
		var i, controller;
		for (i in controllers) {
			if (controllers[i].type === req.params.type) {
				controller = new require(controllers[i].file)();
				break;
			}
		}

		if (!controller) {
			for (i in authControllers) {
				if (authControllers[i].type === req.params.auth) {
					controller = new require(authControllers[i].file)();
					break;
				}
			}
		}

		if (controller) {
			var params = req.params;
			var method;
			if (req.originalMethod === 'GET') method = controller.get(params, req.headers.authorization, req.query);
			else if (req.originalMethod === 'PUT') method = controller.put(params, req.headers.authorization, req.body);
			else if (req.originalMethod === 'DELETE') method = controller.delete(params, req.headers.authorization, req.body);

			method.then(function (data) { res.send(data); })
				.catch(function (err) { res.status(err.htmlCode).res.send(err); });
		}
		else res.sendStatus(404);
	};

	/* ---------------- CREATE ---------------- */
	app.post('/api/:type/*', formParser, postFunction);
	app.post('/auth/:auth/*', formParser, authMiddleware, postFunction);

	/* ----------------  READ  ---------------- */
	//This is some heartbeat to monitor that the app is working
	app.get('/health', (req, res) => {
		res.sendStatus(200);
	});

	app.get('/api/:type/*', getPutDeleteFunction);
	app.get('/auth/:auth/*', authMiddleware, getPutDeleteFunction);

	/* ---------------- UPDATE ---------------- */
	app.put('/api/:type/*', urlencodedParser, getPutDeleteFunction);
	app.put('/auth/:auth/*', urlencodedParser, authMiddleware, getPutDeleteFunction);

	/* ---------------- DELETE ---------------- */
	app.delete('/api/:type/*', urlencodedParser, getPutDeleteFunction);
	app.delete('/auth/:auth/*', urlencodedParser, authMiddleware, getPutDeleteFunction);
};

module.exports = Routes;