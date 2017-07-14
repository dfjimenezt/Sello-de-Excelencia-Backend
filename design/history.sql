USE stamp;

INSERT INTO availability(id, name) VALUES
('1', 'Alta (7 horas diarias approx.)'),
('2', 'Media (4 horas diarias approx.)'),
('3', 'Baja (2 horas diarias approx.)');

INSERT INTO category(id, name) VALUES
('1', 'Gobierno en Linea - Datos Abiertos'),
('2', 'Gobierno en Linea - Requisitos de Participacion'),
('3', 'Servicios en Linea'),
('4', 'Gestion de TI');

INSERT INTO region(id, name) VALUES
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

INSERT INTO city(id, name, id_region) VALUES
('1', 'MEDELLIN', '2');

INSERT INTO type(id, name) VALUES
('1', 'Abierta'),
('2', 'Selección múltiple');

INSERT INTO level(id, name) VALUES
('1', 'Usuario'),
('2', 'Experto');

INSERT INTO permission(id, name) VALUES
('1', 'Platform'),
('2', 'Evaluate'),
('3', 'Manage_users'),
('4', 'Manage_services'),
('5', 'Forum');

INSERT INTO permission_role(id_role, id_permission) VALUES
('1', '1'),
('2', '2'),
('3', '2');

INSERT INTO request_status(id, name) VALUES
('1', 'Pendiente'),
('2', 'Aceptado'),
('3', 'Rechazado'),
('4', 'Solicitado');

INSERT INTO status(id, name) VALUES
('1', 'Postulado'),
('2', 'Retirado'),
('3', 'Rechazado'),
('4', 'Aprobado');

INSERT INTO user_role(id_user, id_role) VALUES
('5', '3'),
('4', '4');