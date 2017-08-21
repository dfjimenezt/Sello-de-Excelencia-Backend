/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * media
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"url","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"type","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}]
 * DMT 2017
 * GENERATED: 21 / 8 / 2017 - 6:57:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Media = function () {
	var params = [{
		table:'media',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"url","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"type","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Media, BaseModel)
module.exports = Media