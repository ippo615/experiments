var Widget = (function(){

	function Widget(parent,node,x1,y1,x2,y2,textScale,ondraw){
		// DOM info (pixel/physical data)
		this.node = node;
		this.node.className += ' js-widget';
		this.wpx = 0;
		this.hpx = 0;

		// Heirarchy data
		this.parent = null;
		if( parent !== null ){
			parent.addChild( this );
		}
		this.children = [];

		// Theorectical size data
		this.textScale = textScale || 0.2;
		this.x1 = (x1<x2)?x1:x2;
		this.x2 = (x1<x2)?x2:x1;
		this.y1 = (y1<y2)?y1:y2;
		this.y2 = (y1<y2)?y2:y1;
		this.textScale = textScale;
		this.w = this.x2 - this.x1;
		this.h = this.y2 - this.y1;

		this.ondraw = null;
		if( ondraw ){
			this.ondraw = ondraw;
		}
		//console.info( this );
	}

	Widget.prototype.addChild = function(child){
		this.children.push( child );
		child.parent = this;
	};

	Widget.prototype.redraw = function(w,h){
		if( this.parent !== null ){
			var w = this.parent.wpx;
			var h = this.parent.hpx;
		}

		this.wpx = this.w * w;
		this.hpx = this.h * h;
		this.node.style.width = this.wpx + 'px';
		this.node.style.height = this.hpx + 'px';
		this.node.style.left = this.x1 * w + 'px';
		this.node.style.top = this.y1 * h + 'px';
		if( this.wpx < this.hpx ){
			this.node.style.fontSize = this.textScale*this.wpx+'px';
			this.node.style.lineHeight = this.textScale*this.wpx+'px';
		}else{
			this.node.style.fontSize = this.textScale*this.hpx+'px';
			this.node.style.lineHeight = this.textScale*this.hpx+'px';
		}

		// Call it's redraw method
		if( this.ondraw !== null ){
			this.ondraw( this );
		}

		for( var i=0, l=this.children.length; i<l; i+=1 ){
			this.children[i].redraw();
		}
	};

	Widget.buildTree = function(root){
		var rootWidget = new Widget( null, root, 0, 0, 1, 1, 0.2 );
		Widget.buildTreeRecursive( rootWidget, root.children );
		return rootWidget;
	};

	Widget.buildTreeRecursive = function( rootWidget, domChildren ){

		for( var i=0,l=domChildren.length; i<l; i+=1 ){
			var child = domChildren[i];
			var isWidget = false;

			// Get the ondraw event function
			var ondraw = null;
			var ondrawText = child.getAttribute( 'data-widget-ondraw' );
			if( ondrawText !== null ){
				try{
					eval('var ondraw = '+ondrawText);
					isWidget = true;
				}catch(e){
					ondraw = null;
				}
			}

			// Get the corner locations (default is 100%)
			var x1 = 0;
			var x2 = 1;
			var y1 = 0;
			var y2 = 1;
			var cornerString = child.getAttribute( 'data-widget-corners' );
			if( cornerString !== null ){
				isWidget = true;
				var corners = cornerString.split(/[ ,]+/);
				x1 = parseInt(corners[0])*0.01;
				y1 = parseInt(corners[1])*0.01;
				x2 = parseInt(corners[2])*0.01;
				y2 = parseInt(corners[3])*0.01;
			}

			// Get the font scaling factor
			var textScale = 0.2;
			var textScaleString = child.getAttribute( 'data-widget-text-scale' );
			if( textScaleString !== null ){
				isWidget = true;
				textScale = parseFloat( textScaleString );
			}

			if( isWidget ){
				var widget = new Widget(
					rootWidget,
					child,
					x1,
					y1,
					x2,
					y2,
					textScale,
					ondraw
				);
				if( child.children.length !== 0 ){
					Widget.buildTreeRecursive( widget, child.children );
				}
			}
		}
		return rootWidget;
	};

	return Widget;
})();

if( window.document ){
	var customCss = '';
	customCss += '.js-widget {';
	customCss += '	position: absolute;';
	customCss += '	overflow: hide;';
	customCss += '}';
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = customCss;
	document.getElementsByTagName('head')[0].appendChild(style);
}
