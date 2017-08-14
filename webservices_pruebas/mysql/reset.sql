USE stamp;

/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 13.0 		*/
/*  Created On : 13-Aug-2017 5:07:10 PM 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0;

/* Truncate 44 Tables */

#1
TRUNCATE TABLE `availability`;
INSERT INTO stamp.availability(id, name) VALUES
('1', 'Alta (7 horas diarias approx.)'),
('2', 'Media (4 horas diarias approx.)'),
('3', 'Baja (2 horas diarias approx.)');

#2
TRUNCATE TABLE `banner`;

#3
TRUNCATE TABLE `category`;
INSERT INTO category(id, name) VALUES
('1', 'Gobierno en Linea - Datos Abiertos'),
('2', 'Gobierno en Linea - Requisitos de Participacion'),
('3', 'Servicios en Linea'),
('4', 'Gestion de TI');

#4 
TRUNCATE TABLE `category_questions`;
INSERT INTO category_questions (text,id_category)
SELECT DISTINCT r.Preguntas,c.id 
FROM stamp.gobierno_en_linea_datos_abiertos r JOIN
category c ON c.id = '1' AND r.Preguntas != "";

INSERT INTO category_questions (text,id_category)
SELECT DISTINCT r.Preguntas,c.id 
FROM stamp.gobierno_en_linea_requisitos_participacion r JOIN
category c ON c.id = '2' AND r.Preguntas != "";

INSERT INTO category_questions (text,id_category)
SELECT DISTINCT r.Preguntas,c.id 
FROM stamp.servicios_en_linea r JOIN
category c ON c.id = '3' AND r.Preguntas != "";

#5
TRUNCATE TABLE `chats`;

#6
TRUNCATE TABLE `city`;
INSERT INTO city (name,id_region)
SELECT c.Name, c.id_region 
FROM stamp.ciudades c ;

#7
TRUNCATE TABLE `config`;

#8
TRUNCATE TABLE `contact`;

#9
TRUNCATE TABLE `country`;
INSERT INTO country (name)
SELECT p.name 
FROM stamp.paises p ;

#10
TRUNCATE TABLE `evaluation_request`;

#11
TRUNCATE TABLE `faq`;

#TRUNCATE TABLE `form`;
#INSERT INTO form(id, name, id_category) VALUES
#('1', 'Etapa Listar', '1'),
#('2', 'Etapa Preparar', '1'),
#('3', 'Etapa Agregar', '1'),
#('4', 'Etapa Entregar', '1'),
#('5', 'Etapa Conservar', '1'),

#('6', 'Etapa Listar', '2'),
#('7', 'Etapa Preparar', '2'),
#('8', 'Etapa Agregar', '2'),
#('9', 'Etapa Entregar', '2'),
#('10', 'Etapa Conservar', '2'),

#('11', 'Etapa Listar', '3'),
#('12', 'Etapa Preparar', '3'),
#('13', 'Etapa Agregar', '3'),
#('14', 'Etapa Entregar', '3'),
#('15', 'Etapa Conservar', '3'),

#('16', 'Etapa Listar', '4'),
#('17', 'Etapa Preparar', '4'),
#('18', 'Etapa Agregar', '4'),
#('19', 'Etapa Entregar', '4'),
#('20', 'Etapa Conservar', '4');

#12
TRUNCATE TABLE `hall_of_fame`;

#13
TRUNCATE TABLE `hangouts`;

#14
TRUNCATE TABLE `institution`;

#15
TRUNCATE TABLE `institution_user`;

#16
TRUNCATE TABLE `media`;

#17
TRUNCATE TABLE `message`;

#18
TRUNCATE TABLE `message_media`;

#19
TRUNCATE TABLE `message_votes`;

#20
TRUNCATE TABLE `motives`;

#21
TRUNCATE TABLE `permission`;
INSERT INTO permission(id, name) VALUES
('1', 'Platform'),
('2', 'Evaluate'),
('3', 'Manage_users'),
('4', 'Manage_services'),
('5', 'Forum');

#22
TRUNCATE TABLE `permission_role`;
INSERT INTO permission_role(id_role, id_permission) VALUES
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

#23
TRUNCATE TABLE `points`;

#25
TRUNCATE TABLE `questiontopic`;
INSERT INTO stamp.questiontopic(id, id_category, id_usertype, name) VALUES
# Gobierno en Linea - Datos Abiertos
('1', '1', '2', 'Comunicacion Digital'),
('2', '1', '1', 'Conocimiento y Uso'),
('3', '1', '2', 'Estrategia Digital'),
('4', '1', '2', 'Gobernanza TI'),
('5', '1', '1', 'Seguimiento y Control'),
('6', '1', '2', 'Talento Digital'),
# Gobierno en Linea - Requisitos de Participacion
('7', '2', '2', 'Comunicacion Digital'),
('8', '2', '1', 'Conocimiento y Uso'),
('9', '2', '2', 'Estrategia Digital'),
('10', '2', '2', 'Gobernanza Digital'),
('11', '2', '1', 'Seguimiento y Control'),
('12', '2', '2', 'Talento Digital'),
# Servicios en Linea
('13', '3', '1', 'Conocimiento y Uso'),
('14', '3', '2', 'Estrategia Digital'),
('15', '3', '2', 'Gobernanza Digital'),
('16', '3', '1', 'Seguimiento y Control'),
('17', '3', '2', 'Talento Digital');

#24
TRUNCATE TABLE `question`;
INSERT INTO question (text,criteria,evidence,legal_support,level, help,id_topic)
SELECT r.Requisito,r.Criterio,r.Evidencia,r.`Sustento legal o técnico`,r.Nivel,r.Ayuda,qt.id 
FROM stamp.gobierno_en_linea_datos_abiertos r JOIN
questiontopic qt ON qt.name = r.`Area Tematica` AND qt.id_category = '1';

INSERT INTO question (text,criteria,evidence,legal_support,level, help,id_topic)
SELECT r.Requisito,r.Criterio,r.Evidencia,r.`Sustento legal o técnico`,r.Nivel,r.Ayuda,qt.id 
FROM stamp.gobierno_en_linea_requisitos_participacion r JOIN
questiontopic qt ON qt.name = r.`Area Tematica` AND qt.id_category = '2';

INSERT INTO question (text,criteria,evidence,legal_support,level, help,id_topic)
SELECT r.Requisito,r.Criterio,r.Evidencia,r.`Sustento legal o técnico`,r.Nivel,r.Ayuda,qt.id 
FROM stamp.servicios_en_linea r JOIN
questiontopic qt ON qt.name = r.`Area Tematica` AND qt.id_category = '3';

#26
TRUNCATE TABLE `region`;
INSERT INTO region (name,id_country)
SELECT r.name, r.id_country 
FROM stamp.regiones r;

#27
TRUNCATE TABLE `request_status`;
INSERT INTO request_status(id, name) VALUES
('1', 'Pendiente'),
('2', 'Solicitado'),
('3', 'Asignado'),
('4', 'Aceptado'),
('5', 'Rechazado');

#28
TRUNCATE TABLE `role`;
INSERT INTO role(id, name) VALUES
('1', 'Ciudadano'),
('2', 'Evaluador'),
('3', 'Administrador'),
('4', 'Entidad');

#29
TRUNCATE TABLE `service`;

#30
TRUNCATE TABLE `service_comment`;

#31
TRUNCATE TABLE `service_status`;

#32
TRUNCATE TABLE `session`;

#33
TRUNCATE TABLE `social`;

#34
TRUNCATE TABLE `status`;
INSERT INTO status(id, name) VALUES
('1', 'Verificación'),
('2', 'Asignación'),
('3', 'Aceptación'),
('4', 'Retirado'),
('5', 'Evaluación'),
('6', 'Retroalimentación'),
('7', 'Cierre'),
('8', 'Aprobado'),
('9', 'Rechazado');

#35
TRUNCATE TABLE `topic`;

#36
TRUNCATE TABLE `type`;
INSERT INTO type(id, name) VALUES
('1', 'Abierta'),
('2', 'Opción Múltiple'),
('3', 'Requisito');

#37
TRUNCATE TABLE `type_banner`;
INSERT INTO type_banner(id, name) VALUES
('1', 'Foto y Texto'),
('2', 'Foto y Sombra'),
('3', 'Video y Texto');

#38
TRUNCATE TABLE `type_document`;
INSERT INTO type_document(id, name) VALUES
('1', 'Cédula de Ciudadanía'),
('2', 'Pasaporte'),
('3', 'Cédula de Extranjería');

#39
TRUNCATE TABLE `user`;

#40
TRUNCATE TABLE `user_answer`;

#41
TRUNCATE TABLE `user_category`;

#42
TRUNCATE TABLE `user_questiontopic`;

#43
TRUNCATE TABLE `user_role`;

#44
TRUNCATE TABLE `usertype`;
INSERT INTO usertype(id, name) VALUES
('1', 'Usuario'),
('2', 'Experto');

#requisito = requisito + sustentación legal + justificación + criterio + evidencia + ayuda + adjunto

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

SET FOREIGN_KEY_CHECKS=1;
