/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Service_comment = function () {
	var params = [{"table":"service_comment","relations":[{"type":"1-1","entity":"user","name":"user","leftKey":"id_user","foreign_name":"email"}],"entity":"service_comment","model":"entity"}]
	BaseModel.apply(this, params)
	this._create = this.create
	this.create = function(body){
		return this._create(body)
		.then(() => {
			query = `
					SELECT AVG(sc.rate) AS average
					FROM service_comment as sc
					WHERE sc.id_service = ${body.id_service}`
			return this.customQuery(query).then((average) => {
				query = `
						UPDATE service AS s
						SET s.rate = ${average[0].average}
						WHERE s.id = ${body.id_service};`
				return this.customQuery(query).then(() => {
					return average[0].average.toFixed(2)
				})
			})
		})
	}
	return this
};
util.inherits(Service_comment, BaseModel)
module.exports = Service_comment