function DomSearch( containerSelector, elementSelector, dataSelector ){
	this.containerSelector = containerSelector;
	this.elementSelector = elementSelector;
	this.elementSelectorHidden = elementSelector+'-hidden';
	this.dataSelector = dataSelector;
	this.searchCache = [];
}

DomSearch.prototype.generateIndex = function(){
	var parent = document.querySelectorAll( this.containerSelector )[0];
	var elements = parent.querySelectorAll( this.elementSelector );
	this.searchCache = [];
	for( var i=0, l=elements.length; i<l; i+=1 ){
		var element = elements[i];
		var searchText = [];
		var datas = element.querySelectorAll( this.dataSelector );
		for( var j=0, jl=datas.length; j<jl; j+=1 ){
			searchText.push( datas[j].textContent.toLowerCase() );
		}
		this.searchCache.push( {
			element: element,
			searchText: searchText.join(' ')
		} );
	}
};

DomSearch.prototype.query = function( text, onPass, onFail ){
	var cleanText = text.toLowerCase();
	for( var i=0, l=this.searchCache.length; i<l; i+=1 ){
		if( this.searchCache[i].searchText.indexOf( cleanText ) > -1 ){
			onPass( this, this.searchCache[i].element, cleanText );
		}else{
			onFail( this, this.searchCache[i].element, cleanText );
		}
	}
};
