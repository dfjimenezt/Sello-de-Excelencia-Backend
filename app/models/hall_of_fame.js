/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * hall_of_fame
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ranking","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"date","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_role","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Hall_of_fame = function () {
	var params = [{
		table:'hall_of_fame',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ranking","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"date","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_role","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	this.updateTop = function(type){
		let q = null
		if(type == 2){
			q = 'INSERT INTO `hall_of_fame` (`points`,`date`,`name`,`id_user`,`id_role`)  ( '+
			'SELECT SUM(`p`.`value`) points, CURRENT_DATE() date, CONCAT(`u`.`name`," ",`u`.`secondname`," ",`u`.`lastname`," ",`u`.`secondlastname`),`u`.`id`,`u_r`.`id_role` '+
			'FROM `points` `p` '+
			'LEFT JOIN `user` `u` on `u`.`id` = `p`.`id_user` '+
			'JOIN `user_role` `u_r` on `u_r`.`id_user` = `u`.`id` '+
			'WHERE `u_r`.`id_role` = 2 GROUP BY `p`.`id_user` ORDER BY points desc LIMIT 10 );';

		}
		if(type==4){
			 q = 'INSERT INTO `hall_of_fame` (`points`,`date`,`name`,`id_institution`,`id_role`)  ( '+
			'SELECT SUM(`p`.`value`) points, CURRENT_DATE() date, `i`.`name`,`i`.`id`,4 '+
			'FROM `points` `p` '+
			'LEFT JOIN `institution` `i` on `i`.`id` = `p`.`id_institution` '+
			'GROUP BY `p`.`id_institution` ORDER BY points desc LIMIT 10 );'
		}
		
		return this.customQuery(q)
	}
	return this
};
util.inherits(Hall_of_fame, BaseModel)
module.exports = Hall_of_fame