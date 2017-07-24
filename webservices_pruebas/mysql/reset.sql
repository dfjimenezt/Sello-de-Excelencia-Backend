SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE stamp.answer;
TRUNCATE TABLE stamp.availability;
TRUNCATE TABLE stamp.category;
TRUNCATE TABLE stamp.city;
TRUNCATE TABLE stamp.config;
TRUNCATE TABLE stamp.contact;
TRUNCATE TABLE stamp.evaluation_request;
TRUNCATE TABLE stamp.faq;
TRUNCATE TABLE stamp.form;
TRUNCATE TABLE stamp.form_question;
TRUNCATE TABLE stamp.institution;
TRUNCATE TABLE stamp.institution_user;
TRUNCATE TABLE stamp.level;
TRUNCATE TABLE stamp.media;
TRUNCATE TABLE stamp.message;
TRUNCATE TABLE stamp.message_media;
TRUNCATE TABLE stamp.message_votes;
TRUNCATE TABLE stamp.permission;
TRUNCATE TABLE stamp.permission_role;
TRUNCATE TABLE stamp.question;
TRUNCATE TABLE stamp.question_answer;
TRUNCATE TABLE stamp.questiontopic;
TRUNCATE TABLE stamp.region;
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
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO stamp.availability(id, name) VALUES
('1', 'Alta (7 horas diarias approx.)'),
('2', 'Media (4 horas diarias approx.)'),
('3', 'Baja (2 horas diarias approx.)');

INSERT INTO stamp.category(id, name) VALUES
('1', 'Gobierno en Linea - Datos Abiertos'),
('2', 'Gobierno en Linea - Requisitos de Participacion'),
('3', 'Servicios en Linea'),
('4', 'Gestion de TI');

INSERT INTO stamp.region(id, name) VALUES
('1', 'AMAZONAS'),
('2', 'ANTIOQUIA'),
('3', 'ARAUCA'),
('4', 'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA'),
('5', 'ATLANTICO'),
('6', 'BOGOTÁ, D. C.'),
('7', 'Bolivar'),
('8', 'BOYACA'),
('9', 'CALDAS'),
('10', 'CAQUETA'),
('11', 'CASANARE'),
('12', 'CAUCA'),
('13', 'CESAR'),
('14', 'CHOCÓ'),
('15', 'CORDOBA'),
('16', 'CUNDINAMARCA'),
('17', 'GUAINÍA'),
('18', 'GUAVIARE'),
('19', 'HUILA'),
('20', 'LA GUAJIRA'),
('21', 'MAGDALENA'),
('22', 'META'),
('23', 'NARIÑO'),
('24', 'NORTE DE SANTANDER'),
('25', 'PUTUMAYO'),
('26', 'QUINDÍO'),
('27', 'RISARALDA'),
('28', 'SANTANDER'),
('29', 'SUCRE'),
('30', 'TOLIMA'),
('31', 'VALLE DEL CAUCA'),
('32', 'VAUPÉS'),
('33', 'VICHADA');

INSERT INTO stamp.city(id, name, id_region) VALUES
('1', 'MEDELLIN', '2');

INSERT INTO stamp.type(id, name) VALUES
('1', 'Abierta'),
('2', 'Selección múltiple');

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

INSERT INTO stamp.request_status(id, name) VALUES
('1', 'Pendiente'),
('2', 'Aceptado'),
('3', 'Rechazado'),
('4', 'Solicitado');

INSERT INTO stamp.status(id, name) VALUES
('1', 'Postulando'),
('2', 'Re-Postulando'),
('3', 'Postulado'),
('4', 'Retirado'),
('5', 'Rechazado'),
('6', 'Aprobado');

INSERT INTO stamp.type_document(id, name) VALUES
('1', 'Cédula de Ciudadanía'),
('2', 'Pasaporte'),
('3', 'Cédula de Extranjería');
