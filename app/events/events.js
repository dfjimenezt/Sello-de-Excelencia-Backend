let emiter = require('./emiter.js').instance
var Events = function (){
	emiter.on('video.view',(user,motive,description,id_hangout)=>{

	})
	emiter.on('requisitie.calification',(user,requisite, status)=>{
		
	})
	emiter.on('service.calification',(user,requisite, status)=>{
		
	})
}
module.exports = Events