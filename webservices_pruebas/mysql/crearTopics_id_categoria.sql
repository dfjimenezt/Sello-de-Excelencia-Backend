SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE stamp.questiontopic;
SET FOREIGN_KEY_CHECKS=1;
SELECT * FROM stamp.questiontopic;
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