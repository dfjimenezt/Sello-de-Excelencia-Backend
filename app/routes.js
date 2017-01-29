var form = require('connect-form2')
var bodyParser = require('body-parser')

var Routes = function (app) {
  /*
  This are the controllers
  - test is for development an debug porpusoses
  - anp store all the mobile app services
  - auth allows authentication
  - admin is used by the CMS web app (by authenticated users)
  */
  var controllers = [
    { type: 'auth', file: './controllers/auth.js' },
    { type: 'test', file: './controllers/tests.js' },
    { type: 'configuration', file: './controllers/configuration.js' },
    { type: "service", file: "./controllers/service.js" },
		{ type: "place", file: "./controllers/place.js" },
		{ type: "forum", file: "./controllers/forum.js" },	
  ]
  var formParser = form({ keepExtensions: true }) // POST
  var urlencodedParser = bodyParser.urlencoded({ extended: true }) // PUT, DELETE
  var jsonParser = bodyParser.json();//POST
  
  app.use(urlencodedParser);
  app.use(jsonParser);
  app.use(formParser);

  // This is middleware that allows to retrive parameters from the POST, PUT & DELETE request
  /*
  This are the routing functions. They separate the request to the diferents controllers.
  There is a special considerations when usig POST, to allow file uploads
  */
  var finishPost = function (req, res, body, files) {
    var i, controller
    for (i in controllers) {
      if (controllers[i].type === req.params.type) {
        controller = require(controllers[i].file)()
        break;
      }
    }

    if (controller) {
      controller.post(req.params, req.headers.authorization, body, files)
        .then((data) => {
          if (data.error && data.error.htmlCode) res.status(data.error.htmlCode).send(data)
          else res.send(data)
        }).catch((err2) => {
          if (err2.error && err2.error.htmlCode) res.status(err2.error.htmlCode).send(err2)
          else res.send(err2)
        })
    } else res.sendStatus(404)
  };
  var postFunction = function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    if (req.form) {
      req.form.complete((err, fields, files) => {
        if (err) res.sendStatus(500);
        finishPost(req, res, fields, files);
      });
    } else {
      finishPost(req, res, req.body, null);
    }
  }

  var getPutDeleteFunction = function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    var i, controller
    for (i in controllers) {
      if (controllers[i].type === req.params.type) {
        controller = require(controllers[i].file)()
        break
      }
    }

    if (controller) {
      var method
      if (req.originalMethod === 'GET') method = controller.get(req.params, req.headers.authorization, req.query)
      else if (req.originalMethod === 'PUT') method = controller.put(req.params, req.headers.authorization, req.body)
      else if (req.originalMethod === 'DELETE') method = controller.delete(req.params, req.headers.authorization, req.body)

      method.then((data) => {
        if (data.error && data.error.htmlCode) res.status(data.error.htmlCode).send(data)
        else res.send(data)
      }).catch((err2) => {
        if (err2.error && err2.error.htmlCode) res.status(err2.error.htmlCode).send(err2)
        else res.send(err2)
      })
    } else res.sendStatus(404)
  }

  
  /* ---------------- CREATE ---------------- */
  app.post('/api/:type/*', postFunction)  

  /* ----------------  READ  ---------------- */
  // This is some heartbeat to monitor that the app is working
  app.get('/health', (req, res) => { res.sendStatus(200) })
  app.get('/api/:type/*', getPutDeleteFunction)

  /* ---------------- UPDATE ---------------- */
  app.put('/api/:type/*', getPutDeleteFunction)

  /* ---------------- DELETE ---------------- */
  app.delete('/api/:type/*', getPutDeleteFunction)

}

module.exports = Routes
