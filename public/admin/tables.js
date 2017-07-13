if(!dmt){
	var dmt = {}
}
dmt.tables = {"availability":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"category":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"institution":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"nit","type":"string","disabled":false,"key":false},{"name":"address","type":"string","disabled":false,"key":false},{"name":"website","type":"string","disabled":false,"key":false},{"name":"email","type":"string","disabled":false,"key":false},{"name":"second_email","type":"string","disabled":false,"key":false},{"name":"phone","type":"string","disabled":false,"key":false},{"name":"head_sector","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false},{"name":"designation_act","type":"string","disabled":false,"key":false},{"name":"legalrep_name","type":"string","disabled":false,"key":false},{"name":"legalrep_secondname","type":"string","disabled":false,"key":false},{"name":"legalrep_lastname","type":"string","disabled":false,"key":false},{"name":"legalrep_secondlastname","type":"string","disabled":false,"key":false},{"name":"leaglrep_document","type":"string","disabled":false,"key":false},{"name":"legalrep_typedoc","type":"int","disabled":false,"key":false},{"name":"legalrep_email","type":"string","disabled":false,"key":false},{"name":"flag_hall","type":"boolean","disabled":false,"key":false},{"name":"ranking_hall","type":"int","disabled":false,"key":false},{"name":"id_city","type":"int","disabled":false,"key":false},{"name":"id_region","type":"int","disabled":false,"key":false},{"name":"id_user_creator","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"question_answer":{"fields":[{"name":"id_question","type":"int","disabled":false,"key":false},{"name":"id_answer","type":"int","disabled":false,"key":false}],"defaultSort":"id_question"},"region":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"id_capital","type":"int","disabled":false,"key":false},{"name":"code","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"type":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"institution_user":{"fields":[{"name":"id_institution","type":"int","disabled":false,"key":false},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"role","type":"string","disabled":false,"key":false},{"name":"admin","type":"boolean","disabled":false,"key":false},{"name":"certificate","type":"text","disabled":false,"key":false}],"defaultSort":"id_institution"},"user":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"picture","type":"string","disabled":false,"key":false},{"name":"name","type":"string","disabled":false,"key":false},{"name":"secondname","type":"string","disabled":false,"key":false},{"name":"lastname","type":"string","disabled":false,"key":false},{"name":"secondlastname","type":"string","disabled":false,"key":false},{"name":"email","type":"string","disabled":false,"key":false},{"name":"phone","type":"string","disabled":false,"key":false},{"name":"extension","type":"string","disabled":false,"key":false},{"name":"mobile","type":"string","disabled":false,"key":false},{"name":"active","type":"boolean","disabled":false,"key":false},{"name":"verified","type":"boolean","disabled":false,"key":false},{"name":"password","type":"text","disabled":false,"key":false},{"name":"tmp_pwd","type":"boolean","disabled":false,"key":false},{"name":"flag_hall","type":"boolean","disabled":false,"key":false},{"name":"ranking_hall","type":"int","disabled":false,"key":false},{"name":"terms","type":"boolean","disabled":false,"key":false},{"name":"newsletter","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false},{"name":"id_availability","type":"int","disabled":false,"key":false},{"name":"id_level","type":"int","disabled":false,"key":false},{"name":"id_city","type":"int","disabled":false,"key":false},{"name":"id_type_document","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"session":{"fields":[{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"agent","type":"text","disabled":false,"key":false},{"name":"ip","type":"string","disabled":false,"key":false},{"name":"token","type":"text","disabled":false,"key":false},{"name":"expires","type":"date","disabled":false,"key":false}],"defaultSort":"id_user"},"role":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"media":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"url","type":"string","disabled":false,"key":false},{"name":"type","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"social":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"icon","type":"string","disabled":false,"key":false},{"name":"link","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"type_document":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"type","type":"string","disabled":false,"key":false},{"name":"document","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"message_media":{"fields":[{"name":"id_media","type":"int","disabled":false,"key":false},{"name":"id_message","type":"int","disabled":false,"key":false}],"defaultSort":"id_media"},"permission":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"message":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"text","type":"text","disabled":false,"key":false},{"name":"url","type":"text","disabled":false,"key":false},{"name":"id_topic","type":"int","disabled":false,"key":false},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"form":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"id_category","type":"int","disabled":false,"key":false},{"name":"id_topic","type":"int","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"config":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"key","type":"string","disabled":false,"key":false},{"name":"value","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"status":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"evaluation_request":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"id_user_answer","type":"int","disabled":false,"key":false},{"name":"id_service","type":"int","disabled":false,"key":false},{"name":"id_request_status","type":"int","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false},{"name":"result","type":"boolean","disabled":false,"key":false}],"defaultSort":"id"},"level":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"answer":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"text","type":"text","disabled":false,"key":false},{"name":"value","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"contact":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"lastname","type":"string","disabled":false,"key":false},{"name":"topic","type":"string","disabled":false,"key":false},{"name":"message","type":"text","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"user_answer":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"id_answer","type":"int","disabled":false,"key":false},{"name":"id_question","type":"int","disabled":false,"key":false},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"datetime","type":"datetime","disabled":true,"key":false},{"name":"id_media","type":"int","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false},{"name":"requisite","type":"text","disabled":false,"key":false},{"name":"support_legal","type":"text","disabled":false,"key":false},{"name":"justifiaction","type":"text","disabled":false,"key":false},{"name":"id_topic","type":"int","disabled":false,"key":false},{"name":"evidence","type":"text","disabled":false,"key":false},{"name":"help","type":"text","disabled":false,"key":false},{"name":"id_service","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"permission_role":{"fields":[{"name":"id_role","type":"int","disabled":false,"key":false},{"name":"id_permission","type":"int","disabled":false,"key":false}],"defaultSort":"id_role"},"user_answer_evaluation":{"fields":[{"name":"id_user_answer","type":"int","disabled":false,"key":false},{"name":"rate","type":"boolean","disabled":false,"key":false},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id_user_answer"},"question":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"text","type":"text","disabled":false,"key":false},{"name":"id_type","type":"int","disabled":false,"key":false},{"name":"id_topic","type":"int","disabled":false,"key":false},{"name":"id_form","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"topic":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"id_parent","type":"int","disabled":false,"key":false},{"name":"private","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"request_status":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"questiontopic":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false}],"defaultSort":"id"},"city":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"code","type":"string","disabled":false,"key":false},{"name":"latitude","type":"number","disabled":false,"key":false},{"name":"longitude","type":"number","disabled":false,"key":false},{"name":"id_region","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"service_comment":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"id_service","type":"int","disabled":false,"key":false},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"text","type":"text","disabled":false,"key":false},{"name":"rate","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"form_question":{"fields":[{"name":"id_form","type":"int","disabled":false,"key":false},{"name":"id_question","type":"int","disabled":false,"key":false},{"name":"order","type":"int","disabled":false,"key":false}],"defaultSort":"id_form"},"faq":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"question","type":"text","disabled":false,"key":false},{"name":"answer","type":"text","disabled":false,"key":false},{"name":"active","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"},"user_category":{"fields":[{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"id_category","type":"int","disabled":false,"key":false}],"defaultSort":"id_user"},"user_role":{"fields":[{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"id_role","type":"int","disabled":false,"key":false}],"defaultSort":"id_user"},"service":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"name","type":"string","disabled":false,"key":false},{"name":"url","type":"text","disabled":false,"key":false},{"name":"id_institution","type":"int","disabled":false,"key":false},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"hash","type":"string","disabled":false,"key":false},{"name":"rate","type":"number","disabled":false,"key":false},{"name":"id_category","type":"int","disabled":false,"key":false},{"name":"test_user","type":"string","disabled":false,"key":false},{"name":"test_password","type":"string","disabled":false,"key":false},{"name":"is_product","type":"boolean","disabled":false,"key":false},{"name":"is_service","type":"boolean","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false},{"name":"current_status","type":"int","disabled":false,"key":false}],"defaultSort":"id"},"service_status":{"fields":[{"name":"id_service","type":"int","disabled":false,"key":false},{"name":"id_status","type":"int","disabled":false,"key":false},{"name":"level","type":"boolean","disabled":false,"key":false},{"name":"valid_to","type":"date","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id_service"},"user_questiontopic":{"fields":[{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"id_topic","type":"int","disabled":false,"key":false}],"defaultSort":"id_user"},"message_votes":{"fields":[{"name":"id","type":"int","disabled":true,"key":true},{"name":"id_user","type":"int","disabled":false,"key":false},{"name":"id_message","type":"int","disabled":false,"key":false},{"name":"timestamp","type":"datetime","disabled":true,"key":false}],"defaultSort":"id"}};
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}
