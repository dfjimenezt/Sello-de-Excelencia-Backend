var BaseModel = require('../utils/model.js')
var util = require('util')
var utiles = require('../utils/utiles.js')

var User = function () {
	var params = ["user", "mysql"]
	BaseModel.apply(this, params)

	this.deleteUser = function(obj){
		return this.delete(obj)
		/*var query = `DELETE FROM user_role WHERE id_user= '${obj.id}'
		DELETE FROM user WHERE id = '${obj.id}'`
		return this.customQuery(query)*/
	}

	/**
	 * get Random Evaluators
	 */
	this.getRandomEvaluators = function(s){
		let query = `SELECT u.* FROM user u
		LEFT JOIN user_category u_c ON u_c.id_user = u.id 
		WHERE id_category = s.id_category
		ORDER BY RAND() LIMIT 5`
		return this.customQuery(query).then((evaluators)=>{ //select evaluators from the same category
			return evaluators;
		})
	}

	//Function binds model to SQL however brings the user with its permissions.
	this.getUser = function(email){
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
			}
			let	permissions=[]
			let categories=[];
			let topics=[];
			for(var i in data){
				if(data[i].permission && permissions.indexOf(data[i].permission) == -1){
						permissions.push(data[i].permission)
				}
				if(data[i].id_category){
						permissions.push({
							id:data[i].id_category,
							name:data[i].name_category})
				}
				if(data[i].id_topic){
						permissions.push({
							id:data[i].id_topic,
							name:data[i].name_topic})
				}	
			}
			var user = data[0]
			delete user.permission
			delete user.id_category
			delete user.id_topic
			delete user.name_category
			delete user.name_topic
			user.permissions = permissions
			user.categories = categories
			user.topics = topics
			return user
		})
	}

	return this
}
util.inherits(User, BaseModel)

module.exports = User