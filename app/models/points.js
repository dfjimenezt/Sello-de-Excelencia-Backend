/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * points
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"prev_points","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"value","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"result","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"justification","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_motives","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Points = function () {
	var params = [{
		table: 'points',
		fields: [{ "Field": "id", "Type": "int(11)", "Null": "NO", "Key": "PRI", "Default": null, "Extra": "auto_increment" }, { "Field": "prev_points", "Type": "int(11)", "Null": "YES", "Key": "", "Default": null, "Extra": "" }, { "Field": "value", "Type": "int(11)", "Null": "YES", "Key": "", "Default": null, "Extra": "" }, { "Field": "result", "Type": "int(11)", "Null": "YES", "Key": "", "Default": null, "Extra": "" }, { "Field": "justification", "Type": "varchar(50)", "Null": "YES", "Key": "", "Default": null, "Extra": "" }, { "Field": "id_user", "Type": "int(11)", "Null": "YES", "Key": "MUL", "Default": null, "Extra": "" }, { "Field": "id_motives", "Type": "int(11)", "Null": "YES", "Key": "MUL", "Default": null, "Extra": "" }],
		model: 'mysql'
	}]
	BaseModel.apply(this, params)
	this.getSumarized = function (id) {
		let q = `SELECT SUM(\`value\`) \`value\`,\`id_motives\` FROM points WHERE id_user = '${id}' GROUP BY id_motives`
		return this.customQuery(q)
	}
	this.addInstitutionPoints = function (institution, motive, justification,video) {
		video = video || 'NULL'
		let insert = `
		INSERT INTO points (\`prev_points\`,\`value\`,\`result\`,
		\`justification\`,\`id_institution\`,\`id_motives\`,\`id_hangout\`)
		SELECT 
		\`p\`.\`prev_points\`,
		\`m\`.\`points\` \`value\`,
		(\`p\`.\`prev_points\` + \`m\`.\`points\`) \`result\`,
		IFNULL(\`m\`.\`description\`,'${justification}') \`justification\`,
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
	this.addUserPoints = function (user, motive, justification,video) {
		video = video || 'NULL'
		let insert = `
		INSERT INTO points (\`prev_points\`,\`value\`,\`result\`,
		\`justification\`,\`id_user\`,\`id_motives\`,\`id_hangout\`)
		SELECT 
		\`p\`.\`prev_points\`,
		\`m\`.\`points\` \`value\`,
		(\`p\`.\`prev_points\` + \`m\`.\`points\`) \`result\`,
		IFNULL(\`m\`.\`description\`,'${justification}') \`justification\`,
		${user},
		${motive},
		${video}
		FROM \`motives\` \`m\`,
		(SELECT SUM(\`p\`.\`value\`) \`prev_points\` FROM \`points\` \`p\` 
		WHERE \`p\`.\`id_user\` = ${user}) \`p\` WHERE \`m\`.\`id\` = ${motive}`
		
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