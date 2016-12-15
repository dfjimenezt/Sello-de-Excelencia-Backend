/*
This are the reported errors.
*/
module.exports = [
	{ code: "0", message: "NO ERROR" , htmlCode:"200"},
	{ code: "1", message: "TOKEN EXPIRED", htmlCode:"400" },
	{ code: "2", message: "INVALID SUSCRIPTION", htmlCode: "304" },
	{ code: "3", message: "NOT AUTHORIZED", htmlCode:"303" },
	{ code: "4", message: "MALFORMED REQUEST", htmlCode:"400" },
	{ code: "5", message: "LOGIN FAILED", htmlCode:"200" },
	{ code: "6", message: "DATABASE PROBLEM", htmlCode:"500" },
	{ code: "7", message: "EMPTY" },
	{ code: "8", message: "NOT TYPE FILE SUPPORT", htmlCode:"400" },
	{ code: "9", message: "INSUFFICIENT PARAMETERS", htmlCode:"400" },
	{ code: "10", message: "USER ALREADY EXIST" , htmlCode:"200"},
	{ code: "11", message: "USER DOESNT EXIST" , htmlCode:"200"},
	{ code: "12", message: "FAIL IN AN EXTERNAL SERVICE" , htmlCode:"500"},	
	{ code: "13", message: "SQL INJECTION" ,htmlCode:"303"}
];