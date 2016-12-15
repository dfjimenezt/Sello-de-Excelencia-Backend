var BaseModel = require('../utils/model.js');
var util = require('util');
var utiles = require('../utils/utiles.js');

var User = function () {
	var params = ["user", "mysql"];
	BaseModel.apply(this, params);

	//Function binds model to SQL however brings the user with its permissions.
	this.getUser = function(email){
		var query = "SELECT u.*,p.name permission,r.name role FROM user u "
		"LEFT JOIN user_role u_r ON u.id ON u_r.id_user "
		"LEFT JOIN role r ON r.id = u_r.id_role "
		"LEFT JOIN permission_role p_r ON p_r.id_role = r.id "
		"LEFT JOIN permission p ON p.id = p_r.id_permission "
		"WHERE u.email = '"+email+"'";
		return this.customQuery(query).then(function(data){
			var	permissions=[];
			for(var i in data){
				permissions.push(data[i].permission);
			}
			var user = data[0];
			delete user.permission;
			user.permissions = permissions;
			return user;
		});
	}

	return this;
};
util.inherits(User, BaseModel);

module.exports = User;