# trae los questions relacionando id_category del servicio y nivel solo cambiando id_service
SELECT *
FROM stamp.question q
RIGHT JOIN
(SELECT id, name, level
FROM stamp.questiontopic qt
RIGHT JOIN 
(SELECT id_category, level
FROM stamp.service ser
LEFT JOIN stamp.service_status s_s ON ser.id = s_s.id_service WHERE s_s.id_service = 1) join1 ON
qt.id_category = join1.id_category) join2 ON q.id_topic = join2.id WHERE q.level <= join2.level;