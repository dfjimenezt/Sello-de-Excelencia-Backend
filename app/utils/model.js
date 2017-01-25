var config = require('../../config.json')

// This is the generic model, all models inherits from this one.
var ModelMysql = require('./model-mysql.js')

/*
A model is a component where we can make crud operations over a table. It is intended to be parametrisable.
So if the dev wants to use a diferent database it only will need to create a new file
'model-new.js' and add a 'else if' in the code
*/
var Model = function (table, typeModel) {
  if (!typeModel) typeModel = config.defaultModel
  var selectedModel
  if (typeModel === 'mysql') selectedModel = new ModelMysql(table)
  else selectedModel = new ModelMysql(table)

  this.getAll = function (params) {
    return selectedModel.getAll(params)
  }

  this.getByUid = function (uid) {
    return selectedModel.getByUid(uid)
  }

  this.getByUids = function (uids) {
    return selectedModel.getByUids(uids)
  }

  this.getByParams = function (params) {
    return selectedModel.getByParams(params)
  }

  this.create = function (body) {
    return selectedModel.create(body)
  }

  this.update = function (body, condition) {
    return selectedModel.update(body, condition)
  }

  this.delete = function (condition) {
    return selectedModel.delete(condition)
  }

  this.customQuery = function (query) {
    return selectedModel.customQuery(query)
  }
}

module.exports = Model
