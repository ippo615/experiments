
var height = new Parameter({
	name: 'height',
	default: 0,
	description: 'The height of the shirt'
});
var width = new Parameter({
	name: 'width',
	default: 0,
	description: 'The width of the shirt'
});

document.body.appendChild( width.uiMakeDomNode() );
document.body.appendChild( height.uiMakeDomNode() );
