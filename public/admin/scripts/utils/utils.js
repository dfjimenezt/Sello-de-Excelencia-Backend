angular.module('dmt-back').filter('translate', function () {
    return function (word, lang) {
		lang = lang || "es";
		var directory = dmt.translate[lang];
		return directory[word] || word;
    }
});
angular.module('dmt-back').filter('linkvalue', function () {
    return function (items, field, item) {
        for (i in items) {
            let it = items[i];
            if (item[field.name] === it[field.foreign_key]) {
                return it[field.foreign_name];
            }
        }
    }
});
angular.module('dmt-back').factory('Excel',function($window){
	var uri='data:application/vnd.ms-excel;base64,',
		template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
		format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
	return {
		tableToExcel:function(tableId,worksheetName){
			var table=document.querySelector(tableId),
				ctx={worksheet:worksheetName,table:table.innerHTML},
				href=uri+base64(format(template,ctx));
			return href;
		}
	};
})
function buildBreadcrum(path, page, breadcrum) {
	if(!breadcrum){
		breadcrum = "";
	}
	if (page) {
		var name = page.name ||  page.section;
		path = path.substr(0, path.lastIndexOf("/"));
		breadcrum = "<a href='#!" + path + "'> >" + name + "</a>" + breadcrum;
		page = page.parent;
		return buildBreadcrum(path, page, breadcrum);
	}
	return breadcrum;
}