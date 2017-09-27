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