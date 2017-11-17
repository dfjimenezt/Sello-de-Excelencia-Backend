/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 15 / 11 / 2017 - 16:31:36
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Institution = function () {
	var params = [{
	"table": "institution",
	"relations": [
		{
			"type": "1-1",
			"entity": "city",
			"name": "city",
			"leftKey": "id_city",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"entity": "region",
			"name": "region",
			"leftKey": "id_region",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"entity": "country",
			"name": "country",
			"leftKey": "id_country",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"entity": "institutionType",
			"name": "type",
			"leftKey": "id_institution_type",
			"foreign_name": "name"
		},
		{
			"type": "n-n",
			"name": "users",
			"entity": "user",
			"intermediate": {
				"entity": "institution_user",
				"leftKey": "id_institution",
				"rightKey": "id_user"
			}
		},
		{
			"type": "1-n",
			"name": "service",
			"rightKey": "id_institution",
			"entity": "service"
		},
		{
			"type": "1-n",
			"name": "points",
			"rightKey": "id_institution",
			"entity": "points"
		}
	],
	"entity": "institution",
	"model": "entity"
}]
	BaseModel.apply(this, params)
	this.getUser = function(id){
		let q = `SELECT u.* FROM user u 
		JOIN institution_user u_i on u_i.id_user = u.id
		JOIN institution i on i.id = u_i.id_institution
		WHERE i.id = '${id}'`
		return this.customQuery(q)
	}
	this.getPerformance = function(institution){
		let q = `SELECT i.name Entidad, 
			s.name Servicio, 
			IF(next.id_service = current.id_service,s_from.name,'') Anterior, s_to.name Actual, 
			IF(next.id_service = current.id_service,TIMEDIFF(next.timestamp,current.timestamp),0) Duración,
			IF(next.id_service = current.id_service,current.timestamp,'') Inicial,  
			IF(next.id_service = current.id_service,next.timestamp,'') Final
			FROM service_status next join 
			(select * from service_status ) current 
			JOIN service s ON s.id = current.id_service 
			JOIN institution i ON i.id = s.id_institution
			JOIN status s_from ON s_from.id = current.id_status
			JOIN status s_to ON s_to.id = next.id_status
			WHERE next.id = current.id +1
			${institution ? 'AND i.id = \''+institution+'\'':''}
			ORDER BY i.id,s.id`
		return this.customQuery(q).then((results)=>{
			return {data:results}
		})
	}
	return this
};
util.inherits(Institution, BaseModel)
module.exports = Institution