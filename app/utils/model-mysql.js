var config = require('../../config.json')
var verbose = config.verbose === true
var emiter = require('../events/emiter.js').instance
var mysql = require('mysql')

var dbConf = null;
var env = "db_"+config.enviroment;
dbConf = config[env]
dbConf.multipleStatements = true

// TODO revisar var connection

var MysqlModel = function (info) {
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
  this.getPrimaryKey = function(){
    let key = null
    info.fields.forEach((f)=>{
      if(f.Key === "PRI"){
        key = f.Field
      }
    })
    return key
  }

  this.getAll = function (params) {
    if (params.filter || params.limit || params.page || params.page || params.filter_fields) {
      return this.getFiltered(params)
    }
    var connection = mysql.createConnection(dbConf)
    var query = 'SELECT * FROM ' + info.table + ''
    return resolveQuery(query, connection)
  }

  this.getByUid = function (uid) {
    var connection = mysql.createConnection(dbConf)
    let key = this.getPrimaryKey()
    if(!key){
      key = info.fields[0].Field
    }
    var query = 'SELECT * FROM ' + info.table + ' AS list WHERE list.'+key+' = ' + connection.escape(uid) + ''
    return resolveQuery(query, connection)
  }

  this.getByUids = function (uids) {
    var connection = mysql.createConnection(dbConf)
    var queryGet = ''
    for (var i in uids) {
      queryGet += 'list.id = ' + connection.escape(uids[i]) + ' OR '
    }
    queryGet = queryGet.slice(0, -4)
    var query = 'SELECT * FROM `' + info.table + '` AS list WHERE ' + queryGet + ''
    return resolveQuery(query, connection)
  }

  this.getByParams = function (params) {
    var connection = mysql.createConnection(dbConf)
    var queryGet = ''
    for (var i in params) {
      queryGet += 'list.' + i + ' = ' + connection.escape(params[i]) + ' OR '
    }
    queryGet = queryGet.slice(0, -4)
    var query = 'SELECT * FROM `' + info.table + '` AS list WHERE ' + queryGet + ''
    return resolveQuery(query, connection)
  }

  this.getFiltered = function (params) {
    var connection = mysql.createConnection(dbConf)
    let filters = {}
    var where = ""
    params.filter_fields = params.filter_fields || []
    params.filter_values = params.filter_values || []
    params.order = params.order || this.getPrimaryKey()
    if(!params.order){
      params.order = info.fields[0].Field
    }
    params.limit = params.limit || 200
    params.page = params.page || 1
    params._joins = params._joins || "OR"
    if (typeof params.filter_fields == "string") {
      params.filter_fields = [params.filter_fields]
      params.filter_values = [params.filter_values]
    }
    params.fields = params.fields || []

    //group fields by name
    params.filter_fields.forEach((key, i) => {
      if (!filters[key]) {
        filters[key] = []
      }
      filters[key].push(params.filter_values[i])
    })
    if (typeof params.fields == "string") {
      params.fields = [params.fields]
    }

    let search = ""
    if (params.fields.length > 0) {
      search = "("
      for (var i in params.fields) {
        // TODO CREATE FULLTEXT INDEX AND USE MATCH IN NATURAL LANGUAGE MODE
        search += "list." + params.fields[i] + " like " + connection.escape("%" + params.filter + "%") + " OR "
      }
      search = search.slice(0, -4)
      search += ")"
    }
    function resolveEqual(connection, value) {
      if(typeof value == 'number'){
				return '= ' + connection.escape(value);
			}
			let array = value.split(" ");
			if (array.length > 1) {
				return array[0] + connection.escape(array[1]);
			}
			return '= ' + connection.escape(value);
		}
    let conditions = ""
    if (params.filter_fields.length > 0) {
      for (var f in filters) {
        conditions += "("
        for (var v in filters[f]) {
          conditions += "list." + f + resolveEqual(connection, filters[f][v]) + " "+params._joins+" "
        }
        conditions = conditions.slice(0, -4)
        conditions += ") AND "
      }
      conditions = conditions.slice(0, -5)
    }
    if (search.length > 0 && conditions.length > 0) {
      where = search + " AND " + conditions
    } else { //just one of these
      where = search + conditions
    }

    var query = "SELECT SQL_CALC_FOUND_ROWS * FROM `" + info.table +
      "` AS list "
    if (where.length > 2) {
      query += "WHERE " + where
    }
    query += " ORDER BY list." + params.order +
      " LIMIT " + ((parseInt(params.page) - 1) * params.limit) + "," + params.limit + ";"
    query += "SELECT FOUND_ROWS() as total"
    console.log(query)
    return resolveQuery(query, connection).then((result) => {
      return { data: result[0], total_results: result[1][0].total }
    })
  }

  this.createMultiple = function (data) {
    let rows = data.data
    let col_names = data.col_names
    var query = "INSERT INTO " + info.table + " (" + col_names.join(",") + ") VALUES "
    for (let i in rows) {
      query += "(" //init
      for (let j in col_names) {
        /*if (rows[i][col_names.indexOf(col_names[j])] === undefined) {
          query += "NULL,"
        } else {
          query += "'" + rows[i][col_names.indexOf(col_names[j])] + "',"
        }*/
        if (rows[i][col_names[j]] === undefined) {
          query += "NULL,"
        } else {
          query += "'" + rows[i][col_names[j]] + "',"
        }
      }
      query = query.slice(0, -1)
      query += "),"
    }
    query = query.slice(0, -1)
    return this.customQuery(query)
  }

  this.createMultiple2 = function (data) {
    let col_names = []
    for (var i in data[0]) {
      col_names.push(i)
    }
    var query = "INSERT INTO " + info.table + " (" + col_names.join(",") + ") VALUES "
    for (let i in data) {
      query += "(" //init
      for (let j in col_names) {
        query += "'" + data[i][col_names[j]] + "',"
      }
      query = query.slice(0, -1)
      query += "),"
    }
    query = query.slice(0, -1)
    query += ";"
    return this.customQuery(query)
  }

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
    var query = 'INSERT INTO ' + info.table + ' ' + queryFields + ' VALUES ' + queryValues + ''
		return resolveQuery(query, connection).then((result)=>{
      let key = this.getPrimaryKey()
      if(key){
        body[key] = result.insertId
      }
      emiter.$emit(info.table+'.created',body)
      return result
    })
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
    var query0 = 'SELECT * FROM ' + info.table + ' AS list WHERE ' + queryCondition + ''
    var query1 = 'UPDATE ' + info.table + ' SET ' + queryUpdate + ' WHERE ' + queryCondition + ''
    var query2 = 'SELECT * FROM ' + info.table + ' AS list WHERE ' + queryCondition + ''

    let old = null
    return resolveQuery(query0,connection)
    .then((results)=>{
      old = results
      connection = mysql.createConnection(dbConf)
      return resolveQuery(query1, connection)
    })
    .then(() => {
			connection = mysql.createConnection(dbConf)
			return resolveQuery(query2, connection)
    }).then((results)=>{
      emiter.$emit(info.table+'.updated',old,results)
      return results
    })
  }

  this.delete = function (condition) {
    var connection = mysql.createConnection(dbConf)
    var queryCondition = ''
    for (var i in condition) {
      queryCondition += i + ' = ' + connection.escape(condition[i]) + ' AND '
    }
    queryCondition = queryCondition.slice(0, -4)
    var query0 = 'SELECT * FROM ' + info.table + ' WHERE ' + queryCondition + ''
    var query1 = 'DELETE FROM ' + info.table + ' WHERE ' + queryCondition + ''
    let old = null
    return resolveQuery(query0, connection).then((results)=>{
      emiter.$emit(info.table+'.deleted',old)
      connection = mysql.createConnection(dbConf)
      return resolveQuery(query1, connection)
    })
  }

  this.customQuery = function (query) {
    var connection = mysql.createConnection(dbConf)
    return resolveQuery(query, connection)
  }
}

module.exports = MysqlModel
