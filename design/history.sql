INSERT INTO `permission`(`id`, `name`) VALUES
('1', 'admin'),
('2', 'platform'),
('3', 'none');

INSERT INTO `role`(`id`, `name`) VALUES
('1', 'admin'),
('2', 'medic'),
('3', 'patient');

INSERT INTO `permission_role`(`id_role`, `id_permission`) VALUES
('1', '1'),
('2', '2'),
('3', '3');/Users/jiacontrerasp/Development/domoti/dmt-historicare/backend-nodejs/design/extra.sql
