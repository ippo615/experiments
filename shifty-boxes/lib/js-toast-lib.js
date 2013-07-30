function Toast(title,message,cssClass,duration){
	var primary = document.createElement('div');
	primary.className = "primary";
	primary.appendChild(document.createTextNode(title));
	var secondary = document.createElement('div');
	secondary.className = "secondary";
	secondary.appendChild(document.createTextNode(message));
	var box = document.createElement('div');
	box.className = "toast initial-toast";
	box.appendChild(primary);
	box.appendChild(secondary);
	var container = document.getElementById('toast-container');
	var top = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
	container.style.top = top+'px';
	
	// Insert this node 'at the top'
	// IE requires a valid node or null
	var before = container.childNodes[0];
	if( container.childNodes.length < 1 ){ before = null; }
	container.insertBefore(box,before);

	// Trick the browser into animating
	setTimeout(function(){
		box.className = "toast "+cssClass;
	},0);
	setTimeout(function(){
		box.style.opacity = 0;
		setTimeout(function(){
			document.getElementById('toast-container').removeChild(box);
			box = null;
		},400);
	},duration);
}