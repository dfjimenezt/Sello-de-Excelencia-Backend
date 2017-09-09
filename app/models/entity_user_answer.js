/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:39:27
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var User_answer = function () {
	var params = [{"table":"user_answer","relations":[{"type":"1-1","entity":"service","name":"service","leftKey":"id_service","foreign_name":"name"},{"type":"1-1","entity":"question","leftKey":"id_question","name":"question","foreign_name":"text"},{"type":"1-1","entity":"user","name":"user","leftKey":"id_user","foreign_name":"email"},{"type":"1-1","entity":"media","name":"media","leftKey":"id_media","foreign_name":"url"},{"type":"1-1","entity":"questiontopic","name":"topic","leftKey":"id_topic","foreign_name":"name"},{"type":"1-1","entity":"status","name":"status","leftKey":"id_status","foreign_name":"name"}],"entity":"user_answer","model":"entity"}]
	BaseModel.apply(this, params)
	this.toPostulate= function(user,params){
		params = params || {}
		params.limit = params.limit || 20
		params.page = params.page || 1
		params.order = params.order || 'id asc'
		let topics = []
		user.topics.forEach((topic)=>{
			topics.push(topic.id)
		})
		let query = `SELECT SQL_CALC_FOUND_ROWS * FROM view_user_answer 
		WHERE id IN (
			SELECT u_a.id FROM user_answer u_a
			JOIN service s ON  u_a.id_service = s.id
			JOIN questiontopic qt ON  u_a.id_topic = qt.id
			JOIN question q ON  u_a.id_question = q.id
			LEFT JOIN institution i on i.id = s.id_institution
			WHERE 
			${params['institution.id'] ? 's.id_institution = '+params['institution.id'] +' AND ' :''}
			${params['region.id'] ? 'i.id_region = '+params['region.id'] +' AND ' :''}
			${params['category.id'] ? 'qt.id_category = '+params['category.id'] +' AND ' :''}
			${params['level'] ? 'q.level = '+params['level'] +' AND ' :''}
			u_a.id_topic IN (${topics.join(',')}) AND
			u_a.id NOT IN (SELECT id_answer FROM evaluation_request WHERE id_user = '${user.id}')
			ORDER BY u_a.${params.order}
		)
		LIMIT ${params.limit * (params.page-1)},${params.limit};
		SELECT FOUND_ROWS() as total;`
		console.log(query)
		return this.customQuery(query).then((result)=>{
			let data = result[0]
			let total = result[1]
			let list = []
			for (let i = 0; i < data.length; i++) {
				list.push(this.sintetizeRelation(data[i], {entity:'user_answer'}))
			}
			return { data: list, total_results: total }
		})
	}
	return this
};
util.inherits(User_answer, BaseModel)
module.exports = User_answer