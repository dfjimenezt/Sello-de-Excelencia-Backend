if(!dmt){
	var dmt = {}
}
dmt.tables = {
	"message": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "url",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_topic",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"banner": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "directory",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_type_banner",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "position",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"faq": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "question",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "answer",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "active",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"institution_user": {
		"fields": [
			{
				"name": "id_institution",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "role",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "admin",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "certificate",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_institution"
	},
	"institutionType": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"availability": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"questiontopic": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_usertype",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_category",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"form": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_category",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"institution": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "nit",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "address",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "website",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "email",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "second_email",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "extension_phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "head_sector",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "designation_act",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_secondname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_lastname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_secondlastname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_document",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_typedoc",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_email",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "legalrep_mobile",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_city",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_region",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_country",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user_creator",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_institution_type",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"service_status": {
		"fields": [
			{
				"name": "id_service",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_status",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "level",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "valid_to",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id_service"
	},
	"message_media": {
		"fields": [
			{
				"name": "id_media",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_message",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_media"
	},
	"role": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"footer": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "title",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"media": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "url",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "type",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"type_document": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"evaluation_request": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_answer",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_service",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_request_status",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_question",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "result",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "branch",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "justify_reject",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "alert_time",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "end_time",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"contact": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "lastname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "topic",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "message",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"usertype": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"ciudades": {
		"fields": [
			{
				"name": "id_region",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "name",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_region"
	},
	"country": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "nacionalidad",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_capital",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"type": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"social": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "icon",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "link",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"region": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_capital",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_country",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "code",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"hall_of_fame": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "ranking",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "points",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "date",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_role",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"request_status": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"category": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"servicios_en_linea": {
		"fields": [
			{
				"name": "Etapa",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Requisito",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Criterio",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Evidencia",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Sustento legal o técnico",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Ayuda",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Nivel",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "Perfil",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Area Tematica",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Preguntas",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "Etapa"
	},
	"user_role": {
		"fields": [
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_role",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_user"
	},
	"service_comment": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_service",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "rate",
				"type": "number",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"permission": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"user_category": {
		"fields": [
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_category",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_user"
	},
	"paises": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "name",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"regiones": {
		"fields": [
			{
				"name": "name",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "id",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_country",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "name"
	},
	"topic": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_parent",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "private",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"question": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_topic",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "level",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "criteria",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "evidence",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "legal_support",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "help",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"gobierno_en_linea_requisitos_participacion": {
		"fields": [
			{
				"name": "Etapa",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Requisito",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Criterio",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Evidencia",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Sustento legal o técnico",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Ayuda",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Nivel",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "Perfil",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Area Tematica",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Preguntas",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "Etapa"
	},
	"motives": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "points",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "description",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"city": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "code",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "latitude",
				"type": "number",
				"disabled": false,
				"key": false
			},
			{
				"name": "longitude",
				"type": "number",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_region",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"status": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "duration",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "pre_end",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "alert",
				"type": "boolean",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"type_banner": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"points": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "prev_points",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "value",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "result",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "justification",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_motives",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"user": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "picture",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "secondname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "lastname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "secondlastname",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "email",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "second_email",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "extension",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "mobile",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "organization",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "ocupation",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "education_level",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "password",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "tmp_pwd",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "points",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "active",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "verified",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "alert",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "terms",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "newsletter",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "id_availability",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_city",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_region",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_country",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "document",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_type_document",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"gobierno_en_linea_datos_abiertos": {
		"fields": [
			{
				"name": "Etapa",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Requisito",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Criterio",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Evidencia",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Sustento legal o técnico",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Ayuda",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Nivel",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "Perfil",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Area Tematica",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "Preguntas",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "Etapa"
	},
	"session": {
		"fields": [
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "agent",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "ip",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "token",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "expires",
				"type": "date",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_user"
	},
	"user_answer": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_order",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_service",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_question",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_topic",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_status",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_media",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "datetime",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "comment",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "alert",
				"type": "boolean",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"message_votes": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_message",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"category_questions": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_category",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"permission_role": {
		"fields": [
			{
				"name": "id_role",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_permission",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_role"
	},
	"service": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "name",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "url",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_category",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_institution",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "hash",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "rate",
				"type": "number",
				"disabled": false,
				"key": false
			},
			{
				"name": "test_user",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "test_password",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "is_active",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "is_product",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "is_service",
				"type": "boolean",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			},
			{
				"name": "current_status",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "datetime",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"config": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "header",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "address",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "postal_code",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "free_phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "anticorruption_phone",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "email_PQRS",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "schedulle",
				"type": "string",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"hangouts": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "title",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "image",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "url",
				"type": "string",
				"disabled": false,
				"key": false
			},
			{
				"name": "description",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_role",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "activation_date",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	},
	"user_questiontopic": {
		"fields": [
			{
				"name": "id_user",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_topic",
				"type": "int",
				"disabled": false,
				"key": false
			}
		],
		"defaultSort": "id_user"
	},
	"chats": {
		"fields": [
			{
				"name": "id",
				"type": "int",
				"disabled": true,
				"key": true
			},
			{
				"name": "id_evaluation_request",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "id_sender",
				"type": "int",
				"disabled": false,
				"key": false
			},
			{
				"name": "text",
				"type": "text",
				"disabled": false,
				"key": false
			},
			{
				"name": "timestamp",
				"type": "datetime",
				"disabled": true,
				"key": false
			}
		],
		"defaultSort": "id"
	}
};
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}
