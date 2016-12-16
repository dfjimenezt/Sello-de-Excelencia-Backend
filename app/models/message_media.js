var BaseModel = require('../utils/model.js');
var util = require('util');

var Message_media = function () {
	var params = ["message_media", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Message_media, BaseModel);

module.exports = Message_media;