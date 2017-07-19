var Config = require('../../config.json')
var Errores = require('./errors.js')
var Permissions = require('./permissions.js')
var Jwt = require('jsonwebtoken')
var Crypto = require('crypto')
var Nodemailer = require('nodemailer')

module.exports = {
  // This one is used in development.
  unimplementedMethod: function () {
    return { info: 'Unimplemented Method' }
  },
  //
  informError: function (num) {
    return { error: Errores[num] }
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
    return Jwt.decode(token, Config.secret)
  },
  // This one is used in the authorization controller.
  sign: function (user) {    
    return Jwt.sign(user, Config.secret)
  },
  // This one is used in the authorization controller.
  createHmac: function (algorithm) {
    return Crypto.createHmac(algorithm, Config.secret)
  },
  authorize: function (token, permit) {
    return new Promise((resolve, reject) => {
      var Session = require('../models/session.js')
      var SessionModel = new Session()
      // Remove Bearer Basic or any other attribute
      if (token) {
        token = token.split(' ')
        token = token[token.length - 1]
      }
      SessionModel.getByParams({ token: token }).then((session) => {
        if (session.length !== 1) {
          if (permit === Permissions.NONE) resolve(true)
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
        if (permit === Permissions.NONE) resolve(user)
        else throw this.informError(100)
      }).catch((err) => { reject(err) })
    })
  },
  sendEmail: function (to, cc, bcc, subject, body, attachment) {
    return new Promise((resolve, reject) => {
      var transporter = Nodemailer.createTransport(Config.smtp.protocol + '://' + Config.smtp.sender + ':' + Config.smtp.password + '@' + Config.smtp.server)
      var mailOptions = {
        from: Config.smtp.from, // sender address
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
  
  getUser: function(email){
	var query = `SELECT u.*,p.name permission,r.name role,c.id id_category,c.name name_category,t.id id_topic, t.name name_topic
		FROM user u 
		LEFT JOIN user_role u_r ON u.id = u_r.id_user 
		LEFT JOIN role r ON r.id = u_r.id_role 
		LEFT JOIN permission_role p_r ON p_r.id_role = r.id 
		LEFT JOIN permission p ON p.id = p_r.id_permission 
		LEFT JOIN user_category u_c ON u_c.id_user = u.id 
		LEFT JOIN category c ON u_c.id_category = c.id 
		LEFT JOIN user_questiontopic u_qt ON u_qt.id_user = u.id 
		LEFT JOIN questiontopic t ON u_qt.id_topic = t.id 
		WHERE u.email = '${email}'`
	return this.customQuery(query).then(function(data){
		if(data.length === 0){
			return null
		}else{
			console.log("data out")
			console.log(data[0])
			return data[0]
		}
	})
  },
}
