var config = require('../../config.json')
var errores = require('./errors.js')
var permissions = require('./permissions.js')
var jwt = require('jsonwebtoken')
var crypto = require('crypto')
var Session = require('../models/session.js')
var nodemailer = require('nodemailer')
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
  sendEmail: function (to, cc, bcc, subject, body, attachment) {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport(config.smtp.protocol + '://' + config.smtp.sender + ':' + config.smtp.password + '@' + config.smtp.server)
      var mailOptions = {
        from: config.smtp.from, // sender address
        to: to, // list of receivers
        cc: cc,
        bcc: bcc,
        subject: subject, // Subject line
        html: body // plaintext body
      }
      //send Mail
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
        }
        resolve()
      })
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
  },
  parseExcelFile: function (filename) {
    function charArray(charA, charZ) {
      var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0)
      for (; i <= j; ++i) {
        a.push(String.fromCharCode(i))
      }
      return a
    }
    function getRange(position) {
      var c = ""
      var r = ""
      for (let i = 0; i < position.length; i++) {
        if (isNaN(Number.parseInt(position.charAt(i)))) {
          c += position.charAt(i)
        } else {
          r = Number.parseInt(position.substring(i))
          break
        }
      }
      return { c: c, r: r }
    }
    var XLSX = require("xlsx")
    var workbook = XLSX.readFile(filename)
    var sheet_name_list = workbook.SheetNames
    let col_names = []
    let data = []
    /* iterate through sheets */
    sheet_name_list.forEach(function (y) {
      var worksheet = workbook.Sheets[y]
      var range = worksheet["!ref"].split(":")
      var init = getRange(range[0])
      var end = getRange(range[1])
      var cols = charArray(init.c, end.c)
      for (let r = init.r; r <= end.r; r++) {
        if (r == 1) {
          for (let i in cols) {
            let c = cols[i]
            col_names.push(worksheet[c + r].w)
          }
        } else {
          let d = {}
          for (let i in cols) {
            let c = cols[i]
            if (worksheet[c + r] === undefined) {
              continue
            }
            d[col_names[i]] = worksheet[c + r].w
          }
          data.push(d)
        }
      }
    })
    return { col_names: col_names, data: data }
  }
}
