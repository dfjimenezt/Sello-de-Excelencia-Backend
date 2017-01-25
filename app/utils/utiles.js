var config = require('../../config.json')
var errores = require('./errors.js')
var permissions = require('./permissions.js')
var jwt = require('jsonwebtoken')
var crypto = require('crypto')
var Session = require('../models/session.js')
var sessionModel = new Session()

module.exports = {
  // This one is used in development.
  unimplementedMethod: function () {
    return { info: 'Unimplemented Method' }
  },
  //
  informError: function (num) {
    return { error: errores[num] }
  },
  // This one is used to validate input arguments.
  isPositiveInteger: function (num) {
    if (!num) return false
    num = parseInt(num)
    return num === 0 || ((num | 0) > 0 && num % 1 === 0)
  },
  // This one is used to validate input arguments.
  isArrayOfPositiveIntegers: function (array) {
    if (!Array.isArray(array) || array.length === 0) return false
    for (var i = 0; i < array.length; i++) {
      if (!this.isPositiveInteger(array[i])) return false
    }
    return true
  },
  // This one is used to validate input arguments.
  isTimeStamp: function (timestamp) {
    return (new Date(timestamp)).getTime() > 0
  },
  // This one is used to clean the data before a SQL query.
  filterSqlInjection: function (txt) {
    // TODO implement method
    return txt
  },
  // This one is used in the authorization controller.
  decode: function (token) {
    return jwt.decode(token, config.secret)
  },
  // This one is used in the authorization controller.
  sign: function (user) {
    return jwt.sign(user, config.secret)
  },
  // This one is used in the authorization controller.
  createHmac: function (algorithm) {
    return crypto.createHmac(algorithm, config.secret)
  },
  authorize: function (token, permit) {
    return new Promise((resolve, reject) => {
      // Remove Bearer Basic or any other attribute
      if (token) {
        token = token.split(' ')
        token = token[token.length - 1]
      }
      sessionModel.getByParams({ token: token }).then((session) => {
        if (session.length !== 1) {
          if (permit === permissions.NONE) resolve(true)
          throw this.informError(100)
        }

        var now = new Date()
        if (now > session[0].expires) throw this.informError(101)

        var user = this.decode(token)
        for (var i in user.permissions) {
          if (user.permissions[i] === permit) {
            resolve(user)
          }
        }
        if (permit === permissions.NONE) resolve(user)
        else throw this.informError(100)
      }).catch((err) => { reject(err) })
    })
  },
  /* This one is used to group information after some MySQL Query.
  Its intended to be used when the query contains a join betwen tables. In the
  answer the left part will be common for some tuples, so to destroy that redundant information
  this function group the info using some primary key and saved using the nameGroup chosen by the dev.
  */
  groupTuples: function (array, divisorIndex, primaryKey, nameGroup) {
    if (array.length === 0) return []

    var size = Object.keys(array[0]).length
    var breakPoint = divisorIndex
    if (divisorIndex < 0 && (breakPoint = size + divisorIndex) < 0 || divisorIndex > size) {
      throw this.informError(406)
    }

    var map = new Map()
    for (var i in array) {
      var index = 0
      var objectCommon = {}
      var objectParticular = {}
      var indexKey = ''
      for (var property in array[i]) {
        if (array[i].hasOwnProperty(property)) {
          if (property === primaryKey) indexKey = array[i][property]
          if (index < breakPoint) objectCommon[property] = array[i][property]
          else objectParticular[property] = array[i][property]
          index++
        }
      }

      if (!map.get(indexKey)) {
        objectCommon[nameGroup] = [objectParticular]
        map.set(indexKey, objectCommon)
      } else {
        var savedObject = map.get(indexKey)
        savedObject[nameGroup].push(objectParticular)
        map.set(indexKey, savedObject)
      }
    }

    var rta = []
    for (var value of map.values()) rta.push(value)
    return rta
  }
}
