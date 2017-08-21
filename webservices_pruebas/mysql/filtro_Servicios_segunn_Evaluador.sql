# 
# join2.current_status_service = [2: asignación]
# INPUTS
SELECT join2.id_service, join2.level_service, join2.name_service, 
join2.id_category_service, join2.id_institution, i.name AS name_institution, i.id_region,
join2.id_user_creator_service, join2.timestamp_services, join2.current_status_service
FROM
stamp.institution i
RIGHT JOIN
(SELECT s.id AS id_service, join1.level AS level_service, s.name AS name_service, 
s.id_category AS id_category_service, s.id_institution, s.id_user AS id_user_creator_service, 
s.timestamp AS timestamp_services, s.current_status AS current_status_service 
FROM
stamp.service s
LEFT JOIN
(SELECT s_s.id_service, s_s.level
FROM
(SELECT DISTINCT id_service
FROM stamp.user_answer u_a
LEFT JOIN stamp.user_questiontopic u_q ON
u_a.id_topic = u_q.id_topic WHERE u_q.id_user = 8 ORDER BY id_service) join0
LEFT JOIN stamp.service_status s_s ON
join0.id_service = s_s.id_service) join1
ON s.id = join1.id_service) join2 ON i.id = join2.id_institution
WHERE join2.current_status_service = 3 
AND i.name LIKE "%%" 
AND i.id_region = 2 
AND id_category_service = 1
AND join2.level_service = 2

