INSERT INTO question (text,criteria,evidence,legal,level, help,id_topic)
SELECT r.Requisito,r.Criterio,r.Evidencia,r.`Sustento legal o técnico`,r.Nivel,r.Ayuda,qt.id 
FROM stamp.gobierno_en_linea_datos_abiertos r JOIN
questiontopic qt ON qt.name = r.`Area Tematica`

### Revisar porque se debe agregar un AND qt.id_category = '1' 
### agregar un '1', '2' o '3' al final asegura que aunque se llamen igual
### sólo se agregen los tópicos de cada categoría
