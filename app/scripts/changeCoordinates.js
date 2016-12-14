var Script = function () {
	var ficha = require('../models/ficha.js');
	var ficha_model = new ficha();
	var utiles = require('../utils/utiles.js');

	var fichas = ficha_model.getAll();

	fichas.then(answer => {
		for (var i = 0; i < answer.length; i++) {
			if (answer[i].visible === 1) {
				var condition = { id_ficha: answer[i].id_ficha };
				if (answer[i].latitud) answer[i].latitud = utiles.decimalCoordinade(answer[i].latitud);
				if (answer[i].longitud) answer[i].longitud = utiles.decimalCoordinade(answer[i].longitud);
				delete answer[i].id_ficha;
				var body = JSON.parse(JSON.stringify(answer[i]));
				ficha_model.update(body, condition);
			}
		}
	});
};

console.log("This script change the coordinate format in the database.");
console.log("Use it only if you know what are you doing");
//new Script();

//To use this sccript go to the main folder of the git repo and type the command
//"npm run script1"