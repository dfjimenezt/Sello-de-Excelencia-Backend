SET FOREIGN_KEY_CHECKS=0 ;

TRUNCATE TABLE user;
TRUNCATE TABLE user_role;
TRUNCATE TABLE user_questiontopic;
TRUNCATE TABLE user_category;
TRUNCATE TABLE role;
TRUNCATE TABLE session;
TRUNCATE TABLE permission_role;
TRUNCATE TABLE permission;
TRUNCATE TABLE type;
TRUNCATE TABLE category;
TRUNCATE TABLE institution;
TRUNCATE TABLE region;
TRUNCATE TABLE city;

/*INSERT INTO user (`id`,`name`,`active`,`password`,`verified`) VALUES ('1','Admin','1','c8d740683ad089cddedd31aef093a5cb4d5ff866947e668f18b5d6ab33b5dcf2','1');
INSERT INTO role (`id`,`name`) VALUES ('1','Administrador');
INSERT INTO permission (`id`,`name`) VALUES ('1','admin');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('1','1');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('1','1');*/

/**
*
*/
INSERT INTO user (`id`,`name`,`email`,`active`,`password`,`verified`) VALUES ('1','Admin','admin@domoti.rocks','1','c8d740683ad089cddedd31aef093a5cb4d5ff866947e668f18b5d6ab33b5dcf2','1');
INSERT INTO user (`id`,`name`,`email`,`lastname`,`active`,`password`,`verified`) VALUES ('2','Jorge','jorge.calle@domoti-sas.com','Calle','1','26d854a1fbc06d8be66e5370150b928c259a5184926129e2c8dac68f765fd31f','1');
INSERT INTO role (`id`,`name`) VALUES ('1','Usuario');
INSERT INTO role (`id`,`name`) VALUES ('2','Evaluador');
INSERT INTO role (`id`,`name`) VALUES ('3','Administrador');
INSERT INTO role (`id`,`name`) VALUES ('4','Entidad');
INSERT INTO permission (`id`,`name`) VALUES ('1','admin');
INSERT INTO permission (`id`,`name`) VALUES ('2','platform');
INSERT INTO permission (`id`,`name`) VALUES ('3','evaluate');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('1','3');
INSERT INTO user_role (`id_user`,`id_role`) VALUES ('2','1');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('3','1');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('1','2');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('2','3');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('2','2');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('3','2');
INSERT INTO permission_role (`id_role`,`id_permission`) VALUES ('3','3');
INSERT INTO category (`id`,`name`) VALUES ('1','Datos Abiertos');
INSERT INTO category (`id`,`name`) VALUES ('2','Servicios al ciudadano');
INSERT INTO category (`id`,`name`) VALUES ('3','Capacidad de Gestión de TI');

INSERT INTO status (`id`,`name`) VALUES ('1','Postulado');
INSERT INTO status (`id`,`name`) VALUES ('2','En Evaluación');
INSERT INTO status (`id`,`name`) VALUES ('3','Rechazado');
INSERT INTO status (`id`,`name`) VALUES ('4','Certificado');

INSERT INTO questiontopic (`id`,`name`) VALUES ('1','Usabilidad');
INSERT INTO questiontopic (`id`,`name`) VALUES ('2','Accesibilidad');
INSERT INTO questiontopic (`id`,`name`) VALUES ('3','Interoperabilidad');
INSERT INTO questiontopic (`id`,`name`) VALUES ('4','Multicanalidad');
INSERT INTO questiontopic (`id`,`name`) VALUES ('5','Seguridad');
INSERT INTO type (`id`,`name`) VALUES ('1','Abierta');
INSERT INTO type (`id`,`name`) VALUES ('2','Opción Multiple');
INSERT INTO availability (`id`,`name`) VALUES ('1','Baja');
INSERT INTO availability (`id`,`name`) VALUES ('2','Media');
INSERT INTO availability (`id`,`name`) VALUES ('3','Alta');

SET FOREIGN_KEY_CHECKS=1;