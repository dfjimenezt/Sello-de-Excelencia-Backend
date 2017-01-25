var config = require('../../config.json')
var verbose = config.verbose === true

var mysql = require('mysql')

var dbConf
if (config.enviroment === 'production') dbConf = config.db_production
else if (config.enviroment === 'development') dbConf = config.db_development
else if (config.enviroment === 'testing') dbConf = config.db_testing
else dbConf = config.db_development
dbConf.multipleStatements = true

// TODO revisar var connection

var MysqlModel = function (table) {
  function resolveQuery(query, connection) {
    return new Promise((resolve, reject) => {
      if (verbose) console.log(query)
      connection.connect()
      connection.query(query, (err, result, fields) => {
        if (err) reject(err)
        else resolve(result)
      })
      connection.end({ timeout: 60000 })
    })
  }

  this.getAll = function (params) {
    if (params.filter || params.limit || params.page || params.page) {
      return this.getFiltered(params);
    }
    var connection = mysql.createConnection(dbConf)
    var query = 'SELECT * FROM ' + table + ';'
    return resolveQuery(query, connection)
  }

  this.getByUid = function (uid) {
    var connection = mysql.createConnection(dbConf)
    var query = 'SELECT * FROM ' + table + ' AS list WHERE list.id = ' + connection.escape(uid) + ';'
    return resolveQuery(query, connection)
  }

  this.getByUids = function (uids) {
    var connection = mysql.createConnection(dbConf)
    var queryGet = ''
    for (var i in uids) {
      queryGet += 'list.Uid = ' + connection.escape(uids[i]) + ' AND '
    }
    queryGet = queryGet.slice(0, -4)
    var query = 'SELECT * FROM `' + table + '` AS list WHERE ' + queryGet + ';'
    return resolveQuery(query, connection)
  }

  this.getByParams = function (params) {
    var connection = mysql.createConnection(dbConf)
    var queryGet = ''
    for (var i in params) {
      queryGet += 'list.' + i + ' = ' + connection.escape(params[i]) + ' AND '
    }
    queryGet = queryGet.slice(0, -4)
    var query = 'SELECT * FROM `' + table + '` AS list WHERE ' + queryGet + ';'
    return resolveQuery(query, connection)
  }

  this.getFiltered = function (params) {
    var connection = mysql.createConnection(dbConf);
    var queryGet = "";
    for (var i in params.fields) {
      // TODO CREATE FULLTEXT INDEX AND USE MATCH IN NATURAL LANGUAGE MODE
      queryGet += "list." + params.fields[i] + " like " + connection.escape("%" + params.filter + "%") + " OR ";
    }
    queryGet = queryGet.slice(0, -4);
    var query = "SELECT SQL_CALC_FOUND_ROWS * FROM `" + table +
      "` AS list ";
    if (queryGet.length) {
      query += "WHERE (" + queryGet + ")";
    }
    query += " ORDER BY list." + params.order +
      " LIMIT " + ((parseInt(params.page) - 1) * params.limit) + "," + params.limit + ";";
    query += "SELECT FOUND_ROWS() as total;";
    return resolveQuery(query, connection).then((result) => {
      return { data: result[0], total_results: result[1][0].total };
    });
  };

  this.create = function (body) {
    var connection = mysql.createConnection(dbConf)
    var queryFields = '('
    var queryValues = '('
    for (var i in body) {
      queryFields += '`' + i + '`' + ','
      queryValues += connection.escape(body[i]) + ','
    }
    queryFields = queryFields.slice(0, -1) + ')'
    queryValues = queryValues.slice(0, -1) + ')'
    var query = 'INSERT INTO ' + table + ' ' + queryFields + ' VALUES ' + queryValues + ';'
    return resolveQuery(query, connection)
  }

  this.update = function (body, condition) {
    var connection = mysql.createConnection(dbConf)
    var queryUpdate = ''
    var queryCondition = ''
    for (var i in body) {
      queryUpdate += i + ' = ' + connection.escape(body[i]) + ','
    }
    for (var j in condition) {
      queryCondition += j + ' = ' + connection.escape(condition[j]) + ' AND '
    }
    queryUpdate = queryUpdate.slice(0, -1)
    queryCondition = queryCondition.slice(0, -4)
    var query1 = 'UPDATE ' + table + ' SET ' + queryUpdate + ' WHERE ' + queryCondition + ';'
    var query2 = 'SELECT * FROM ' + table + ' AS list WHERE ' + queryCondition + ';'
    return resolveQuery(query1, connection).then(() => {
      connection = mysql.createConnection(dbConf)
      return resolveQuery(query2, connection)
    })
  }

  this.delete = function (condition) {
    var connection = mysql.createConnection(dbConf)
    var queryCondition = ''
    for (var i in condition) {
      queryCondition += i + ' = ' + connection.escape(condition[i]) + ' AND '
    }
    queryCondition = queryCondition.slice(0, -4)
    var query = 'DELETE FROM ' + table + ' WHERE ' + queryCondition + ';'
    return resolveQuery(query, connection)
  }

  this.customQuery = function (query) {
    var connection = mysql.createConnection(dbConf)
    return resolveQuery(query, connection)
  }
}

module.exports = MysqlModel
