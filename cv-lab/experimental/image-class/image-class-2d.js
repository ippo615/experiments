function ImageClass2D(){
	this.xSize = 320;
	this.ySize = 240;
	this.nChannels = 4;
	this.data = [];
}

ImageClass2D.prototype.init = function( xSize, ySize, nChannels ){
	this.xSize = xSize;
	this.ySize = ySize;
	this.nChannels = nChannels;
	var c,y,x;
	for( c=0; c<this.nChannels; c+=1 ){
		this.data.push( [] );
		for( y=0; y<this.ySize; y+=1 ){
			this.data[c].push( Uint8Array( this.xSize ) );
		}
	}
	return this;
};

ImageClass2D.prototype.get = function( x, y, channel ){
	return this.data[channel][y][x];
};

ImageClass2D.prototype.getArray = function( x, y ){
	var result = [];
	var i, l = this.nChannels;
	for( i=0; i<l; i+=1 ){
		result.push( this.data[i][y][x] );
	}
	return result; 
};

ImageClass2D.prototype.set = function( x, y, channel, value ){
	this.data[channel][y][x] = value;
};

ImageClass2D.prototype.setArray = function( x, y, values ){
	var i, l = values.length;
	for( i=0; i<l; i+=1 ){
		this.data[i][y][x] = values[i];
	}
};

ImageClass2D.prototype.iterate = function( xStart, yStart, xEnd, yEnd, channel, state, action ){
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
