var BaseModel = require('../utils/model.js');
var util = require('util');

var Message_votes = function () {
	var params = ["message_votes", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Message_votes, BaseModel);

module.exports = Message_votes;