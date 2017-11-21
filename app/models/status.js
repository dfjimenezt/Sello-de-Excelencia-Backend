/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * status
 * [
	{
		"Field": "id",
		"Type": "int(11)",
		"Null": "NO",
		"Key": "PRI",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "name",
		"Type": "varchar(50)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "duration",
		"Type": "int(11)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "pre_end",
		"Type": "int(11)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "alert",
		"Type": "tinyint(1)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "description",
		"Type": "text",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	}
]
 * DMT 2017
 * GENERATED: 21 / 11 / 2017 - 10:49:42
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Status = function () {
	var params = [{
		table:'status',
		fields :[
	{
		"Field": "id",
		"Type": "int(11)",
		"Null": "NO",
		"Key": "PRI",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "name",
		"Type": "varchar(50)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "duration",
		"Type": "int(11)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "pre_end",
		"Type": "int(11)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "alert",
		"Type": "tinyint(1)",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	},
	{
		"Field": "description",
		"Type": "text",
		"Null": "YES",
		"Key": "",
		"Default": null,
		"Extra": ""
	}
],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Status, BaseModel)
module.exports = Status