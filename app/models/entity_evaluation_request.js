/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Evaluation_request = function () {
	var params = [
		{
			"table":"evaluation_request",
			"relations":[
				{
					"type":"1-1",
					"entity":"user",
					"leftKey":"id_user",
					"name":"user",
					"foreign_name":"email"
				},
				{
					"type":"1-1",
					"entity":"user_answer",
					"leftKey":"id_answer",
					"name":"user_answer",
					"foreign_name":"name"
				},
				{
					"type":"1-1",
					"entity":"question",
					"leftKey":"id_question",
					"name":"question",
					"foreign_name":"name"
				},
				{
					"type":"1-1",
					"entity":"service",
					"leftKey":"id_service",
					"name":"service",
					"foreign_name":"name"
				},
				{
					"type":"1-1",
					"entity":"request_status",
					"leftKey":"id_request_status",
					"name":"status",
					"foreign_name":"name"
				},
				{
					"type":"1-n",
					"entity":"chats",
					"name":"chats",
					"rightKey":"id_evaluation_request"
				}
			],
			"entity":"evaluation_request",
			"model":"entity"
		}
	]
	BaseModel.apply(this, params)
	this.toActivity= function(user,params){
		params = params || {}
		params.limit = params.limit || 20
		params.page = params.page || 1
		params.order = params.order || 'id asc'
		
		let _filters = {}
		for(let i = 0 ; i < params.filter_field.length ; i++){
			if(!_filters[params.filter_field[i]]){
				_filters[params.filter_field[i]] = []
			}
			_filters[params.filter_field[i]].push(params.filter_value[i])
		}

		let query = `SELECT SQL_CALC_FOUND_ROWS * FROM view_evaluation_request 
		WHERE id IN (
			SELECT e_r.id FROM evaluation_request e_r
			JOIN service s ON  e_r.id_service = s.id
			JOIN question q ON  e_r.id_question = q.id
			JOIN questiontopic qt ON  q.id_topic = qt.id
			LEFT JOIN institution i on i.id = s.id_institution
			WHERE 
			${params['institution.id'] ? 's.id_institution = '+params['institution.id'] +' AND ' :''}
			${params['service.id'] ? 's.id = '+params['service.id'] +' AND ' :''}
			${params['region.id'] ? 'i.id_region = '+params['region.id'] +' AND ' :''}
			${params['category.id'] ? 'qt.id_category = '+params['category.id'] +' AND ' :''}
			${params['topic.id'] ? 'qt.id = '+params['topic.id'] +' AND ' :''}
			${params['level'] ? 'q.level = '+params['level'] +' AND ' :''}
			e_r.id_request_status IN (${_filters['id_request_status'].join(',')}) AND 
			e_r.id_user IN (${_filters['id_user'].join(',')}) 
			ORDER BY e_r.${params.order}
		)
		LIMIT ${params.limit * (params.page-1)},${params.limit};
		SELECT FOUND_ROWS() as total;`
		console.log(query)
		return this.customQuery(query).then((result)=>{
			let data = result[0]
			let total = result[1][0].total
			let list = []
			for (let i = 0; i < data.length; i++) {
				list.push(this.sintetizeRelation(data[i], {entity:'evaluation_request'}))
			}
			return { data: list, total_results: total }
		})
	}
	return this
};
util.inherits(Evaluation_request, BaseModel)
module.exports = Evaluation_request