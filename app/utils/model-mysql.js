var config = require("../../config.json");
var verbose = config.verbose.toLowerCase() === 'true';

var mysql = require('mysql');

var dbConf;
if (config.enviroment === 'production') dbConf = config.db_production;
else if (config.enviroment === 'development') dbConf = config.db_development;
else if (config.enviroment === 'testing') dbConf = config.db_testing;
else dbConf = config.db_development;
dbConf.multipleStatements = true;

var connection;

var MysqlModel = function (table) {
	function resolveQuery(query, connection) {
		return new Promise(function (resolve, reject) {
			if (verbose) console.log(query);
			connection.connect();
			connection.query(query, function (err, result, fields) {
				if (err) reject(err);
				else resolve(result);
			});
			connection.end({ timeout: 60000 });
		});
	}

	this.getAll = function () {
		var connection = mysql.createConnection(dbConf);
		var query = "SELECT * FROM " + table + ";";
		return resolveQuery(query, connection);
	};

	this.getByUid = function (uid) {
		var connection = mysql.createConnection(dbConf);
		var query = "SELECT * FROM " + table + " AS list WHERE list.id = " + connection.escape(uid) + ";";
		resolveQuery(query, connection);
	};

	this.getByUids = function (uids) {
		var connection = mysql.createConnection(dbConf);
		var queryGet = "";
		for (var i in uids) {
			queryGet += "list.Uid = " + connection.escape(uids[i]) + " AND ";
		}
		queryGet = queryGet.slice(0, -4);
		var query = "SELECT * FROM `" + table + "` AS list WHERE " + queryGet + ";";
		return resolveQuery(query, connection);
	};

	this.getByParams = function (params) {
		var connection = mysql.createConnection(dbConf);
		var queryGet = "";
		for (var i in params) {
			queryGet += "list." + i + " = " + connection.escape(params[i]) + " AND ";
		}
		queryGet = queryGet.slice(0, -4);
		var query = "SELECT * FROM `" + table + "` AS list WHERE " + queryGet + ";";
		return resolveQuery(query, connection);
	};

	this.create = function (body) {
		var connection = mysql.createConnection(dbConf);
		var queryFields = "(";
		var queryValues = "(";
		for (var i in body) {
			queryFields += "`" + i + "`" + ",";
			queryValues += connection.escape(body[i]) + ",";
		}
		queryFields = queryFields.slice(0, -1) + ")";
		queryValues = queryValues.slice(0, -1) + ")";
		var query = "INSERT INTO " + table + " " + queryFields + " VALUES " + queryValues + ";";
		return resolveQuery(query, connection);
	};

	this.update = function (body, condition) {
		var connection = mysql.createConnection(dbConf);
		var queryUpdate = "";
		var queryCondition = "";
		for (var i in body) {
			queryUpdate += i + " = " + connection.escape(body[i]) + ",";
		}
		for (var j in condition) {
			queryCondition += j + " = " + connection.escape(condition[j]) + " AND ";
		}
		queryUpdate = queryUpdate.slice(0, -1);
		queryCondition = queryCondition.slice(0, -4);
		var query1 = "UPDATE " + table + " SET " + queryUpdate + " WHERE " + queryCondition + ";";
		var query2 = "SELECT * FROM " + table + " AS list WHERE " + queryCondition + ";";
		return resolveQuery(query1, connection).then(function () {
			connection = mysql.createConnection(dbConf);
			return resolveQuery(query2, connection);
		});
	};

	this.delete = function (condition) {
		var connection = mysql.createConnection(dbConf);
		var queryCondition = "";
		for (var i in condition) {
			queryCondition += i + " = " + connection.escape(condition[i]) + " AND ";
		}
		queryCondition = queryCondition.slice(0, -4);
		var query = "DELETE FROM " + table + " WHERE " + queryCondition + ";";
		return resolveQuery(query, connection);
	};

	this.customQuery = function (query) {
		var connection = mysql.createConnection(dbConf);
		return resolveQuery(query, connection);
	};
};

module.exports = MysqlModel;