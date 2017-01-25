/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * question
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_segment","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_speciality","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_attribute","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"step","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 10 / 1 / 2017 - 21:41:30
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Question = function () {

    this.createMultiple = function (data, col_names) {
        var query = "INSERT INTO question (" + col_names.join(",") + ") VALUES ";
        for (let i in data) {
            query += "("; //init
            for (let j in col_names) {
                if (data[i][col_names[j]] === undefined) {
                    query += "NULL,";
                } else {
                    query += "'" + data[i][col_names[j]] + "',";
                }

            }
            query = query.slice(0, -1);
            query += "),";
        }
        query = query.slice(0, -1);
        console.log(query);
        return this.customQuery(query);
    }

    var params = ['question', 'mysql']
    BaseModel.apply(this, params)
    return this
}
util.inherits(Question, BaseModel)
module.exports = Question