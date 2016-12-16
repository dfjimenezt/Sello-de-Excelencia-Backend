var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
var auth_ctrl = require("./auth.js");

var question_model = require("../models/city.js");
var category_model = require("../models/region.js");
var form_model = require("../models/institution.js");
var form_question = require("../models/form_question.js");
var type_model = require("../models/type.js");
var question_answer = require("../models/question_answer.js");
var anwser_model = require("../models/answer.js");
var user_answer_model = require("../models/user_answer.js");
var user_answer_evaluation_model = require("../models/user_answer_evaluation");


var Questions = function(){
	var auth = new auth_ctrl();
	var question = new question_model();
	var category = new category_model();
	var form = new form_model();
	var form_question = new form_question();
	var type = new type_model();
	var question = new question_model();
	var answer = new answer_model();
	var user_answer = new user_answer_model();
	var user_answer_evaluation = new user_answer_evaluation_model();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	/**
	 * get Forms by @param id or @param category
	 */
	var get_forms = function(queryParams){
		if(queryParams.id){
			return form.getByUid(queryParams.id);
		}else if(queryParams.category){
			return form.getByParams({id_category:queryParams.category})
		}else{
			return form.getAll();
		}
	};

	/**
	 * get Questions by @param form
	 */
	var get_questions = function(queryParams){
		if(queryParams.form){
			return form.getByForm(queryParams.form);
		}else{
			return form.getAll();
		}
	};
	
	getMap.set("get_forms",get_forms);
	getMap.set("get_question",get_questions);

	/**
	 * create an user answer to a question.
	 */
	var create_user_answer = function(token,body,files){
		return auth.authorize(token,"platform").then(function(authorization){
			if(!authorization){
				return {error:Errors[4]};
			}
			if(files){
				
			}else{
				user_answer.create({
					id_user:authorization.id,
					id_answer:body.id_answer,
					id_question:body.id_question,
					text:body.text
				});
				return {error:Errors[0]};
			}
		});
	};

	/**
	 * Evaluate an answer given by an user, it requires evaluator access
	 */
	var evaluate_answer = function(token,body){
		return auth.authorize(token,"evaluate").then(function(authorization){
			if(!authorization){
				return {error:Errors[4]};
			}
			user_answer_evaluation.create({
				id_user_answer:body.id_user_answer,
				rate:body.rate,
				id_user:authorization.id
			});
		});
	};

	/**
	 * create a possible answer
	 */
	var create_answer = function(token,body,files){
		return auth.authorize(tooken,"admin").then(function(authorization){
			answer.create({
				text:body.text,
				value:body.value
			});
			return {error:Errors[0]};
		});
	};
	/**
	 * create a question
	 */
	var create_question = function(token,body,files){
		return auth.authorize(tooken,"admin").then(function(authorization){
			question.create({
				text:body.text,
				id_type:body.id_type
			});
			return {error:Errors[0]};
		});
	};
	/**
	 * bind question_form
	 */
	var bind_question_form = function(token,body){
		return auth.authorization(token,"admin").then(function(authorization){
			form_question.create({
				id_form:body.id_form,
				id_question:id_question
			})
		});
	};
	/**
	 * bind question_answer
	 */
	var bind_question_answer = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			question_answer.create({
				id_question:body.id_question,
				id_answer:body.id_answer
			});
			return {error:Errors[0]};
		});
	};

	postMap.set("create_answer",create_answer);
	postMap.set("evaluate_answer",evaluate_answer);
	postMap.set("create_user_answer",create_user_answer);
	postMap.set("create_question",create_question);
	postMap.set("bind_question_answer",bind_question_answer);
	postMap.set("bind_question_form",bind_question_form);

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Questions, BaseController);

module.exports = Questions;