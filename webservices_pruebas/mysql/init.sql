USE stamp;

/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 13.0 		*/
/*  Created On : 13-Aug-2017 5:07:10 PM 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE `banner`;

TRUNCATE TABLE `chats`;

#TRUNCATE TABLE `config`;

TRUNCATE TABLE `evaluation_request`;

TRUNCATE TABLE `hall_of_fame`;

TRUNCATE TABLE `hangouts`;

TRUNCATE TABLE `institution`;

TRUNCATE TABLE `institution_user`;

TRUNCATE TABLE `media`;

TRUNCATE TABLE `motives`;

TRUNCATE TABLE `points`;

TRUNCATE TABLE `question`;

TRUNCATE TABLE `service`;

TRUNCATE TABLE `service_comment`;

TRUNCATE TABLE `service_status`;

TRUNCATE TABLE `session`;

TRUNCATE TABLE `topic`;

TRUNCATE TABLE `user`;

TRUNCATE TABLE `user_answer`;

TRUNCATE TABLE `user_category`;

TRUNCATE TABLE `user_questiontopic`;

TRUNCATE TABLE `user_role`;

TRUNCATE TABLE `footer`;

#requisito = requisito + sustentación legal + justificación + criterio + evidencia + ayuda + adjunto

##################
#	USERS
##################

/**
*   User = 1
* 	Administrador (email: carolina.pulido@domoti-sas.com, password: 1234)
*/
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`) VALUES ('1', 'Admin1', 'carolina.pulido@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('1','3');

/**
*   User = 2
* 	Administrador (email: admin@domoti-sas.com, password: 1234)
*/
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`) VALUES ('2', 'Admin2', 'daniel.jimenez@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('2','3');

/**
*   User = 3
*	Ciudadano (email: samosapiens1@domoti-sas.com, password: 1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `active`, `verified`, `password`, `tmp_pwd`) VALUES ('3', 'Ciudadano', 'Santiago', 'Álvarez', 'Sepúlveda', 'samosapiens1@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('3','1');

/**
*   User = 4
*	Ciudadano (email: samosapiens2@domoti-sas.com, password: 1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `active`, `verified`, `password`, `tmp_pwd`) VALUES ('4', 'Ciudadano', 'Santiago', 'Álvarez', 'Sepúlveda', 'samosapiens2@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('4','1');

/**
*   User = 5
*	Ciudadano (email: caropugo92@gmail.com, password: 1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `active`, `verified`, `password`, `tmp_pwd`) VALUES ('5', 'Ciudadano', 'Carolina', 'Pulido', 'Gómez', 'caropugo92@gmail.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('5','1');

/**
*   User = 6
*	Ciudadano (email: johnny.cubides@domoti-sas.com, password: 1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `active`, `verified`, `password`, `tmp_pwd`) VALUES ('6', 'Ciudadano', 'Johnny', 'Cubides', 'Castro', 'johnny.cubides@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('6','1');

/**
*	User = 7 
*	Evaluador1 (email: crpulidog0@gmail.com, password:1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `phone`, `mobile`, `active`, `verified`, `password`, `tmp_pwd`, `document`, `id_type_document`, `id_availability`, `education_level`, `ocupation`, `organization`, `id_country`, `id_city`, `id_region`, `terms`) VALUES ('7', 'Evaluador', 'Carolina', 'Rodriguez', 'Sánchez', 'crpulidog0@gmail.com', '0312456789', '3101234567', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0', '1101175789', '1', '1', 'Universitario', 'Desempleado', 'unal', '42', '908', '28', '1');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('7','2');
INSERT INTO user_category(`id_user`, `id_category`) VALUES ('7','1');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','2');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','3');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','4');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','8');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','9');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','10');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('7','11');

/**
*	User = 8
*	Evaluador2 (email: johnny.cubides@domoti-sas.com, password:1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `phone`, `mobile`, `active`, `verified`, `password`, `tmp_pwd`, `document`, `id_type_document`, `id_availability`, `education_level`, `ocupation`, `organization`, `id_country`, `id_city`, `id_region`, `terms`) VALUES ('8', 'Evaluador', 'Johnny', 'Cubides', 'Castro', 'johnny.cubides@domoti-sas.com', '0312456789', '3101234567', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0', '1101175789', '1', '1', 'Universitario', 'Desempleado', 'unal', '42', '250', '8', '1');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('8','2');
INSERT INTO user_category(`id_user`, `id_category`) VALUES ('8','1');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','2');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','3');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','4');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','8');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','9');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','10');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('8','11');

/**
*	User = 9
*	Evaluador3 (email: sas@gmail.com, password:1234)
*/
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `phone`, `mobile`, `active`, `verified`, `password`, `tmp_pwd`, `document`, `id_type_document`, `id_availability`, `education_level`, `ocupation`, `organization`, `id_country`, `id_city`, `id_region`, `terms`) VALUES ('9', 'Evaluador', 'Pepito', 'Pérez', 'Camargo', 'sas@gmail.com', '0312456789', '3101234567', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '0', '1101175789', '1', '1', 'Universitario', 'Desempleado', 'unal', '42', '210', '8', '1');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('9','2');
INSERT INTO user_category(`id_user`, `id_category`) VALUES ('9','1');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','2');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','3');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','4');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','8');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','9');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','10');
INSERT INTO user_questiontopic(`id_user`, `id_topic`) VALUES ('9','11');

/**
*	User = 10, Institution = 1
*   Entidad1 (email: crpulidog1@gmail.com, password: 1234) 
*/
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`, `tmp_pwd`, `points`, `terms`,  `id_region`, `id_city`) VALUES ('10', 'Entidad1', 'crpulidog1@gmail.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '1', '13', '1',  '2', '6');
INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `extension_phone`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `legalrep_document`, `legalrep_email`, `id_region`, `id_city`, `id_user_creator`) VALUES ('1', 'Entidad1', '22334455', 'crpulidog1@gmail.com', '3101111111', '11111','Pepito', 'Ramón', 'Perez', 'Espitia', '1', '1010000000', 'crpulidog2@gmail.com', '2', '6', '10');
INSERT INTO institution_user (`id_institution`,`id_user`) VALUES ('1', '10');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('10','4');

/**
*	User = 11, Institution = 2
*   Entidad2 (email: santiago.alvarez@domoti-sas.com, password: 1234) 
*/
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`, `tmp_pwd`, `points`, `terms`,  `id_region`, `id_city`) VALUES ('11', 'Entidad2', 'santiago.alvarez@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '1', '14', '1',  '16', '525');
INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `extension_phone`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `legalrep_document`, `legalrep_email`, `id_region`, `id_city`, `id_user_creator`) VALUES ('2', 'Entidad2', '22334455', 'santiago.sepulveda@domoti-sas.com', '3101111111', '11111','Román', 'Campos', 'Montes', 'Díaz', '1', '1010000000', 'santiago@gmail.com', '16', '525', '11');
INSERT INTO institution_user (`id_institution`,`id_user`) VALUES ('2', '11');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('11','4');

/**
*	User = 12, Institution = 3
*   Entidad3 (email: domosas@domoti-sas.com, password: 1234) 
*/
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`, `tmp_pwd`, `points`, `terms`,  `id_region`, `id_city`) VALUES ('12', 'Entidad3', 'domosas@domoti-sas.com', '1', '1', '7a59e9017b94a3d9f0892a2a2f52c6d0a8442b6d79e253de9f6d3ea14e520c7f', '1', '15', '1',  '2', '4');
INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `extension_phone`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `legalrep_document`, `legalrep_email`, `id_region`, `id_city`, `id_user_creator`) VALUES ('3', 'Entidad2', '22334455', 'santiago.sepulveda@domoti-sas.com', '3101111111', '11111','Claudia', 'Patricia', 'Tovar', 'Díaz', '1', '1010000000', 'claudia@gmail.com', '2', '4', '12');
INSERT INTO institution_user (`id_institution`,`id_user`) VALUES ('3', '12');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('12','4');


##################
#	SERVICES
##################
/**
*	Service = 1
*	User = 10, Institution = 1
*/
INSERT INTO service(`id_institution`, `id_user`, `id_category`, `name`, `url`, `test_user`, `test_password`, `is_service`, `is_product`, `current_status`) VALUES ('1', '10', '2', 'Pasado judicial en linea', 'mipasado.com', 'carito', '1234', '1', '0', '1') ;
INSERT INTO service_status(`id_service`, `id_status`, `level`) VALUES ('1', '1', '1') ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('1', '3', 'Muy mal servicio', '2.3' ) ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('1', '4', 'Muy buen servicio', '4.5' ) ;

/**
*	Service = 2
*	User = 10, Institution = 1
*/
INSERT INTO service(`id_institution`, `id_user`, `id_category`, `name`, `url`, `test_user`, `test_password`, `is_service`, `is_product`, `current_status`) VALUES ('1', '10', '2', 'Certificado de defunción en linea', 'mipasado.com', 'carito', '1234', '1', '0', '1') ;
INSERT INTO service_status(`id_service`, `id_status`, `level`) VALUES ('2', '1', '3') ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('2', '5', 'Muy buen servicio', '4.7' ) ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('2', '6', 'Muy buen servicio', '4.5' ) ;

/**
*	Service = 3
*	User = 11, Institution = 2
*/
INSERT INTO service(`id_institution`, `id_user`, `id_category`, `name`, `url`, `test_user`, `test_password`, `is_service`, `is_product`, `current_status`) VALUES ('2', '11', '1', 'Acta de Matrimonio', 'sogaalcuello.com', 'carito', '1234', '1', '0', '1') ;
INSERT INTO service_status(`id_service`, `id_status`, `level`) VALUES ('3', '1', '2') ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('3', '3', 'Muy mal servicio', '2.3' ) ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('3', '4', 'Pésimo servicio', '0.1' ) ;

/**
*	Service = 4
*	User = 12, Institution = 3
*/
INSERT INTO service(`id_institution`, `id_user`, `id_category`, `name`, `url`, `test_user`, `test_password`, `is_service`, `is_product`, `current_status`) VALUES ('3', '12', '3', 'RUT en línea', 'miRUTcito.com', 'carito', '1234', '1', '0', '1') ;
INSERT INTO service_status(`id_service`, `id_status`, `level`) VALUES ('4', '1', '3') ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('4', '3', 'Muy mal servicio', '2.3' ) ;
INSERT INTO service_comment(`id_service`, `id_user`, `text`, `rate`) VALUES ('4', '6', 'Muy buen servicio', '4.5' ) ;


##################
#	USER_ANSWER
##################
# Crear un user_answer para cada requisito de los servicios
/**
*	Service = 1
*	User = 9, Institution = 1
*/
/*INSERT INTO user_answer(`id_question`, `requisite`, `support_legal`, `justification`, `evidence`,`help`) 
SELECT q.id as id_question, q.text, q.legal_support, q.criteria,q.evidence, q.help, join2.*
FROM stamp.question q
JOIN (SELECT qt.id as id_questiontopic, qt.name as name_topics, qt.id_usertype, qt.id_category, join1.level, join1.id as id_service, join1.id_user
	FROM stamp.questiontopic qt
	RIGHT JOIN 
	(SELECT id_category, s.id, level, s.id_user
		FROM stamp.service s
		RIGHT JOIN stamp.service_status s_s ON s.id = s_s.id_service 
        WHERE s_s.id_service = 1) join1 
	ON qt.id_category = join1.id_category) join2 
ON q.id_topic = join2.id_questiontopic WHERE q.level <= join2.level ORDER BY q.id;
*/
#Ejecutar crear_user_answer

/**
SELECT *
FROM stamp.question q 
RIGHT JOIN
(SELECT id, name, level FROM stamp.questiontopic qt
RIGHT JOIN (SELECT id_category, level FROM stamp.service ser
LEFT JOIN stamp.service_status s_s ON ser.id = s_s.id_service WHERE s_s.id_service = 1) 
join1 ON qt.id_category = join1.id_category) join2 ON q.id_topic = join2.id WHERE q.level <= join2.level ORDER BY q.id;
*/


#INSERT INTO media (`url`, `type`) VALUES ('https://www.youtube.com/watch?v=JpKxJeuk4kE', 'video');
#INSERT INTO media (`url`, `type`) VALUES ('https://www.youtube.com/watch?v=CTK46mTNWkU', 'video');


/**
*	HALL DE LA FAMA
*/
#INSERT INTO hall_of_fame (`name`, `ranking`,`points`, `id_user`, `id_role`) VALUES ('EntidadJohnny', '1', '13', '7', '4');
#INSERT INTO hall_of_fame (`name`, `ranking`,`points`, `id_user`, `id_role`) VALUES ('Carolina Evaluador', '1', '20', '3', '2');

SET FOREIGN_KEY_CHECKS=1;
