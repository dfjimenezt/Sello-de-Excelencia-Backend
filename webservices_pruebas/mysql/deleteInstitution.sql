SET FOREIGN_KEY_CHECKS=0;
DELETE FROM stamp.institution_user WHERE id_user = 4;
DELETE FROM stamp.institution WHERE id = 3; 
DELETE FROM stamp.user WHERE id = 4;
SET FOREIGN_KEY_CHECKS=1;