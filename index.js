'use strict';

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// A Buddha statue to bless your code to be bug free.

/*
This is the main script of the aplication. it can be used in an external source.
using something like this:
----
var configJSON = {...};
var back = require("index.js");
var back_instance = new back(configJSON);
----
Or it coul be started by the cli and it will search the config file in this path:
"./config.json"

The structure of a config JSON must be:
*/
var Backend = function(configJSON)
{
	var config = configJSON || require('./config.json');
	var verbose = config.verbose.toLowerCase() === 'true';

	//If we are using Google app engine to deploy the app
	if(config.googleDebug.toLowerCase() === 'true'){
	  require('@google/cloud-trace').start();
	  require('@google/cloud-debug');
	}

	//We create an Express app and enable Cross-origin resource sharing (CORS)
	var express = require('express');
	var morgan = require('morgan');
//	var methodOverride = require('method-override');
	var cors = require('cors');

	var app = express();
	app.use(morgan('dev')); // Log every request to the console
	app.use(express.static(__dirname + '/public'));
	
	var bodyParser = require('body-parser');
	// parse application/x-www-form-urlencoded 
	app.use(bodyParser.urlencoded({ extended: false }));
	// parse application/json 
	app.use(bodyParser.json());
	
	var whitelist = config.autorizedHosts;
	var corsOptions = {
		origin: function(origin, callback){
			var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
			callback(null, originIsWhitelisted);
		},
		methods: "GET,HEAD,PUT,POST,DELETE"
	};
	app.use(cors(corsOptions)); // Sign with default (HMAC SHA256)
	app.options('*', cors());//Enabling CORS Pre-Flight, for DELETE

	//The routing logic of the app will be on this file.
	require('./app/routes.js')(app);

	//This turns on the app
	app.set('port', (process.env.PORT || config.port || 5000));

	var server;

	this.start = function(){
		server = app.listen(app.get('port'), () => {
			if(verbose){
				console.log('Node app is running on port', app.get('port'));
				console.log("Using profile: "+config.enviroment);
			}
		});
	};

	this.close = function(){
		server.close();
	};
};

module.exports = Backend;

if(module === require.main){
	var instance = new Backend();
	instance.start();
}
