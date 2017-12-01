#SELECT *
#FROM stamp.service WHERE id_level <= 3
# el selector de categoria depende de las categorias seleccionables por el evaluador
# así que el número de categorías a listar es variable.
select distinct ser.name, ins.name as institution, ser.id_category, ser.timestamp
from stamp.service ser
right join stamp.institution ins ON ser.id_institution = ins.id
right join stamp.region reg on ins.id_region = reg.id where ser.current_status = 1 and ins.name like "%en%" and reg.id = 1 and ser.id_level <= 2 and ser.id_category = 1 ;