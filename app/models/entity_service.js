/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 15 / 9 / 2017 - 1:25:45
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
let emiter = require('../events/emiter.js').instance
let CONSTANTS = require('../events/constants.js')
var Service = function () {
	var params = [{
		"table": "service",
		"relations": [
			{
				"type": "1-1",
				"name": "category",
				"foreign_name": "name",
				"entity": "category",
				"leftKey": "id_category"
			},
			{
				"type": "1-1",
				"name": "institution",
				"foreign_name": "name",
				"entity": "institution",
				"leftKey": "id_institution"
			},
			{
				"type": "1-n",
				"name": "history",
				"rightKey": "id_service",
				"entity": "service_status"
			},
			{
				"type": "1-1",
				"name": "status",
				"leftKey": "current_status",
				"foreign_name": "name",
				"entity": "status"
			},
			{
				"type": "1-n",
				"name": "comments",
				"entity": "service_comment",
				"rightKey": "id_service"
			},
      {
        "type": "1-n",
        "name": "requisites",
        "rightKey": "id_service",
        "entity": "user_answer"
      },
		],
		"entity": "service",
		"model": "entity"
	}]
	BaseModel.apply(this, params)

	this.getByCurrentStatus = function(date,status){
		let q=`SELECT \`service\`.\`id\` \`key\` FROM \`service\` 
		JOIN (SELECT \`service_status\`.\`id_service\`,MAX(\`service_status\`.\`valid_to\`) FROM \`service_status\` 
		WHERE (
			${status ? `\`service_status\`.\`id_status\` IN ( '${status.join(',')}' ) AND` : ``} 
			\`service_status\`.\`valid_to\` <'${date}' 
		)
		WHERE \`service\`.\`is_active\` = '1'
		GROUP BY \`id_service\`) \`service_status\` ON \`service_status\`.\`id_service\` = \`service\`.\`id\` 
		GROUP BY \`key\` ORDER BY \`service\`.id ;`
		let keys = []
		return this.customQuery(q).then((results)=>{
			results.forEach((result)=>{
				keys.push(result.key)
			})
			if(keys.length == 0){
				return [[],[{total:0}],[]]
			}
			let query = `SELECT SQL_CALC_FOUND_ROWS * FROM view_service 
			WHERE id IN (${keys.join(',')}) ORDER BY id desc
			LIMIT 0,5000;
			SELECT FOUND_ROWS() as total;
			SELECT * FROM view_service_status WHERE id_service IN (${keys.join(',')}) 
			AND id_status = ${CONSTANTS.SERVICE.CUMPLE} ORDER BY timestamp desc;`	
			return this.customQuery(query)
		}).then((result)=>{
			let data = result[0]
			let total = result[1][0].total
			let history = result[2]
			let list = []
			
			let _history = {}
			for (let i = 0; i < history.length; i++) {
				let status = this.sintetizeRelation(history[i], {entity:'service_status'})
				if(!_history[status.id_service]){
					_history[status.id_service] = []
				}
				_history[status.id_service].push(status)
			}

			for (let i = 0; i < data.length; i++) {
				let item = this.sintetizeRelation(data[i], {entity:'service'})
				item.history = _history[item.id]
				list.push(item)
			}
			return { data: list, total_results: total }
		})
	}
	this.asignate = function (service) {
		let q = `SELECT u.id from user u JOIN user_role ON user_role.id_user = u.id WHERE user_role.id_role = 3`
		return this.customQuery(q).then((_admin)=>{
			_admin = _admin[0]
			let q = `SELECT * from request_status WHERE id = '${CONSTANTS.EVALUATION_REQUEST.ASIGNADO}'`
			return this.customQuery(q).
				then((_status) => {
					_status = _status[0]
					let duration = _status.duration
					let alarm = duration - _status.pre_end
					let atime = new Date()
					atime.setDate(atime.getDate() + alarm)
					let ftime = new Date()
					ftime.setDate(ftime.getDate() + duration)
					let q = `SELECT u.id id_user,
						u.email email,
						qt.id id_topic,
						u_a.id id_answer,
						u_a.id_question id_question,
						u.id_availability
						FROM user_answer u_a
						LEFT JOIN questiontopic qt ON qt.id = u_a.id_topic
						LEFT JOIN user_questiontopic ON user_questiontopic.id_topic = qt.id
						LEFT JOIN user u ON u.id = user_questiontopic.id_user
						WHERE u_a.id_service = '${service.id}' 
						ORDER BY u_a.id asc,u.id_availability desc`
					return this.customQuery(q).then((_users) => {
						let _couples = {}
						_users.forEach(function (_user) {
							if (!_couples[_user.id_answer]) {
								_couples[_user.id_answer] = []
							}
							let found = false
							_couples[_user.id_answer].forEach((user)=>{
								if(user.id_user == _user.id_user){
									found = true
								}
							})
							if(!found){
								_couples[_user.id_answer].push(_user)
							}
						}, this);

						let request= []
						for (let answer in _couples) {
							let valid = []
							_couples[answer].forEach((data)=>{
								if(data.email != null){
									valid.push(data)
								}
							})
							let limit = 3
							let _count = valid.length
							let difference = limit - _count
							let index
							if (difference > 0) {
								limit = _count
								for (let i = 0; i < difference; i++) {
									request.push({
										id_user: _admin.id,
										id_answer: answer,
										id_service: service.id,
										id_request_status: CONSTANTS.EVALUATION_REQUEST.ASIGNADO,
										id_question: _couples[answer][0].id_question,
										alert_time:atime.toISOString().split('T')[0],
										end_time:ftime.toISOString().split('T')[0]
									})
								}
							}
	
							while (limit--) {
								index = Math.floor(Math.random() * valid.length)
								let data = valid.slice(index, index+1)[0]
								request.push({
									id_user: data.id_user,
									id_answer: answer,
									id_service: service.id,
									id_request_status: CONSTANTS.EVALUATION_REQUEST.ASIGNADO,
									id_question: data.id_question,
									alert_time:atime.toISOString().split('T')[0],
									end_time:ftime.toISOString().split('T')[0]
								})
								emiter.emit('evaluation_request.asignation',data)
							}
						}
						return request
					})
				})
		})
	}
	this.reasignate = function(request){
		let q = `SELECT u.id id_user,
		u.email email,
		qt.id id_topic,
		u_a.id id_answer,
		u_a.id_question id_question,
		u.id_availability
		FROM user_answer u_a
		JOIN questiontopic qt ON qt.id = u_a.id_topic
		JOIN user_questiontopic ON user_questiontopic.id_topic = qt.id
		JOIN user u ON u.id = user_questiontopic.id_user
		WHERE u_a.id = '${request.id_answer}' 
		AND u.id NOT IN (SELECT id_user FROM evaluation_request WHERE id_answer = ${request.id_answer})
		ORDER BY RAND()`
		return this.customQuery(q).then((_users) => {
			if(_users.length === 0){ //trigger next iteration
				emiter.emit('evaluation_request.updated',request,request)
				return
			}
			let q = `UPDATE evaluation_request SET id_user = ${_users[0].id_user}, id_request_status='${CONSTANTS.EVALUATION_REQUEST.ASIGNADO}' WHERE id='${request.id}'`
			emiter.emit('evaluation_request.asignation',{id_user:_users[0].id_user})
			return this.customQuery(q)
		})
	}
	this.delete = function (id) {
		let q = `SET FOREIGN_KEY_CHECKS = 0;
		DELETE FROM service_status WHERE id_service = '${id}';
		DELETE FROM service_comment WHERE id_service = '${id}';
		DELETE FROM service_comment WHERE id_service = '${id}';
		DELETE FROM user_answer WHERE id_service = '${id}';
		DELETE chats FROM chats JOIN evaluation_request ON chats.id_evaluation_request = evaluation_request.id WHERE evaluation_request.id_service = ${id};
		DELETE FROM evaluation_request WHERE id_service = '${id}';
		DELETE FROM service WHERE id = ${id};
		SET FOREIGN_KEY_CHECKS = 1;
		`
		return this.customQuery(q)
	}
	this.getByPostulateCertificationDate = function(params){
		params = params || {}
		params.limit = params.limit || 20
		params.page = params.page || 1
		params.order = params.order || 'id asc'
		params.filter_field = params.filter_field || []
		params.filter_value = params.filter_value || []
		
		let _filters = {}
		for(let i = 0 ; i < params.filter_field.length ; i++){
			if(!_filters[params.filter_field[i]]){
				_filters[params.filter_field[i]] = []
			}
			_filters[params.filter_field[i]].push(params.filter_value[i])
		}
		let now = new Date()
		now = now.getFullYear() + '-' + (now.getMonth()+1)  + '-' + now.getDate()
		let query = `SELECT s.id FROM service s
		JOIN service_status ss ON  (
			ss.id_service = s.id AND
			ss.id_status = '${CONSTANTS.SERVICE.CUMPLE}' AND ss.valid_to > '${now}'
			${_filters['certification'] ? 'AND DATE(ss.timestamp) =  \''+_filters['certification'][0] +'\' AND ss.id_status = '+CONSTANTS.SERVICE.CUMPLE :''}
		)
		JOIN institution i on s.id_institution = i.id
		WHERE 
		${_filters['postulation'] ? 'DATE(s.timestamp) = \''+_filters['postulation'][0] +'\' AND ' :''}
		${_filters['institution.id'] ? 'i.id = \''+_filters['institution.id'][0] +'\' AND ' :''}
		${_filters['id'] ? 's.id = \''+_filters['id'][0] +'\' AND ' :''}
		${_filters['id_category'] ? 's.id_category = \''+_filters['id_category'][0] +'\' AND ' :''}
		s.is_active = '1'
		ORDER BY s.id desc`
		let keys = []
		return this.customQuery(query).then((results)=>{
			results.forEach((result)=>{
				keys.push(result.id)
			})
			if(keys.length == 0){
				return [[],[{total:0}],[]]
			}
			let query = `SELECT SQL_CALC_FOUND_ROWS * FROM view_service 
			WHERE id IN (${keys.join(',')}) ORDER BY id desc
			LIMIT ${params.limit * (params.page-1)},${params.limit};
			SELECT FOUND_ROWS() as total;
			SELECT * FROM view_service_status WHERE id_service IN (${keys.join(',')}) AND id_status = ${CONSTANTS.SERVICE.CUMPLE} ORDER BY timestamp desc;`	
			return this.customQuery(query)
		}).then((result)=>{
			let data = result[0]
			let total = result[1][0].total
			let history = result[2]
			let list = []
			
			let _history = {}
			for (let i = 0; i < history.length; i++) {
				let status = this.sintetizeRelation(history[i], {entity:'service_status'})
				if(!_history[status.id_service]){
					_history[status.id_service] = []
				}
				_history[status.id_service].push(status)
			}

			for (let i = 0; i < data.length; i++) {
				let item = this.sintetizeRelation(data[i], {entity:'service'})
				item.history = _history[item.id]
				item.valid_to = _history[item.id][0].valid_to
				item.certified = _history[item.id][0].timestamp
				list.push(item)
			}
			return { data: list, total_results: total }
		})
	}
	return this
};
util.inherits(Service, BaseModel)
module.exports = Service