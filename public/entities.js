dmt.entities = {
	"user": {
		defaultSort: "id",
		endpoint: "/api/configuration/",//get service
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false,
				searchable: "true"
			},
			{
				name: "lastname",
				type: "string",
				disabled: false,
				searchable: "true"
			},
			{
				name: "email",
				type: "email",
				disabled: false
			},
			{
				name: "phone",
				type: "string",
				disabled: false
			},
			{
				name: "extension",
				type: "string",
				disabled: false
			},
			{
				name: "mobile",
				type: "string",
				disabled: false
			},
			{
				name: "active",
				type: "boolean",
				disabled: false
			},
			{
				name: "verified",
				type: "boolean",
				disabled: true
			},
			{
				name: "tmp_pwd",
				type: "boolean",
				disabled: false
			},
			{
				name: "terms",
				type: "boolean",
				disabled: false
			},
			{
				name: "timestamp",
				type: "timestamp",
				disabled: true
			}
		]
	},
	"role": {
		defaultSort: "id",
		endpoint: "/api/configuration/",//get service
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			}
		]
	},
	"permission": {
		defaultSort: "id",
		endpoint: "/api/configuration/",//get service
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			}
		]
	},
	"permission_role": {
		defaultSort: "id_role",
		endpoint: "/api/configuration/",//get service
		fields: [
			{
				name: "id_role",
				type: "link",
				disabled: false,
				table: "role",
				foreign_key: "id",
				foreign_name: "name",
				readOnly: true,
				key: "true"
			},
			{
				name: "id_permission",
				type: "link",
				disabled: false,
				table: "permission",
				foreign_key: "id",
				foreign_name: "name",
				readOnly: true,
				key: "true"
			}
		]
	},
	"institution": {
		"defaultSort": "id",
		endpoint: "/api/place/",
		filters: [
			{
				name: "Region",
				table: "region",
				endpoint: "/api/place/",
				foreign_key: "id",
				foreign_name: "name",
				fields: [{
					name: "id_city",
					foreign_key: "id_region"
				}],
			}
		],
		"fields": [
			{ "name": "id", "type": "int", "disabled": true, "key": true },
			{ "name": "name", "type": "string", "disabled": false, "key": false },
			{ "name": "nit", "type": "string", "disabled": false, "key": false },
			{ "name": "address", "type": "string", "disabled": false, "key": false },
			{ "name": "website", "type": "string", "disabled": false, "key": false },
			{ "name": "email", "type": "string", "disabled": false, "key": false },
			{ "name": "second_email", "type": "string", "disabled": false, "key": false },
			{ "name": "phone", "type": "string", "disabled": false, "key": false },
			{ "name": "head_sector", "type": "int", "disabled": false, "key": false },
			{ "name": "designation_act", "type": "file", "disabled": false, "key": false },
			{ "name": "legalrep_name", "type": "string", "disabled": false, "key": false },
			{ "name": "legalrep_secondname", "type": "string", "disabled": false, "key": false },
			{ "name": "legalrep_lastname", "type": "string", "disabled": false, "key": false },
			{ "name": "legalrep_secondlastname", "type": "string", "disabled": false, "key": false },
			{ "name": "leaglrep_document", "type": "string", "disabled": false, "key": false },
			{ "name": "legalrep_typedoc", "type": "int", "disabled": false, "key": false },
			{ "name": "legalrep_email", "type": "string", "disabled": false, "key": false },
			{
				name: "id_city",
				type: "link",
				disabled: false,
				table: "city",
				foreign_key: "id",
				foreign_name: "name",
			},
			{
				name: "id_user_creator",
				type: "link",
				disabled: false,
				endpoint: "/api/configuration/",
				table: "user",
				foreign_key: "id",
				foreign_name: "name"
			},
			{ "name": "timestamp", "type": "string", "disabled": true, "key": false }
		]
	},
	"city": {
		defaultSort: "id",
		endpoint: "/api/place/",//get service
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			},
			{
				name: "code",
				type: "string",
				disabled: false
			},
			{
				name: "id_region",
				type: "link",
				readOnly: "true",
				table: "region",
				foreign_key: "id",
				foreign_name: "name"
			}
		]
	},
	"region": {
		defaultSort: "id",
		endpoint: "/api/place/",//get service
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			},
			{
				name: "id_capital",
				type: "link",
				readOnly: "true",
				table: "city",
				foreign_key: "id",
				foreign_name: "name"
			}
		]
	},
	"service": {
		defaultSort: "name",
		endpoint: "/api/service/",
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			},
			{
				name: "url",
				type: "string",
				disabled: false
			},
			{
				name: "email",
				type: "email",
				disabled: false
			},
			{
				name: "second_email",
				type: "email",
				disabled: false
			},
			{
				name: "id_institution",
				type: "link",
				disabled: false,
				table: "institution",
				endpoint: "/api/place/",
				foreign_key: "id",
				foreign_name: "name"
			},
			{
				name: "id_user_creator",
				type: "link",
				disabled: false,
				table: "user",
				endpoint: "/api/configuration/",
				foreign_key: "id",
				foreign_name: "name"
			},
			{
				name: "hash",
				type: "string",
				disabled: false
			},
			{
				name: "rate",
				type: "int",
				disabled: true
			},
			{
				name: "id_category",
				type: "link",
				disabled: false,
				table: "category",
				endpoint: "/api/service/",
				foreign_key: "id",
				foreign_name: "name"
			}
		]
	},
	"category": {
		endpoint: "/api/service/",
		defaultSort: "id",
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			}
		]
	},
	"topic": {
		defaultSort: "id",
		endpoint: "/api/forum/",
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "name",
				type: "string",
				disabled: false
			},
			{
				name: "id_parent",
				type: "link",
				disabled: false,
				table: "topic",
				foreign_key: "id",
				foreign_name: "name"
			}
			, {
				name: "private",
				type: "boolean",
				disabled: false
			}
		]
	},
	"message": {
		defaultSort: "id",
		endpoint: "/api/forum/",
		fields: [
			{
				name: "id",
				type: "int",
				disabled: true,
				key: "true"
			},
			{
				name: "text",
				type: "string",
				disabled: false
			},
			{
				name: "id_topic",
				type: "link",
				disabled: false,
				table: "topic",
				foreign_key: "id",
				foreign_name: "name"
			}
		]
	},
	"availability": {
		"fields": [{ "name": "id", "type": "int", "disabled": true, "key": true }, { "name": "name", "type": "string", "disabled": false, "key": false }], "defaultSort": "id"
	},
	"config": {
		endpoint: "/api/configuration/",//get service
		"fields": [{ "name": "id", "type": "int", "disabled": true, "key": true }, { "name": "key", "type": "string", "disabled": false, "key": false }, { "name": "value", "type": "string", "disabled": false, "key": false }], "defaultSort": "id"
	},
	"user_category": {
		endpoint: "/api/configuration/",
		"fields": [
			{
				name: "id_user",
				type: "link",
				disabled: false,
				table: "user",
				foreign_key: "id",
				foreign_name: "name",
				readOnly: true,
				key: "true"
			},
			{
				name: "id_category",
				type: "link",
				disabled: false,
				table: "user",
				foreign_key: "id",
				foreign_name: "name",
				endpoint: "/api/service/",//get service
				readOnly: true,
				key: "true"
			},
		],
		"defaultSort": "id_user"
	},
	"user_questiontopic": {
		endpoint: "/api/configuration/",
		"fields": [
			{
				name: "id_user",
				type: "link",
				disabled: false,
				table: "user",
				foreign_key: "id",
				foreign_name: "name",
				readOnly: true,
				key: "true"
			},
			{
				name: "id_topic",
				type: "link",
				disabled: false,
				table: "questiontopic",
				endpoint: "/api/service/",//get service
				foreign_key: "id",
				foreign_name: "name",
				readOnly: true,
				key: "true"
			},
		],
		"defaultSort": "id_user"
	},
	"questiontopic": {
		endpoint: "/api/service/",
		"fields": [{ "name": "id", "type": "int", "disabled": true, "key": true }, { "name": "name", "type": "string", "disabled": false, "key": false }], "defaultSort": "id"
	},
	"form_question":{
		endpoint: "/api/service/",
		"defaultSort" : "id_form",
		"fields":[
			{"name":"id_form","type":"int","disabled":false,"key":false},
			{"name":"id_question","type":"int","disabled":false,"key":false},
			{"name":"order","type":"int","disabled":false,"key":false}
			]
		},
	"question":{
		endpoint: "/api/service/",
		"fields":[
			{"name":"id","type":"int","disabled":true,"key":true},
			{"name":"text","type":"text","disabled":false,"key":false},
			{"name":"id_type","type":"int","disabled":false,"key":false},
			{"name":"id_topic","type":"int","disabled":false,"key":false}
			],
			"defaultSort":"id"
		},
	"form":{
		endpoint: "/api/service/",
		"fields":[
			{"name":"id","type":"int","disabled":true,"key":true},
			{"name":"name","type":"string","disabled":false,"key":false},
			{"name":"id_category","type":"link","table":"category","foreign_key":"id","foreign_name":"name","disabled":false,"key":false},
			{"name":"id_topic","type":"link","table":"questiontopic","foreign_key":"id","foreign_name":"name","disabled":false,"key":false},
			{"name":"timestamp","type":"","disabled":true,"key":false}
			],
			"defaultSort":"id"
		},
	"type":{
		endpoint: "/api/service/",
		"fields":[
			{"name":"id","type":"int","disabled":true,"key":true},
			{"name":"name","type":"string","disabled":false,"key":false}
			],
			"defaultSort":"id"
		}
}