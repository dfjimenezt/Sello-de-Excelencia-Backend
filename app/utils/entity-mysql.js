var config = require('../../config.json')
var verbose = config.verbose === true

var mysql = require('mysql')

var dbConf = null;
var env = "db_"+config.enviroment;
dbConf = config[env]
dbConf.multipleStatements = true

var EntityModel = function (info) {
	let dmt_entities = require('../../public/admin/entities.js');
	let dmt_tables = require('../../public/admin/tables.js');
	let dmt = {
		entities: dmt_entities.entities,
		tables: dmt_tables.tables
	}
	this.getPrimaryKey = function () {
		let key = null
		getTable(info.entity).fields.forEach((f) => {
			if (f.key) {
				key = f.name
			}
		})
		return key
	}
	function getTable(name) {
		let ety = dmt.entities[name]
		let table = null
		if (ety) {
			table = dmt.tables[ety.table]
			table.name = ety.table
			return table
		} else {
			table = dmt.tables[name]
			table.name = name
			return table
		}
	}
	function resolveViewName(entity, lang) {
		let ety = dmt.entities[entity]
		if (ety) {
			if (ety.translate && lang) {
				return "view_" + ety.table + "_" + lang
			} else {
				return "view_" + ety.table
			}
		}
		return entity
	}
	function getFields(relation) {
		let str = [];
		let table = getTable(relation.entity || relation.table)
		table.fields.forEach((f) => {
			str.push(table.name + "." + f.name + " " + table.name + "_" + f.name)
		})
		return str.join(",")
	}
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
	function getBase(lang) {
		return `(SELECT ${info.table}.*,${getFields(info.translate)} FROM  ${info.table}
				 LEFT JOIN ${info.translate.table}  ON ${info.translate.table}.${info.translate.rightKey} = ${info.table}.${getTable(info.table).defaultSort} AND ${info.translate.table}.id_lang = '${lang}')`;
	}

	function generateGetQuery(base, lang) {
		let selection = "\`base\`.*";
		let get_query = `SELECT {{SELECTION}} FROM ${base} \`base\` `;
		if (info.relations) {
			info.relations.forEach((relation) => {
				switch (relation.type) {
					case "1-1":
						selection += `,${getFields(relation)} `
						get_query += `LEFT JOIN ${getTable(relation.entity).name} ON \`base\`.${relation.leftKey} = ${getTable(relation.entity).name}.${getTable(relation.entity).defaultSort} `
						break;
					case "1-n":
						//get_query += `LEFT JOIN ${relation.table} ON ${info.table}.${info.defaultSort} = ${relation.table}.${relation.rightKey} `
						break;
					case "n-n":
						//get_query += `LEFT JOIN ${relation.intermediate.table} ON ${info.table}.${info.defaultSort} = ${relation.intermediate.table}.${relation.intermediate.leftKey}
						//                        LEFT JOIN ${relation.table} ON ${relation.table}.${relation.defaultSort} = ${relation.intermediate.table}.${relation.intermediate.rightKey} `
						break;
				}
			})
		}
		get_query = get_query.replace(new RegExp("{{SELECTION}}", "g"), selection);
		let query = `CREATE OR REPLACE VIEW view_${info.table}${lang ? "_" + lang : ""} AS ${get_query};`;
		return query
	}
	this.updateView = function () {
		if (info.translate) {
			return this.customQuery("SELECT * FROM lang").then((langs) => {
				let query = "";
				langs.forEach((l) => {
					query += generateGetQuery(getBase(l.id), l.id)
				})
				console.log(query)
				return this.customQuery(query)
			})
		} else {
			let query = generateGetQuery(info.table, null)
			return this.customQuery(query)
		}
	}
	this.getAll = function (params) {
		params = params || {
			limit: 10,
			page: 1
		}
		return this.getFiltered(params)
	}
	this.getByUid = function (uid) {
		var connection = mysql.createConnection(dbConf)
		let table = getTable(info.entity)
		let params = {
			filter_fields: [table.defaultSort],
			filter_values: [uid],
		}
		return this.getFiltered(params)
	}
	this.getByUids = function (uids) {
		var connection = mysql.createConnection(dbConf)
		var queryGet = ''
		for (var i in uids) {
			queryGet += 'list.Uid = ' + connection.escape(uids[i]) + ' AND '
		}
		queryGet = queryGet.slice(0, -4)
		var query = 'SELECT * FROM `' + info.table + '` AS list WHERE ' + queryGet + ''
		return resolveQuery(query, connection)
	}
	this.getByParams = function (params) {
		var connection = mysql.createConnection(dbConf)
		var queryGet = ''
		for (var i in params) {
			queryGet += 'list.' + i + ' = ' + connection.escape(params[i]) + ' AND '
		}
		queryGet = queryGet.slice(0, -4)
		var query = 'SELECT * FROM `' + info.table + '` AS list WHERE ' + queryGet + ''
		return resolveQuery(query, connection)
	}
	this.getFiltered = function (params) {
		var connection = mysql.createConnection(dbConf)
		let filters = {}
		var where = ""
		params.limit = params.limit || 20
		params.page = params.page || 1
		params.lang = params.lang || 1
		params.order = params.order || getTable(info.entity).defaultSort
		params.limit = Math.min(params.limit, 20)//max amount of entities to request is 50 due to heavy computing
		params.filter_fields = params.filter_fields || []
		params.filter_values = params.filter_values || []
		if (typeof params.filter_fields == "string") {
			params.filter_fields = [params.filter_fields]
			params.filter_values = [params.filter_values]
		}
		params.fields = params.fields || []
		if (typeof params.fields == "string") {
			params.fields = [params.fields]
		}

		//group fields by name
		params.filter_fields.forEach((key, i) => {
			if (!filters[key]) {
				filters[key] = []
			}
			filters[key].push(params.filter_values[i])
		})

		let search = ""
		if (params.fields.length > 0) {
			search = []
			for (var i in params.fields) {
				// TODO CREATE FULLTEXT INDEX AND USE MATCH IN NATURAL LANGUAGE MODE
				search.push(params.fields[i] + " like " + connection.escape("%" + params.filter.split(" ").join("%") + "%"))
			}
			search = "(" + search.join(" OR ") + ")"
		}

		let conditions = ""
		if (params.filter_fields.length > 0) {
			for (var f in filters) {
				conditions += "("
				for (var v in filters[f]) {
					conditions += f + " = " + filters[f][v] + " OR "
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
		let subtable = "";
		if (info.translate && params.lang) {
			subtable = "view_" + info.table + "_" + params.lang
		} else {
			subtable = "view_" + info.table
		}

		var query = "SELECT SQL_CALC_FOUND_ROWS " + getTable(info.table).defaultSort + " `key` FROM `" + subtable + "` "
		if (where.length > 2) {
			query += "WHERE " + where
		}
		query += "GROUP BY " + getTable(info.table).defaultSort + " LIMIT " + ((parseInt(params.page) - 1) * params.limit) + "," + params.limit + ";"
		query += "SELECT FOUND_ROWS() as total"
		console.log(query)
		return this.customQuery(query).then((result) => {
			let keys = []
			for (let i in result[0]) {
				keys.push(result[0][i].key)
			}
			let total = result[1][0].total
			if (keys.length === 0) {
				return { data: [], total_results: 0 }
			}
			keys = keys.join(",")
			query = "SELECT * FROM " + subtable + " WHERE " + getTable(info.table).defaultSort + " IN (" + keys + ") ORDER BY " + params.order + ";"
			let count = 0;
			if (info.relations) {
				for (let i = 0; i < info.relations.length; i++) {
					let relation = info.relations[i]
					//info.relations.forEach((relation) =>
					switch (relation.type) {
						case "1-n":
							count++;
							query += `SELECT * FROM ${resolveViewName(relation.entity, params.lang)} WHERE ${resolveViewName(relation.entity, params.lang)}.${relation.rightKey} IN (${keys});`
							break;
						case "n-n":
							count++;
							query += `SELECT * FROM ${resolveViewName(relation.entity, params.lang)}
							LEFT JOIN ${resolveViewName(relation.intermediate.entity, params.lang)} intermediate ON intermediate.${relation.intermediate.rightKey} = ${resolveViewName(relation.entity, params.lang)}.${getTable(relation.entity).defaultSort}
							WHERE intermediate.${relation.intermediate.leftKey} IN (${keys});`
							break;
					}
				}
			}
			/**
			 * From row to json
			 */
			function sintetizeRelation(data, relation) {
				let ety = dmt.entities[relation.entity]
				let table = getTable(relation.entity)
				let result = {}
				table.fields.forEach((f) => {//base data
					result[f.name] = data[f.name]
				})
				if (!ety) {
					return result
				}
				if (ety.translate) {
					let translate_table = getTable(ety.translate.table)
					translate_table.fields.forEach((f) => {
						if (!result[f.name]) {
							result[f.name] = data[translate_table.name + "_" + f.name]
						}
					})
				}
				if (ety.relations) {
					ety.relations.forEach((relation) => {
						if (relation.type === "1-1") {
							let object = {}
							let relation_table = getTable(relation.entity || relation.table)
							relation_table.fields.forEach((f) => {
								if (!object[f.name]) {
									object[f.name] = data[relation_table.name + "_" + f.name]
								}
							})
							result[relation.name || relation.entity] = object
						}
					})
				}
				if (relation.intermediate) {
					result[getTable(info.table).defaultSort] = result[getTable(info.table).defaultSort] || data[relation.intermediate.leftKey]
				}
				return result
			}
			console.log(query)
			return this.customQuery(query).then((result) => {
				let data = null
				if (count == 0) {
					data = result;
				} else {
					data = result[0];
				}
				//sintetize relations
				let relations = {};
				let relationlist = []
				if (info.relations) {
					info.relations.forEach((relation) => {
						if (relation.type === "1-1")
							return
						relationlist.push(relation)
					})
					for (let i = 1; i < result.length; i++) {
						let table = result[i]
						for (let j = 0; j < table.length; j++) {
							let relation = relationlist[i - 1]
							let entity = sintetizeRelation(table[j], relation)
							//let key = entity[getTable(info.table).defaultSort]
							let key = relation.rightKey
							if (relation.intermediate) {
								key = relation.intermediate.leftKey
							}
							key = table[j][key]
							if (!relations[key]) {
								relations[key] = {}
							}
							if (!relations[key][relation.name]) {
								relations[key][relation.name] = []
							}
							relations[key][relation.name].push(entity)
						}
					}
				}
				let results = []
				for (let i = 0; i < data.length; i++) {
					let row = sintetizeRelation(data[i], info)
					let key = row[getTable(info.table).defaultSort]
					if (relations[key]) {
						for (j in relations[key]) {
							row[j] = relations[key][j]
						}
					}
					results.push(row)
				}
				return { data: results, total_results: total }
			})
		})



	}
	this.createMultiple = function (data) {
		let rows = data.data
		let col_names = data.col_names
		var query = "INSERT INTO " + info.table + " (" + col_names.join(",") + ") VALUES "
		for (let i in rows) {
			query += "(" //init
			for (let j in col_names) {
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
	function insertIntoTable(table, data, connection) {
		var queryFields = '('
		var queryValues = '('
		table.fields.forEach((f) => {
			if (!data[f.name]) {
				return
			}
			queryFields += '`' + f.name + '`' + ','
			queryValues += connection.escape(data[f.name]) + ','
		})
		queryFields = queryFields.slice(0, -1) + ')'
		queryValues = queryValues.slice(0, -1) + ')'
		var query = 'INSERT INTO ' + table.name + ' ' + queryFields + ' VALUES ' + queryValues + ''
		return query
	}
	function updateTable(table, data, connection) {
		var queryValues = ''
		var queryWhere = '('
		table.fields.forEach((f) => {
			if (!data[f.name]) {
				return
			}
			queryValues += '`' + f.name + '`' + '=' + connection.escape(data[f.name]) + ','
			if (f.key) {
				queryWhere += '`' + f.name + '`=' + connection.escape(data[f.name]) + ' AND '
			}
		})
		queryValues = queryValues.slice(0, -1)
		queryWhere = queryWhere.slice(0, -5) + ')'
		var query = 'UPDATE ' + table.name + ' SET ' + queryValues + ' WHERE ' + queryWhere
		return query
	}
	function updateIntermediates(relation, baseId, intermediates) {
		let query = "DELETE FROM `" + relation.table + "` WHERE `" + relation.leftKey + "`= '" + baseId + "'"
		return this.customQuery(query).then(() => {
			let values = ""
			for (let i in intermediates) {
				values += "(" + baseId, intermediates[i] + "),"
			}
			values = values.slice(0, -1)
			let query = "INSERT INTO `" + relation.table + "` (" + relation.leftKey + "," + relation.rightKey + ") VALUES (" + values + ")"
			console.log(query)
			return this.customQuery(query)
		})
	}
	this.create = function (body) {
		var connection = mysql.createConnection(dbConf)
		let entity = dmt.entities[info.entity]
		let table = getTable(info.entity)
		/*if (body[table.defaultSort]) {
			let key = table.defaultSort;
			return this.update(body, { key: body[key] })
		}*/
		return resolveQuery(insertIntoTable(table, body, connection),connection).then((base) => {
			if (base.insertId) {
				body[table.defaultSort] = base.insertId
				connection = mysql.createConnection(dbConf)
				return resolveQuery(updateTranslation(body,connection),connection)
			}else{
				throw utiles.informError(300)
			}
		}).then(() => {
			return this.updateView()
		})
	}
	function updateTranslation(body,connection){
		let lang = body.language
		let entity = dmt.entities[info.entity]
		let table = getTable(info.entity)

		let translate_table = dmt.tables[entity.translate.table]
		let where = ' WHERE ' + entity.translate.rightKey + '=' + body[table.defaultSort] + ' AND id_lang =' + lang
		let query = 'DELETE FROM ' + entity.translate.table + where + '; INSERT INTO ' + entity.translate.table + ' '
		let keys = '('
		let values = '('
		body.id_lang = lang
		body[entity.translate.rightKey] = body[table.defaultSort]
		translate_table.fields.forEach((f) => {
			keys += '`' + f.name + '`,'
			values += connection.escape(body[f.name]) + ','
		})
		keys = keys.slice(0, -1) + ')'
		values = values.slice(0, -1) + ')'
		query += keys + ' VALUES ' + values
		return query
	}
	this.update = function (body, condition) {
		let connection = mysql.createConnection(dbConf)
		let entity = dmt.entities[info.entity]
		let table = getTable(info.entity)

		return resolveQuery(updateTable(table, body, connection), connection).then(() => {
			connection = mysql.createConnection(dbConf)
			return resolveQuery(updateTranslation(body,connection),connection)
		}).then(() => {
			return
			if (entity.relations) {
				let key = body[getTable(info.entity).defaultSort]
				entity.relations.forEach((relation) => {
					if (!body[relation.name]) {
						return
					}
					let relationdata = body[relation.name]
					let relationtable = getTable(relation.entity || relation.table)
					if (typeof relationdata === "array") {
						let intermediates = {}
						relationdata.forEach((data) => {
							if (relationdata[relationtable.defaultSort]) {
								return updateTable(relationtable, data).then(() => {
									if (relation.intermediate) {
										intermediates[key].push(data[relation.rightKey])
									}
								})
							} else {
								return insertIntoTable(relationtable, data).then((result) => {
									if (relation.intermediate) {
										intermediates[key].push(result.insertId)
									}
								})
							}
						})
						updateIntermediates(relation.intermediate, key, intermediates)
					} else { //
						if (relationdata[relationtable.defaultSort]) {
							//update
							return updateTable(relationtable, data)
						} else {
							return insertIntoTable(relationtable, data)
						}
					}
				})
			} else {
				return
			}
		}).then(() => {
			this.updateView()
		})
	}
	this.delete = function (condition) {
		let table = getTable(info.entity)
		let data = {}
		table.fields.forEach((f)=>{
			data[f.name] = condition[f.name]
		})
		var connection = mysql.createConnection(dbConf)
		var queryCondition = ''
		for (var i in data) {
			queryCondition += i + ' = ' + connection.escape(data[i]) + ' AND '
		}
		queryCondition = queryCondition.slice(0, -4)
		var query = 'DELETE FROM ' + info.table + ' WHERE ' + queryCondition + ''
		return resolveQuery(query, connection).then(() => {
			return updateView()
		})
	}
	this.customQuery = function (query) {
		var connection = mysql.createConnection(dbConf)
		return resolveQuery(query, connection)
	}
}

module.exports = EntityModel
