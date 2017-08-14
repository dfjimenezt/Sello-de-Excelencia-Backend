/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * hall_of_fame
 * [{"Field":"role","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ranking","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"date","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}]
 * DMT 2017
 * GENERATED: 11 / 8 / 2017 - 18:53:10
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Hall_of_fame = function () {
	var params = [{
		table:'hall_of_fame',
		fields :[{"Field":"role","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ranking","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"date","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Hall_of_fame, BaseModel)
module.exports = Hall_of_fame