SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE stamp.answer;
TRUNCATE TABLE stamp.availability;
TRUNCATE TABLE stamp.category;
#TRUNCATE TABLE stamp.city;
TRUNCATE TABLE stamp.config;
TRUNCATE TABLE stamp.contact;
TRUNCATE TABLE stamp.evaluation_request;
TRUNCATE TABLE stamp.faq;
TRUNCATE TABLE stamp.form;
TRUNCATE TABLE stamp.form_question;
TRUNCATE TABLE stamp.institution;
TRUNCATE TABLE stamp.institution_user;
TRUNCATE TABLE stamp.level;
#TRUNCATE TABLE stamp.media;
TRUNCATE TABLE stamp.message;
TRUNCATE TABLE stamp.message_media;
TRUNCATE TABLE stamp.message_votes;
TRUNCATE TABLE stamp.permission;
TRUNCATE TABLE stamp.permission_role;
TRUNCATE TABLE stamp.question;
TRUNCATE TABLE stamp.question_answer;
TRUNCATE TABLE stamp.questiontopic;
#TRUNCATE TABLE stamp.region;
TRUNCATE TABLE stamp.request_status;
TRUNCATE TABLE stamp.role;
TRUNCATE TABLE stamp.service;
TRUNCATE TABLE stamp.service_comment;
TRUNCATE TABLE stamp.service_status;
TRUNCATE TABLE stamp.session;
TRUNCATE TABLE stamp.social;
TRUNCATE TABLE stamp.status;
TRUNCATE TABLE stamp.topic;
TRUNCATE TABLE stamp.type;
TRUNCATE TABLE stamp.type_document;
TRUNCATE TABLE stamp.user;
TRUNCATE TABLE stamp.user_answer;
TRUNCATE TABLE stamp.user_answer_evaluation;
TRUNCATE TABLE stamp.user_category;
TRUNCATE TABLE stamp.user_questiontopic;
TRUNCATE TABLE stamp.user_role;

INSERT INTO stamp.availability(id, name) VALUES
('1', 'Alta (7 horas diarias approx.)'),
('2', 'Media (4 horas diarias approx.)'),
('3', 'Baja (2 horas diarias approx.)');

INSERT INTO stamp.category(id, name) VALUES
('1', 'Gobierno en Linea - Datos Abiertos'),
('2', 'Gobierno en Linea - Requisitos de Participacion'),
('3', 'Servicios en Linea'),
('4', 'Gestion de TI');

INSERT INTO stamp.type(id, name) VALUES
('1', 'Abierta'),
('2', 'Opción Múltiple'),
('3', 'Requisito');
#requisito = requisito + sustentación legal + justificación + criterio + evidencia + ayuda + adjunto

INSERT INTO stamp.level(id, name) VALUES
('1', 'Usuario'),
('2', 'Experto');

INSERT INTO stamp.permission(id, name) VALUES
('1', 'Platform'),
('2', 'Evaluate'),
('3', 'Manage_users'),
('4', 'Manage_services'),
('5', 'Forum');

INSERT INTO stamp.role(id, name) VALUES
('1', 'Ciudadano'),
('2', 'Evaluador'),
('3', 'Administrador'),
('4', 'Entidad');


INSERT INTO stamp.permission_role(id_role, id_permission) VALUES
('1', '1'),
('1', '5'),
('2', '1'),
('2', '2'),
('2', '5'),
('3', '1'),
('3', '2'),
('3', '3'),
('3', '4'),
('3', '5'),
('4', '1'),
('4', '4'),
('4', '5');

/**
INSERT INTO stamp.questiontopic(id, id_category, name) VALUES
('1', ,'Comunicación Digital'),
('2','Estrategia Digital'),
('3','Gobernanza Digital'),
('4','Talento Digital'),
('5','Gobernanza T.I'),
('6','Conocimiento y Uso'),
('7','Seguimiento y Control'),
('8','Gestión de T.I');
*/

INSERT INTO stamp.request_status(id, name) VALUES
('1', 'Pendiente'),
('2', 'Solicitado'),
('3', 'Aceptado'),
('4', 'Rechazado');

INSERT INTO stamp.status(id, name) VALUES
('1', 'Verificación'),
('2', 'Asignación'),
('3', 'Aceptación'),
('4', 'Retirado'),
('5', 'Evaluación'),
('6', 'Retroalimentación'),
('7', 'Cierre'),
('8', 'Aprobado'),
('9', 'Rechazado');

INSERT INTO stamp.type_document(id, name) VALUES
('1', 'Cédula de Ciudadanía'),
('2', 'Pasaporte'),
('3', 'Cédula de Extranjería');

INSERT INTO stamp.questiontopic(id, id_category, name) VALUES
('1', '1', 'Comunicacion Digital'),
('2', '1', 'Conocimiento y Uso'),
('3', '1', 'Estrategia Digital'),
('4', '1', 'Gobernanza TI'),
('5', '1', 'Seguimiento y Control'),
('6', '1', 'Talento Digital'),

('7', '2', 'Comunicacion Digital'),
('8', '2', 'Conocimiento y Uso'),
('9', '2', 'Estrategia Digital'),
('10','2', 'Gobernanza Digital'),
('11','2', 'Seguimiento y Control'),
('12','2', 'Talento Digital'),

('13','3', 'Conocimiento y Uso'),
('14','3', 'Estrategia Digital'),
('15','3', 'Gobernanza Digital'),
('16','3', 'Seguimiento y Control'),
('17','3', 'Talento Digital');

INSERT INTO stamp.form(id, name, id_category) VALUES
('1', 'Etapa Listar', '1'),
('2', 'Etapa Preparar', '1'),
('3', 'Etapa Agregar', '1'),
('4', 'Etapa Entregar', '1'),
('5', 'Etapa Conservar', '1'),

('6', 'Etapa Listar', '2'),
('7', 'Etapa Preparar', '2'),
('8', 'Etapa Agregar', '2'),
('9', 'Etapa Entregar', '2'),
('10', 'Etapa Conservar', '2'),

('11', 'Etapa Listar', '3'),
('12', 'Etapa Preparar', '3'),
('13', 'Etapa Agregar', '3'),
('14', 'Etapa Entregar', '3'),
('15', 'Etapa Conservar', '3'),

('16', 'Etapa Listar', '4'),
('17', 'Etapa Preparar', '4'),
('18', 'Etapa Agregar', '4'),
('19', 'Etapa Entregar', '4'),
('20', 'Etapa Conservar', '4');


INSERT INTO stamp.question(id, id_type, id_form, text) VALUES 
('1', '3', '1', 'Requisito'),
('2', '3', '2', 'Requisito'),
('3', '3', '3', 'Requisito'),
('4', '3', '4', 'Requisito'),
('5', '3', '5', 'Requisito'),

('6', '3', '6', 'Requisito'),
('7', '3', '7', 'Requisito'),
('8', '3', '8', 'Requisito'),
('9', '3', '9', 'Requisito'),
('10', '3', '10', 'Requisito'),

('11', '3', '11', 'Requisito'),
('12', '3', '12', 'Requisito'),
('13', '3', '13', 'Requisito'),
('14', '3', '14', 'Requisito'),
('15', '3', '15', 'Requisito'),

('16', '3', '16', 'Requisito'),
('17', '3', '17', 'Requisito'),
('18', '3', '18', 'Requisito'),
('19', '3', '19', 'Requisito'),
('20', '3', '20', 'Requisito');



/*INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `phone`, `mobile`, `active`, `verified`, `password`, `tmp_pwd`, `flag_hall`, `ranking_hall`, `points`, `document`, `id_type_document`, `id_availability`, `id_level`, `id_city`, `education_level`, `ocupation`, `organization`) VALUES ('100', 'name', 'secondname', 'lastname', 'secondlastname', 'algo@email.com', '310', '312', '1', '1', 'password', '0', '1', '6', '100', 'document', '1', '1', '1', '1', 'education_level', 'ocupation', 'organization');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('1','1');
*/                                                                                                                      
/**
*   Administrador
*/
# Administrador , id_user = 1
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`) VALUES ('1', 'Administrador', 'carolina.pulido@domoti-sas.com', '1', '1', '4c71778a7acf11690030fcddd4a27a1dae7c11cb54770dfe6560a5621335b7eb');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('1','3');

/**
*   Ciudadanos
*/
# Ciudadano 1 , id_user = 2
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `active`, `verified`, `password`, `tmp_pwd`) VALUES ('2', 'Carolina', 'Rosa', 'Pulido', 'Gómez', 'crpulidog0@gmail.com', '1', '1', 'c3951cfdddb5b507d7e4ddb6071a2999f7048edbf5d7c8eeacbb820fd1960868', '0');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('2','1');

/**
*   Evaluadores
*/
# Evaluador 1 , id_user = 3
INSERT INTO user (`id`, `name`, `secondname`, `lastname`, `secondlastname`, `email`, `phone`, `mobile`, `active`, `verified`, `password`, `tmp_pwd`, `flag_hall`, `ranking_hall`, `points`, `document`, `id_type_document`, `id_availability`, `id_level`, `id_city`, `education_level`, `ocupation`, `organization`) VALUES ('3', 'Johnny', 'Germán', 'Cubides', 'Castro', 'johnny.cubides@domoti-sas.com', '0312456789', '3101234567', '1', '1', 'c3951cfdddb5b507d7e4ddb6071a2999f7048edbf5d7c8eeacbb820fd1960868', '0', '0', '0', '10', '1101175789', '1', '1', '2', '1', 'Universitario', 'Desempleado', 'unal');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('3','2');

/**
*   Entidades
*/
# Entidad 1 , id_user = 4
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`, `tmp_pwd`, `flag_hall`, `ranking_hall`, `points`, `terms`) VALUES ('4', 'Entidad1', 'santiago.alvarez@domoti-sas.com', '1', '1', 'c3951cfdddb5b507d7e4ddb6071a2999f7048edbf5d7c8eeacbb820fd1960868', '1', '0', '0', '15', '1');
# La siguiente línea es la correcta
#INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `legalrep_document`, `legalrep_email`) VALUES ('1', 'Entidad1', '22334455', 'santiago.alvarez@domoti-sas.com', '3101111111', 'Pepito', 'Ramón', 'Perez', 'Espitia', '1', '1010000000', 'santiago@gmail.com');
INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `extension`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `leaglrep_document`, `legalrep_email`, `id_region`, `id_city`) VALUES ('1', 'Entidad1', '22334455', '12332', 'santiago.alvarez@domoti-sas.com', '3101111111', 'Pepito', 'Ramón', 'Perez', 'Espitia', '1', '1010000000', 'santiago@gmail.com', '', '');
INSERT INTO institution_user (`id_institution`,`id_user`) VALUES ('1', '4');

# Entidad 2 , id_user = 5
INSERT INTO user (`id`, `name`, `email`, `active`, `verified`, `password`, `tmp_pwd`, `flag_hall`, `ranking_hall`, `points`, `terms`) VALUES ('5', 'Entidad2', 'carolina.pulido@domoti-sas.com', '1', '1', 'c3951cfdddb5b507d7e4ddb6071a2999f7048edbf5d7c8eeacbb820fd1960868', '1', '0', '0', '10', '1');
# La siguiente línea es la correcta
#INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `extension`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `leaglrep_document`, `legalrep_email`, `id_region`, `id_city`) VALUES ('2', 'Entidad2', '11111155', '10302', 'carolina.pulido@domoti-sas.com', '3100001111', 'Rosa', 'María', 'Sepúlveda', 'Torres', '1', '1010111222', 'crpulidog1@gmail.com', '3', '1054');
INSERT INTO institution (`id`, `name`, `nit`, `email`, `phone`, `legalrep_name`, `legalrep_secondname`, `legalrep_lastname`, `legalrep_secondlastname`, `legalrep_typedoc`, `leaglrep_document`, `legalrep_email`, `id_region`, `id_city`) VALUES ('2', 'Entidad2', '11111155', 'carolina.pulido@domoti-sas.com', '3100001111', 'Rosa', 'María', 'Sepúlveda', 'Torres', '1', '1010111222', 'crpulidog1@gmail.com', '3', '1054');
INSERT INTO institution_user (`id_institution`,`id_user`) VALUES ('2', '5');


/**
*	Servicios
*/
# Entidad 1 , id_service = 1


SET FOREIGN_KEY_CHECKS=1;
