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

#requisito = requisito + sustentación legal + justificación + criterio + evidencia + ayuda + adjunto

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