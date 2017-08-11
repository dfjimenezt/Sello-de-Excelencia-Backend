INSERT INTO question (text,criteria,evidence,legal,level, help,id_topic)
SELECT r.Requisito,r.Criterio,r.Evidencia,r.`Sustento legal o técnico`,r.Nivel,r.Ayuda,qt.id 
FROM stamp.gobierno_en_linea_datos_abiertos r JOIN
questiontopic qt ON qt.name = r.`Area Tematica`

