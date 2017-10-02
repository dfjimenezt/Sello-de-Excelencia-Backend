/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * user
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"picture","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"secondname","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"lastname","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"secondlastname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"second_email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"phone","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"extension","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"mobile","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"organization","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ocupation","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"education_level","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"password","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"tmp_pwd","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"active","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"verified","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"alert","Type":"tinyint(1)","Null":"NO","Key":"","Default":"0","Extra":""},{"Field":"terms","Type":"tinyint(1)","Null":"NO","Key":"","Default":"0","Extra":""},{"Field":"newsletter","Type":"tinyint(1)","Null":"NO","Key":"","Default":"0","Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"id_availability","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_city","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_region","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_country","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"document","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_type_document","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 24 / 8 / 2017 - 18:2:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var User = function () {
	var params = [{
		table:'user',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"picture","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"secondname","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"lastname","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"secondlastname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"second_email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"phone","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"extension","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"mobile","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"organization","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ocupation","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"education_level","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"password","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"tmp_pwd","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"active","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"verified","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"alert","Type":"tinyint(1)","Null":"NO","Key":"","Default":"0","Extra":""},{"Field":"terms","Type":"tinyint(1)","Null":"NO","Key":"","Default":"0","Extra":""},{"Field":"newsletter","Type":"tinyint(1)","Null":"NO","Key":"","Default":"0","Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"id_availability","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_city","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_region","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_country","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"document","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_type_document","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	this.getAdmin = function(){
		let q = `SELECT u.id from user u JOIN user_role ON user_role.id_user = u.id WHERE user_role.id_role = 3`
		return this.customQuery(q)
	}
	this.getUser = function(email){
		var query = `SELECT u.*,
			p.name permission,
			r.name role,
			c.id id_category,
			c.name name_category,
			t.id id_topic, 
			t.name name_topic,
			i.id institution_id, 
			i.name institution_name,
			i_u.role institution_role,
			i_u.admin institution_admin
			FROM user u 
			LEFT JOIN user_role u_r ON u.id = u_r.id_user 
			LEFT JOIN role r ON r.id = u_r.id_role 
			LEFT JOIN permission_role p_r ON p_r.id_role = r.id 
			LEFT JOIN permission p ON p.id = p_r.id_permission 
			LEFT JOIN user_category u_c ON u_c.id_user = u.id 
			LEFT JOIN category c ON u_c.id_category = c.id 
			LEFT JOIN user_questiontopic u_qt ON u_qt.id_user = u.id 
			LEFT JOIN questiontopic t ON u_qt.id_topic = t.id 
			LEFT JOIN institution_user i_u ON i_u.id_user = u.id 
			LEFT JOIN institution i ON i_u.id_institution = i.id 
		WHERE u.email = '${email}'`
		return this.customQuery(query).then(function(data){
			if(data.length === 0){
				return null
			}
			let	permissions=[]
			let categories=[];
			let categories2=[]
			let topics=[]
			let topics2=[]
			let institutions =[]
			let institutions2 =[]
			for(var i in data){
				if(data[i].permission && permissions.indexOf(data[i].permission) == -1){
						permissions.push(data[i].permission)
				}
				if(data[i].id_category && categories2.indexOf(data[i].id_category) == -1){
						categories2.push(data[i].id_category)
						categories.push({
							id:data[i].id_category,
							name:data[i].name_category})
				}
				if(data[i].id_topic && topics2.indexOf(data[i].id_topic) == -1){
						topics2.push(data[i].id_topic)
						topics.push({
							id:data[i].id_topic,
							name:data[i].name_topic})
				}
				if(data[i].institution_id && institutions2.indexOf(data[i].institution_id) == -1){
					institutions2.push(data[i].institution_id)
					institutions.push({
						id: data[i].institution_id,
						name: data[i].institution_name,
						role: data[i].institution_role,
						admin: data[i].institution_admin,
					})
			}
			}
			var user = data[0]
			delete user.permission
			delete user.id_category
			delete user.id_topic
			delete user.name_category
			delete user.name_topic
			delete user.institution_id
			delete user.institution_name
			user.permissions = permissions
			user.categories = categories
			user.topics = topics
			user.institutions = institutions
			return user
		})
	}
	this.getUserAll = function(email){
		var query = `SELECT * FROM user WHERE email = "${email}" ;`
		return this.customQuery(query).then(function(data){
			if(data.length === 0){
				return null
			}else{
				console.log("data out")
				console.log(data[0])
				return data[0]
			}
		})
	}
	return this
};
util.inherits(User, BaseModel)
module.exports = User