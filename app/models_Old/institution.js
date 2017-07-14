/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * institution
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"nit","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"address","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"website","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"second_email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"phone","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"head_sector","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"designation_act","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_secondname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_lastname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_secondlastname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"leaglrep_document","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_typedoc","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_city","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_region","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_user_creator","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 4 / 2 / 2017 - 20:15:43
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Institution = function () {
	var params = [{
		table:'institution',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"nit","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"address","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"website","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"second_email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"phone","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"head_sector","Type":"tinyint(1)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"designation_act","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_secondname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_lastname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_secondlastname","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"leaglrep_document","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_typedoc","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"legalrep_email","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_city","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_region","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_user_creator","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)

		/**
	 * Get Top entities, supports
	 * {
				limit: params.limit
				page: params.page
			}
	 */
	this.getTop = function(params){
		params = params || {};
		params.page = params.page || "1"
		params.limit = params.limit || "10"
		var query = `SELECT i.*,count.services FROM institution i
		JOIN (SELECT id_institution, count(*) services 
			FROM service 
			LEFT JOIN service_status ss on ss.id_service = service.id 
			WHERE ss.id_status = 4 
			GROUP BY id_institution
			LIMIT ${((parseInt(params.page) - 1) * params.limit)} , ${params.limit} 
			) AS count ON i.id = count.id_institution
			ORDER BY services DESC;
			SELECT COUNT(DISTINCT id_institution) total FROM service;`
		return this.customQuery(query).then((result) => {
      return { data: result[0], total_results: result[1][0].total }
    })
	}

	return this
};
util.inherits(Institution, BaseModel)
module.exports = Institution