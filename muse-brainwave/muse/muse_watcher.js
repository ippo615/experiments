
function MuseWatcher( path, types, names, delay ){
	this.data = {};
	for( var i=0, l=names.length; i<l; i+=1 ){
		this.data[names[i]] = 0;
	}

	this.chart = new Chart( this.data );
	
	this.path = path;
	this.types = types;
	this.names = names;
	this.delay = (delay !== null) ? 100 : delay;

	this.attach();
}
MuseWatcher.prototype.update = function( data ){
	this.chart.push( (new Date()).getTime(), data );
};
MuseWatcher.prototype.getUpdate = function(){
	var that = this;
	$.get( 'data'+path+'.jsonfm', function(response){
		that.update( JSON.parse( response ) );
	});
};
MuseWatcher.prototype.updateAjaxClosure = function(){
	var that = this;
	return function repeat(){
		$.get( 'data'+that.path+'.jsonfm', function(response){
			try{
				that.update( JSON.parse( response ) );
			}catch(e){}
			setTimeout( repeat, that.delay );
		});
	};
};
MuseWatcher.prototype.updateRandomClosure = function(){
	var that = this;
	return function repeat(){
		var data = {};
		for( var i=0, l=that.names.length; i<l; i+=1 ){
			data[that.names[i]] = Math.random();
		}
		that.update( data );
		setTimeout( repeat, that.delay );
	};
};
MuseWatcher.prototype.updateClosure = MuseWatcher.prototype.updateAjaxClosure;
MuseWatcher.prototype.start = function( delayOffset ){
	setTimeout(this.updateClosure(),delayOffset);
};
MuseWatcher.prototype.attach = function(parent){
	if( ! parent ){
		var domId = 'container' + this.path.replace(/\//g,'_');
		parent = document.getElementById( domId );
		if( parent === null ){
			parent = document.body;
		}
	}
	parent.appendChild( this.chart.canvas );
};

