
function createSquares( nCols, nRows, parent ){
	var xSizePx = parent.clientWidth / nCols;
	var ySizePx = parent.clientHeight / nRows;
	var xSizePc = 100.0/nCols;
	var ySizePc = 100.0/nRows;
	var htmlCode = '';
	var squareCode = '';
	for( var x=0; x<nCols; x+=1 ){
		for( var y=0; y<nCols; y+=1 ){
			squareCode = '';
			squareCode += '<div ';
			squareCode += 'class="widget square square-off" ';
			squareCode += 'id="js-square-'+x+'-'+y+'"';
			/*
			squareCode += 'style="';
			squareCode += 'bottom: initial;';
			squareCode += 'right: initial;';
			squareCode += 'top: '+y*ySizePx+'px;';
			squareCode += 'left: '+x*xSizePx+'px;';
			squareCode += 'width: '+xSizePx+'px;';
			squareCode += 'height: '+ySizePx+'px;';
			squareCode += '"';
			*/
			squareCode += '>';
			squareCode += '</div>\n';
			htmlCode += squareCode;
		}
	}
	parent.innerHTML = htmlCode;
}

function resizeSquares( nCols, nRows, parent ){
	var xSizePx = parent.clientWidth / nCols;
	var ySizePx = parent.clientHeight / nRows;
	for( var x=0; x<nCols; x+=1 ){
		for( var y=0; y<nCols; y+=1 ){
			var id = 'js-square-'+x+'-'+y;
			var square = document.getElementById(id);
			square.style.top = y*ySizePx+'px';
			square.style.left = x*xSizePx+'px';
			square.style.width = xSizePx+'px';
			square.style.height = ySizePx+'px';
		}
	}
}

function getSquare(x,y){
	return document.getElementById( 'js-square-'+x+'-'+y );
}

function turnSquareOn( square ){
	square.className = square.className.replace( /square-off/, 'square-on' );
}

function turnSquareOff( square ){
	square.className = square.className.replace( /square-on/, 'square-off' );
}
