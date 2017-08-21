SELECT q.id as id_question, q.text, q.legal_support, q.criteria,q.evidence, q.help, join2.*
FROM stamp.question q
JOIN (SELECT qt.id as id_questiontopic, qt.name as name_topics, qt.id_usertype, qt.id_category, join1.level, join1.id as id_service, join1.id_user
	FROM stamp.questiontopic qt
	RIGHT JOIN 
	(SELECT id_category, s.id, level, s.id_user
		FROM stamp.service s
		RIGHT JOIN stamp.service_status s_s ON s.id = s_s.id_service 
        WHERE s_s.id_service = 1) join1 
	ON qt.id_category = join1.id_category) join2 
ON q.id_topic = join2.id_questiontopic WHERE q.level <= join2.level ORDER BY q.id;