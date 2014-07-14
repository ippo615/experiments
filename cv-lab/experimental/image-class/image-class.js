var CvLab = (function (CvLab) {

	var warnIfFalse = function( assertTrue, errorMessage ){
		if( ! assertTrue ){
			console.warn( errorMessage );
		}
		return assertTrue;
	};

	var Image = function(){
		this.xSize = 320;
		this.ySize = 240;
		this.nChannels = 4;
		this.data = [];

		this.width = this.xSize;
		this.height = this.ySize;
	};
	Image.prototype.fromUrl = function( url ){
		
	};
	Image.prototype.fromImageData = function( imageData ){
		this.xSize = imageData.width;
		this.ySize = imageData.height;
		this.nChannels = 4;
		this.data = imageData.data;

		this.width = this.xSize;
		this.height = this.ySize;
	};
	Image.prototype.toImageData = function(){
		var img = new ImageData( this.xSize, this.ySize );
		var x,y,c;
		for( x=0; x<this.xSize; x+=1 ) 
	};

	Image.prototype.fromBlank = function( xSize, ySize, nChannels, pixel ){
		this.xSize = xSize;
		this.ySize = ySize;
		this.nChannels = nChannels;
		this.data = Uint8Array( this.xSize*this.ySize*this.nChannels );

		var x,y;
		for( y=0; y<ySize; y+=1 ){
			for( x=0; x<xSize; x+=1 ){
				this.setPx( x,y, pixel  );
			}
		}

		this.width = this.xSize;
		this.height = this.ySize;
	};

	Image.prototype.setPx = function( x,y, pixel ){
		var i, l = pixel.length;
		for( i=0; i<l; i+=1 ){
			this.data[ (this.nChannels*this.xSize*y) + x + i ] = pixel[i];
		}
	};
	Image.prototype.setCh = function( x,y, channel, value ){
		this.data[ (this.nChannels*this.xSize*y) + x + channel ] = value;
	};

	Image.prototype.getPx = function( x,y ){
		var result = [];
		var i, l = this.nChannels;
		for( i=0; i<l; i+=1 ){
			result.push( this.data[ (this.nChannels*this.xSize*y) + x + i ] );
		}
		return result;
	};
	Image.prototype.getCh = function( x,y, channel ){
		return this.data[ (this.nChannels*this.xSize*y) + x + channel ];
	};

	return CvLab;
}(CvLab || {}));

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