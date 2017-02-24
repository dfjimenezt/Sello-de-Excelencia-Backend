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