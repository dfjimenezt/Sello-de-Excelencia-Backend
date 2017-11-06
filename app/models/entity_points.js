/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 7 / 10 / 2017 - 19:15:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Points = function () {
	var params = [{
	"table": "points",
	"relations": [
		{
			"type": "1-1",
			"entity": "motives",
			"name": "motives",
			"leftKey": "id_motives",
			"foreign_name": "name"
		}
	],
	"entity": "points",
	"model": "entity"
}]
	BaseModel.apply(this, params)
	this.getSumarizedUser = function (id) {
		let q = `SELECT SUM(\`value\`) \`value\`,\`id_motives\` FROM points WHERE id_user = '${id}' GROUP BY id_motives`
		return this.customQuery(q)
	}
	this.getSumarizedInstitution = function (id) {
		let q = `SELECT SUM(\`value\`) \`value\`,\`id_motives\` FROM points WHERE id_institution = '${id}' GROUP BY id_motives`
		return this.customQuery(q)
	}
	this.addInstitutionPoints = function (institution, motive, justification,video,value) {
		video = video || 'NULL'
		let insert = `
		INSERT INTO points (\`prev_points\`,\`value\`,\`result\`,
		\`justification\`,\`id_institution\`,\`id_motives\`,\`id_hangout\`)
		SELECT 
		\`p\`.\`prev_points\`,
		${value ? value:'\`m\`.\`points\` \`value\`'},
		${value ? '(\`p\`.\`prev_points\` + '+value+') \`result\`':'(\`p\`.\`prev_points\` + \`m\`.\`points\`) \`result\`'},
		${justification.length>0 ? '\''+justification+'\'' :'\`m\`.\`description\`'}  \`justification\`,
		${institution},
		${motive},
		${video}
		FROM \`motives\` \`m\`,
		(SELECT SUM(\`p\`.\`value\`) \`prev_points\` FROM \`points\` \`p\` 
		WHERE \`p\`.\`id_institution\` = ${institution}) \`p\` WHERE \`m\`.\`id\` = ${motive}`
		
		if(video != 'NULL'){
			let q = `SELECT count(*) count FROM points WHERE 
				id_hangout = '${video}' AND id_institution = '${institution}'`
			return this.customQuery(q).then((result)=>{
				return result[0].count == 0 ? this.customQuery(insert) : null
			})
		}else{
			return this.customQuery(insert)
		}
	}
	this.addUserPoints = function (user, motive, justification,video,value) {
		video = video || 'NULL'
		let insert = `SET @result = 0;
		INSERT INTO points (\`prev_points\`,\`value\`,\`result\`,
		\`justification\`,\`id_user\`,\`id_motives\`,\`id_hangout\`)
		SELECT 
		\`p\`.\`prev_points\`,
		${value ? value:'\`m\`.\`points\` \`value\`'},
		@result := ${value ? '(\`p\`.\`prev_points\` + '+value+') \`result\`':'(\`p\`.\`prev_points\` + \`m\`.\`points\`) \`result\`'},
		${justification.length>0 ? '\''+justification+'\'' :'\`m\`.\`description\`'}  \`justification\`,
		${user},
		${motive},
		${video}
		FROM \`motives\` \`m\`,
		(SELECT SUM(\`p\`.\`value\`) \`prev_points\` FROM \`points\` \`p\` 
		WHERE \`p\`.\`id_user\` = ${user}) \`p\` WHERE \`m\`.\`id\` = ${motive};
		UPDATE \`user\` SET \`points\` = @result WHERE \`id\` = ${user}`
		
		if(video != 'NULL'){
			let q = `SELECT count(*) count FROM points WHERE 
				id_hangout = '${video}' AND id_user = '${user}'`
			return this.customQuery(q).then((result)=>{
				return result[0].count == 0 ? this.customQuery(insert) : null
			})
		}else{
			return this.customQuery(insert)
		}
	}
	return this
};
util.inherits(Points, BaseModel)
module.exports = Points