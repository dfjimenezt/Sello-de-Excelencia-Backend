/*
This are the reported errors.
*/
module.exports = {
	//Use to report that everything was ok
	NO_ERROR:{ code: 0, message: "NO ERROR" , htmlCode:"200"},
	//AUTHORIZATION ERRORS CODES STARTING WITH 1
	AUTHORIZATION:{
		NOT_AUTHORIZED:{ code: 100, message: "NOT AUTHORIZED", htmlCode:"303" },
		TOKEN_EXPIRED:{ code: 101, message: "TOKEN EXPIRED", htmlCode:"400" },
		SQL_INJECTION:{code: 102, message: "SQL INJECTION" ,htmlCode:"303"}
	},
	//USER AUTHENTICATION ERRORS
	LOGIN:{
		LOGIN_FAILED:{ code: 200, message: "LOGIN FAILED", htmlCode:"200" },
		USER_EXISTS:{ code: 201, message: "USER ALREADY EXISTS" , htmlCode:"200"},
		USER_NOT_EXISTS:{ code: 202, message: "USER DOESNT EXISTS" , htmlCode:"200"},
	},
	
	//DATABASE ERRORS
	SYSTEM:{
		DATABASE_ERROR:{ code: 300, message: "DATABASE PROBLEM", htmlCode:"500" },
		THIRD_SERVICE:{ code: 301, message: "FAIL IN AN EXTERNAL SERVICE" , htmlCode:"500"}
	},
	
	//LOGIC ERRORS
	BAD_REQUEST:{
		MALFORMED_REQUEST:{ code: 400, message: "MALFORMED REQUEST", htmlCode:"400" },
		EMPTY: { code: 401, message: "EMPTY" },
		FILE_NOT_SUPPORTED: { code: 402, message: "NOT TYPE FILE SUPPORT", htmlCode:"400" },
		NOT_ENOUGH_PARAMS:{ code: 403, message: "INSUFFICIENT PARAMETERS", htmlCode:"400" },
	},
	
};