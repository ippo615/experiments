function ImageClass1D(){
	this.xSize = 320;
	this.ySize = 240;
	this.nChannels = 4;
	this.data = [];
}

ImageClass1D.prototype.init = function( xSize, ySize, nChannels ){
	this.xSize = xSize;
	this.ySize = ySize;
	this.nChannels = nChannels
	this.data = Uint8Array( xSize*ySize*nChannels );
	return this;
};

ImageClass1D.prototype.get = function( x, y, channel ){
	return this.data[ (this.nChannels*this.xSize*y) + x + channel ]; 
};

ImageClass1D.prototype.getArray = function( x, y ){
	var result = [];
	var i, l = this.nChannels;
	for( i=0; i<l; i+=1 ){
		result.push( this.data[ (this.nChannels*this.xSize*y) + x + i ] );
	}
	return result; 
};

ImageClass1D.prototype.set = function( x, y, channel, value ){
	this.data[ (this.nChannels*this.xSize*y) + x + channel ] = value;
};

ImageClass1D.prototype.setArray = function( x, y, values ){
	var i, l = values.length;
	for( i=0; i<l; i+=1 ){
		this.data[ (this.nChannels*this.xSize*y) + x + i ] = values[i];
	}
};

ImageClass1D.prototype.iterate = function( xStart, yStart, xEnd, yEnd, channel, state, action ){
	var x,y;
	var xStep=1, yStep=1;

	for( y=yStart; y<yEnd; y+=yStep ){
		for( x=xStart; x<xEnd; x+=xStep ){
			state.x = x;
			state.y = y;
			action( this.get( x,y, channel ), state );
		}
	}

};