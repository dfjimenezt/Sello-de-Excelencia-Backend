/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 13.0 		*/
/*  Created On : 14-Aug-2017 1:21:51 AM 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0 
;

/* Drop Views */

DROP VIEW IF EXISTS `View1` CASCADE
;

/* Drop Tables */

DROP TABLE IF EXISTS `availability` CASCADE
;

DROP TABLE IF EXISTS `banner` CASCADE
;

DROP TABLE IF EXISTS `category` CASCADE
;

DROP TABLE IF EXISTS `category_questions` CASCADE
;

DROP TABLE IF EXISTS `chats` CASCADE
;

DROP TABLE IF EXISTS `city` CASCADE
;

DROP TABLE IF EXISTS `config` CASCADE
;

DROP TABLE IF EXISTS `contact` CASCADE
;

DROP TABLE IF EXISTS `country` CASCADE
;

DROP TABLE IF EXISTS `evaluation_request` CASCADE
;

DROP TABLE IF EXISTS `faq` CASCADE
;

DROP TABLE IF EXISTS `form` CASCADE
;

DROP TABLE IF EXISTS `hall_of_fame` CASCADE
;

DROP TABLE IF EXISTS `hangouts` CASCADE
;

DROP TABLE IF EXISTS `institution` CASCADE
;

DROP TABLE IF EXISTS `institution_user` CASCADE
;

DROP TABLE IF EXISTS `media` CASCADE
;

DROP TABLE IF EXISTS `message` CASCADE
;

DROP TABLE IF EXISTS `message_media` CASCADE
;

DROP TABLE IF EXISTS `message_votes` CASCADE
;

DROP TABLE IF EXISTS `motives` CASCADE
;

DROP TABLE IF EXISTS `permission` CASCADE
;

DROP TABLE IF EXISTS `permission_role` CASCADE
;

DROP TABLE IF EXISTS `points` CASCADE
;

DROP TABLE IF EXISTS `question` CASCADE
;

DROP TABLE IF EXISTS `questiontopic` CASCADE
;

DROP TABLE IF EXISTS `region` CASCADE
;

DROP TABLE IF EXISTS `request_status` CASCADE
;

DROP TABLE IF EXISTS `role` CASCADE
;

DROP TABLE IF EXISTS `service` CASCADE
;

DROP TABLE IF EXISTS `service_comment` CASCADE
;

DROP TABLE IF EXISTS `service_status` CASCADE
;

DROP TABLE IF EXISTS `session` CASCADE
;

DROP TABLE IF EXISTS `social` CASCADE
;

DROP TABLE IF EXISTS `status` CASCADE
;

DROP TABLE IF EXISTS `topic` CASCADE
;

DROP TABLE IF EXISTS `type` CASCADE
;

DROP TABLE IF EXISTS `type_banner` CASCADE
;

DROP TABLE IF EXISTS `type_document` CASCADE
;

DROP TABLE IF EXISTS `user` CASCADE
;

DROP TABLE IF EXISTS `user_answer` CASCADE
;

DROP TABLE IF EXISTS `user_category` CASCADE
;

DROP TABLE IF EXISTS `user_questiontopic` CASCADE
;

DROP TABLE IF EXISTS `user_role` CASCADE
;

DROP TABLE IF EXISTS `usertype` CASCADE
;

/* Create Tables */

CREATE TABLE `availability`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_availability` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Disponibilidad Baja Media Alta'

;

CREATE TABLE `banner`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`text` VARCHAR(255) NULL,
	`directory` VARCHAR(255) NULL,
	`id_type_banner` INT NULL,
	`position` INT NULL,
	CONSTRAINT `PK_banner` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `category`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_category` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Las categor�as a las que se puede postular un servicio son:     - Servicios en linea (Datos abiertos o Req Participacion)     - Gobierno en Linea     - Gestion de TI'

;

CREATE TABLE `category_questions`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_category` INT NULL,
	`text` VARCHAR(255) NULL,
	CONSTRAINT `PK_category_questions` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Se guardan las preguntas de cada categor�a'

;

CREATE TABLE `chats`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_sender` INT NULL,
	`id_receiver` INT NULL,
	`id_evaluation_request` INT NULL,
	`text` VARCHAR(255) NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_chats` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `city`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`code` VARCHAR(50) NULL,
	`latitude` DOUBLE(10,2) NULL,
	`longitude` DOUBLE(10,2) NULL,
	`id_region` INT NULL,
	CONSTRAINT `PK_City` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Una ciudad'

;

CREATE TABLE `config`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`header` VARCHAR(255) NULL,
	`address` VARCHAR(255) NULL,
	`postal_code` VARCHAR(255) NULL,
	`phone` VARCHAR(255) NULL,
	`free_phone` VARCHAR(255) NULL,
	`anticorruption_phone` VARCHAR(255) NULL,
	`email_PQRS` VARCHAR(255) NULL,
	`schedulle` VARCHAR(255) NULL,
	CONSTRAINT `PK_config` PRIMARY KEY (`id` ASC)
)
COMMENT = '  (Tabla para almacenar las variables de configuraci�n de la plataforma:  ruta del tema seleccionado email de contacto  Atiende los requerimientos: Dise�o Personalizado  Contactenos )'

;

CREATE TABLE `contact`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`lastname` VARCHAR(255) NULL,
	`topic` VARCHAR(255) NULL,
	`message` TEXT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_contact` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tabla donde se almacenan los mensajes enviados por el formulario de contactenos.  Atiende los requerimientos: Contactenos '

;

CREATE TABLE `country`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`nacionalidad` VARCHAR(50) NULL,
	`id_capital` INT NULL,
	CONSTRAINT `PK_country` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `evaluation_request`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_user` INT NULL COMMENT 'Id del evaluador',
	`id_user_answer` INT NULL COMMENT 'id relacional del requisito',
	`id_service` INT NULL,
	`id_request_status` INT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`result` TINYINT NULL,
	`justify_reject` VARCHAR(255) NULL,
	`alert_time` TIMESTAMP NULL,
	`end_time` TIMESTAMP NULL,
	CONSTRAINT `PK_user_form` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Se usa para guardar cuando un evaluador ha sido invitado a evaluar un servicio'

;

CREATE TABLE `faq`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`question` TEXT NULL,
	`answer` TEXT NULL,
	`active` BOOL NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_faq` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `form`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`id_category` INT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_form` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Formulario de Postulaci�n'

;

CREATE TABLE `hall_of_fame`
(
	`role` VARCHAR(50) NULL,
	`name` VARCHAR(50) NULL,
	`ranking` INT NULL,
	`points` INT NULL,
	`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

;

CREATE TABLE `hangouts`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NULL,
	`url` VARCHAR(255) NULL,
	`description` VARCHAR(255) NULL,
	`id_role` TINYINT NULL,
	`activation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_hangouts` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Agregar los treamings de aprende y ense�a'

;

CREATE TABLE `institution`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`nit` VARCHAR(50) NULL,
	`address` VARCHAR(255) NULL,
	`website` VARCHAR(255) NULL,
	`email` VARCHAR(255) NULL,
	`second_email` VARCHAR(255) NULL,
	`phone` VARCHAR(255) NULL,
	`extension_phone` VARCHAR(50) NULL,
	`head_sector` BOOL NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`designation_act` VARCHAR(255) NULL,
	`legalrep_name` VARCHAR(50) NULL,
	`legalrep_secondname` VARCHAR(50) NULL,
	`legalrep_lastname` VARCHAR(50) NULL,
	`legalrep_secondlastname` VARCHAR(50) NULL,
	`legalrep_document` VARCHAR(50) NULL,
	`legalrep_typedoc` INT NULL,
	`legalrep_email` VARCHAR(255) NULL,
	`legalrep_phone` VARCHAR(50) NULL,
	`legalrep_mobile` VARCHAR(50) NULL,
	`id_city` INT NULL,
	`id_region` INT NULL,
	`id_country` INT NULL,
	`id_user_creator` INT NULL COMMENT 'Usuario Responsable de la Instituci�n',
	CONSTRAINT `PK_institution` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Se refiere a un punto en espacial'

;

CREATE TABLE `institution_user`
(
	`id_institution` INT NULL,
	`id_user` INT NULL,
	`role` VARCHAR(50) NULL COMMENT 'El rol del usuairo es un texto debido a los diferentes nombramientos dentro de la instituci�n',
	`admin` BOOL NULL COMMENT 'Define si el usuario tiene acceso de administrar esta instituci�n',
	`certificate` TEXT NULL
)
COMMENT = 'Tabla para enlazar multiples usuarios a multiples instituciones y definir su rol dentro de la organizaci�n'

;

CREATE TABLE `media`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`url` VARCHAR(255) NULL,
	`type` VARCHAR(255) NULL COMMENT 'Variable para mantener el tipo de adjunto. Imagen Video (Archivo) Video (Link Youtube)',
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_Gallery` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Es un elemento multimedia que se puede adjuntar a una tabla, como un producto'

;

CREATE TABLE `message`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`text` TEXT NULL,
	`url` TEXT NULL,
	`id_topic` INT NULL,
	`id_user` INT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_Message` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Message'

;

CREATE TABLE `message_media`
(
	`id_media` INT NULL,
	`id_message` INT NULL
)

;

CREATE TABLE `message_votes`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_user` INT NULL,
	`id_message` INT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_message_votes` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `motives`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	`points` INT NULL,
	CONSTRAINT `PK_motives` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Posibles motivos para agregar puntos'

;

CREATE TABLE `permission`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_permission` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Permisos:     - platform     - evaluate     - manage_users     - manage_services     - forum'

;

CREATE TABLE `permission_role`
(
	`id_role` INT NULL,
	`id_permission` INT NULL
)

;

CREATE TABLE `points`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`prev_points` INT NULL COMMENT 'Puntos anteriores a la transacci�n de agregar puntos.',
	`value` INT NULL COMMENT 'Puntos que se le van a agregar',
	`result` INT NULL COMMENT 'prev_points + value',
	`justification` VARCHAR(50) NULL COMMENT 'Justificaci�n de por qu� se le agregan los puntos',
	`id_user` INT NULL COMMENT 'Usuario al que se le van a agregar los puntos',
	`id_motives` INT NULL COMMENT 'Una de las opciones por las que se pueden agregar puntos',
	CONSTRAINT `PK_points` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tabla para guardar los puntos que se le asignar�n a los usuarios.'

;

CREATE TABLE `question`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_topic` INT NULL,
	`level` INT NULL,
	`text` TEXT NULL,
	`criteria` TEXT NULL,
	`evidence` TEXT NULL,
	`legal_support` TEXT NULL,
	`help` TEXT NULL,
	CONSTRAINT `PK_question` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `questiontopic`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`id_usertype` INT NULL,
	`id_category` INT NULL,
	CONSTRAINT `PK_topic` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tema de la pregunta'

;

CREATE TABLE `region`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`id_capital` INT NULL,
	`id_country` INT NULL,
	`code` VARCHAR(2) NULL,
	CONSTRAINT `PK_Region` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Una Region'

;

CREATE TABLE `request_status`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_request_status` PRIMARY KEY (`id` ASC)
)
COMMENT = '    - Pendiente     - Solicitado     - Aceptado     - Rechazado'

;

CREATE TABLE `role`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_role` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Roles:     - Ciudadano     - Entidad (rep. legal)     - Evaluador     - Ministerio de Tecnologias'

;

CREATE TABLE `service`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`url` TEXT NULL,
	`id_category` INT NULL,
	`id_institution` INT NULL,
	`id_user` INT NULL COMMENT 'Usuario que crea el servicio',
	`hash` VARCHAR(255) NULL COMMENT 'Public Hash to identify',
	`rate` FLOAT(4,3) NOT NULL DEFAULT 3,
	`test_user` VARCHAR(255) NULL,
	`test_password` VARCHAR(255) NULL,
	`is_active` BOOL NULL,
	`is_product` BOOL NULL,
	`is_service` BOOL NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`current_status` INT NULL,
	CONSTRAINT `PK_service` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `service_comment`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_service` INT NULL,
	`id_user` INT NULL,
	`text` TEXT NULL,
	`rate` FLOAT(4,3) NOT NULL DEFAULT 3,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_service_comment` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Se guardan las calificaciones de los ciudadanos.'

;

CREATE TABLE `service_status`
(
	`id_service` INT NULL,
	`id_status` INT NULL,
	`level` TINYINT NULL COMMENT 'Nivel de Certificaci�n',
	`valid_to` TIMESTAMP NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

;

CREATE TABLE `session`
(
	`id_user` INT NULL,
	`agent` TEXT NULL,
	`ip` VARCHAR(50) NULL,
	`token` TEXT NULL,
	`expires` DATETIME NULL DEFAULT null
)

;

CREATE TABLE `social`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`icon` VARCHAR(255) NULL,
	`link` VARCHAR(255) NULL,
	CONSTRAINT `PK_social` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tabla para almacenar las redes sociales de la plataforma.  Atiende los requerimientos: Redes sociales '

;

CREATE TABLE `status`
(
	`id` INT NOT NULL,
	`name` VARCHAR(50) NULL,
	`duration` INT NULL,
	`pre_end` INT NULL,
	`alert` BOOL NULL,
	CONSTRAINT `PK_status` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Los posibles estados son:     - Verificaci�n     - Asignaci�n     - Aceptaci�n     - Retirado     - Evaluaci�n     - Retroalimentaci�n     - Cierre     - Aprobado     - Rechazado'

;

CREATE TABLE `topic`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	`id_parent` INT NULL COMMENT 'Tema Padre',
	`private` TINYINT NULL DEFAULT 0,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `PK_Topic` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `type`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	CONSTRAINT `PK_type` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tipo de pregunta:  Texto'

;

CREATE TABLE `type_banner`
(
	`id` INT NOT NULL AUTO_INCREMENT COMMENT 'Tipos de banner para visualizar     - foto y texto     - foto y sombra     - video y texto',
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_type_banner` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tipos de banner para visualizar     - foto y texto     - foto y sombra     - video y texto     - '

;

CREATE TABLE `type_document`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	CONSTRAINT `PK_type_document` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `user`
(
	`id` INT NOT NULL AUTO_INCREMENT COMMENT 'Id Autonumerico del usuario',
	`picture` VARCHAR(255) NULL,
	`name` VARCHAR(255) NULL COMMENT 'Nombre del usuario',
	`secondname` VARCHAR(255) NULL,
	`lastname` VARCHAR(255) NULL COMMENT 'Apellido del usuario',
	`secondlastname` VARCHAR(50) NULL,
	`email` VARCHAR(255) NULL COMMENT 'Email del usuario',
	`phone` VARCHAR(50) NULL COMMENT 'Tel�fono del Usuario',
	`extension` VARCHAR(50) NULL,
	`mobile` VARCHAR(50) NULL,
	`organization` VARCHAR(50) NULL,
	`ocupation` VARCHAR(50) NULL,
	`education_level` VARCHAR(50) NULL,
	`password` TEXT NULL,
	`tmp_pwd` BOOL NULL COMMENT 'Bandera usada para solicitar el cambio de clave al iniciar sesi�n. Utilizar en false para NO Utilizar en true para SI',
	`points` INT NULL COMMENT 'Puntos del usuario',
	`active` BOOL NULL COMMENT 'Bandera para el estado del usuario: false = inactivo true =  activo',
	`verified` BOOL NULL COMMENT 'Bandera para conocer el estado de verificaci�n del usuario 0 No verificado 1 Verificado',
	`terms` BOOL NOT NULL DEFAULT 0,
	`newsletter` BOOL NOT NULL DEFAULT 0,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`id_availability` INT NULL,
	`id_city` INT NULL,
	`id_region` INT NULL,
	`id_country` INT NULL,
	`document` VARCHAR(50) NULL,
	`id_type_document` INT NULL,
	CONSTRAINT `PK_user` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Un usuario descrito en la plataforma Este puede ser un empleado o un cliente  Atiende los requerimientos: Envio de Boletin de Ofertas Funcionales  '

;

CREATE TABLE `user_answer`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_answer` INT NULL,
	`id_question` INT NULL,
	`id_user` INT NULL,
	`datetime` TIMESTAMP NOT NULL,
	`id_media` INT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`requisite` TEXT NULL,
	`support_legal` TEXT NULL,
	`justification` TEXT NULL,
	`id_topic` INT NULL,
	`evidence` TEXT NULL,
	`help` TEXT NULL,
	`id_service` INT NULL,
	`id_status` INT NULL,
	CONSTRAINT `PK_user_answer` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Guarda las evidencias de los requisitos de los servicios postulados por una entidad.  (Puede ser de opci�n m�ltiple, selecci�n �nica, o m�ltiple pregunta abierta, y contener un adjunto.)'

;

CREATE TABLE `user_category`
(
	`id_user` INT NULL,
	`id_category` INT NULL
)
COMMENT = 'Enlaza a un usuario con multiples categorias'

;

CREATE TABLE `user_questiontopic`
(
	`id_user` INT NULL,
	`id_topic` INT NULL
)
COMMENT = 'Enlaza un Usuario a un tema'

;

CREATE TABLE `user_role`
(
	`id_user` INT NULL,
	`id_role` INT NULL
)

;

CREATE TABLE `usertype`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL,
	CONSTRAINT `PK_user_type` PRIMARY KEY (`id` ASC)
)
COMMENT = 'Tipo de usuario (Usado para las tematicas)'

;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `city` 
 ADD INDEX `IXFK_City_Region` (`id_region` ASC)
;

ALTER TABLE `questiontopic` 
 ADD INDEX `IXFK_tematica_category` (`id_category` ASC)
;

ALTER TABLE `questiontopic` 
 ADD INDEX `IXFK_tematica_usertype` (`id_usertype` ASC)
;

ALTER TABLE `region` 
 ADD INDEX `IXFK_Region_City` (`id_capital` ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE `banner` 
 ADD CONSTRAINT `FK_banner_type_banner`
	FOREIGN KEY (`id_type_banner`) REFERENCES `type_banner` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `category_questions` 
 ADD CONSTRAINT `FK_category_questions_category`
	FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `chats` 
 ADD CONSTRAINT `FK_chats_evaluation_request`
	FOREIGN KEY (`id_evaluation_request`) REFERENCES `evaluation_request` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `chats` 
 ADD CONSTRAINT `FK_chats_user`
	FOREIGN KEY (`id_sender`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `chats` 
 ADD CONSTRAINT `FK_chats_user_02`
	FOREIGN KEY (`id_receiver`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `city` 
 ADD CONSTRAINT `FK_City_Region`
	FOREIGN KEY (`id_region`) REFERENCES `region` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `country` 
 ADD CONSTRAINT `FK_country_city`
	FOREIGN KEY (`id_capital`) REFERENCES `city` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `evaluation_request` 
 ADD CONSTRAINT `FK_evaluation_request_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `evaluation_request` 
 ADD CONSTRAINT `FK_evaluation_request_user_answer`
	FOREIGN KEY (`id_user_answer`) REFERENCES `user_answer` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `evaluation_request` 
 ADD CONSTRAINT `FK_user_form_request_status`
	FOREIGN KEY (`id_request_status`) REFERENCES `request_status` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `evaluation_request` 
 ADD CONSTRAINT `FK_user_form_service`
	FOREIGN KEY (`id_service`) REFERENCES `service` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `form` 
 ADD CONSTRAINT `FK_form_category`
	FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `institution` 
 ADD CONSTRAINT `FK_Institution_City`
	FOREIGN KEY (`id_city`) REFERENCES `city` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `institution` 
 ADD CONSTRAINT `FK_institution_country`
	FOREIGN KEY (`id_country`) REFERENCES `country` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `institution` 
 ADD CONSTRAINT `FK_institution_region`
	FOREIGN KEY (`id_region`) REFERENCES `region` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `institution` 
 ADD CONSTRAINT `FK_institution_user`
	FOREIGN KEY (`id_user_creator`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `institution_user` 
 ADD CONSTRAINT `FK_institution_user_institution`
	FOREIGN KEY (`id_institution`) REFERENCES `institution` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `institution_user` 
 ADD CONSTRAINT `FK_institution_user_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `message` 
 ADD CONSTRAINT `FK_message_topic`
	FOREIGN KEY (`id_topic`) REFERENCES `topic` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `message` 
 ADD CONSTRAINT `FK_message_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `message_media` 
 ADD CONSTRAINT `FK_message_media_media`
	FOREIGN KEY (`id_media`) REFERENCES `media` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `message_media` 
 ADD CONSTRAINT `FK_message_media_message`
	FOREIGN KEY (`id_message`) REFERENCES `message` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `message_votes` 
 ADD CONSTRAINT `FK_message_votes_message`
	FOREIGN KEY (`id_message`) REFERENCES `message` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `message_votes` 
 ADD CONSTRAINT `FK_message_votes_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `permission_role` 
 ADD CONSTRAINT `FK_permission_role_permission`
	FOREIGN KEY (`id_permission`) REFERENCES `permission` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `permission_role` 
 ADD CONSTRAINT `FK_permission_role_role`
	FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `points` 
 ADD CONSTRAINT `FK_points_motives`
	FOREIGN KEY (`id_motives`) REFERENCES `motives` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `points` 
 ADD CONSTRAINT `FK_points_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `question` 
 ADD CONSTRAINT `FK_question_topic`
	FOREIGN KEY (`id_topic`) REFERENCES `questiontopic` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `questiontopic` 
 ADD CONSTRAINT `FK_tematica_category`
	FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `questiontopic` 
 ADD CONSTRAINT `FK_tematica_usertype`
	FOREIGN KEY (`id_usertype`) REFERENCES `usertype` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `region` 
 ADD CONSTRAINT `FK_Region_City`
	FOREIGN KEY (`id_capital`) REFERENCES `city` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `region` 
 ADD CONSTRAINT `FK_region_country`
	FOREIGN KEY (`id_country`) REFERENCES `country` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service` 
 ADD CONSTRAINT `FK_service_category`
	FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service` 
 ADD CONSTRAINT `FK_service_institution`
	FOREIGN KEY (`id_institution`) REFERENCES `institution` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service` 
 ADD CONSTRAINT `FK_service_status`
	FOREIGN KEY (`current_status`) REFERENCES `status` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service` 
 ADD CONSTRAINT `FK_service_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service_comment` 
 ADD CONSTRAINT `FK_service_comment_service`
	FOREIGN KEY (`id_service`) REFERENCES `service` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service_comment` 
 ADD CONSTRAINT `FK_service_comment_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service_status` 
 ADD CONSTRAINT `FK_service_status_service`
	FOREIGN KEY (`id_service`) REFERENCES `service` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `service_status` 
 ADD CONSTRAINT `FK_service_status_status`
	FOREIGN KEY (`id_status`) REFERENCES `status` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `session` 
 ADD CONSTRAINT `FK_session_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Cascade ON UPDATE Restrict
;

ALTER TABLE `topic` 
 ADD CONSTRAINT `FK_Topic_Topic`
	FOREIGN KEY (`id_parent`) REFERENCES `topic` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user` 
 ADD CONSTRAINT `FK_user_availability`
	FOREIGN KEY (`id_availability`) REFERENCES `availability` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user` 
 ADD CONSTRAINT `FK_user_city`
	FOREIGN KEY (`id_city`) REFERENCES `city` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user` 
 ADD CONSTRAINT `FK_user_country`
	FOREIGN KEY (`id_country`) REFERENCES `country` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user` 
 ADD CONSTRAINT `FK_user_region`
	FOREIGN KEY (`id_region`) REFERENCES `region` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user` 
 ADD CONSTRAINT `FK_user_type_document`
	FOREIGN KEY (`id_type_document`) REFERENCES `type_document` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_answer` 
 ADD CONSTRAINT `FK_user_answer_media`
	FOREIGN KEY (`id_media`) REFERENCES `media` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_answer` 
 ADD CONSTRAINT `FK_user_answer_question`
	FOREIGN KEY (`id_question`) REFERENCES `question` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_answer` 
 ADD CONSTRAINT `FK_user_answer_questiontopic`
	FOREIGN KEY (`id_topic`) REFERENCES `questiontopic` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_answer` 
 ADD CONSTRAINT `FK_user_answer_service`
	FOREIGN KEY (`id_service`) REFERENCES `service` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_answer` 
 ADD CONSTRAINT `FK_user_answer_status`
	FOREIGN KEY (`id_status`) REFERENCES `status` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_answer` 
 ADD CONSTRAINT `FK_user_answer_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_category` 
 ADD CONSTRAINT `FK_user_category_category`
	FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_category` 
 ADD CONSTRAINT `FK_user_category_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Cascade ON UPDATE Restrict
;

ALTER TABLE `user_questiontopic` 
 ADD CONSTRAINT `FK_user_topic_topic`
	FOREIGN KEY (`id_topic`) REFERENCES `questiontopic` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_questiontopic` 
 ADD CONSTRAINT `FK_user_topic_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Cascade ON UPDATE Restrict
;

ALTER TABLE `user_role` 
 ADD CONSTRAINT `FK_user_role_role`
	FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_role` 
 ADD CONSTRAINT `FK_user_role_user`
	FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE Cascade ON UPDATE Restrict
;

SET FOREIGN_KEY_CHECKS=1 
;

/* Create Views */


;
