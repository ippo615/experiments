var dispatcher = new Dispatcher();
dispatcher.push( new Trigger({
	text: 'vh',
	args: [],
	action: function(){return 'vh';}
}) ).push( new Trigger({
	text: 'view top',
	description: 'looks down (from the top of the printer)',
	args: [],
	action: function(){return 'viewing top';}
}) ).push( new Trigger({
	text: 'vt',
	description: 'looks down (from the top of the printer)',
	args: [],
	action: function(){return 'viewing top';}
}) ).push( new Trigger({
	text: 'view left',
	args: [],
	action: function(){return 'viewing left';}
}) ).push( new Trigger({
	text: 'vl',
	args: [],
	action: function(){return 'viewing left';}
}) ).push( new Trigger({
	text: 'move all',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
}) ).push( new Trigger({
	text: 'move by',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
}) ).push( new Trigger({
	text: 'move to',
	args: ['x','y','z'],
	action: function(x,y,z){return x+y+z;}
}) ).push( new Trigger({
	text: 'move x',
	args: ['x'],
	action: function(x){return x;}
}) ).push( new Trigger({
	text: 'move y',
	args: ['y'],
	action: function(y){return y;}
}) ).push( new Trigger({
	text: 'move z',
	args: ['z'],
	action: function(z){return z;}
}) ).push( new Trigger({
	text: 'add',
	args: ['x','y'],
	action: function(x,y){return parseFloat(x)+parseFloat(y);}
}) ).push( new Trigger({
	text: 'sub',
	args: ['x','y'],
	action: function(x,y){return parseFloat(x)-parseFloat(y);}
}) ).push( new Trigger({
	text: 'mul',
	args: ['x','y'],
	action: function(x,y){return parseFloat(x)*parseFloat(y);}
}) ).push( new Trigger({
	text: 'div',
	args: ['x','y'],
	action: function(x,y){return parseFloat(x)/parseFloat(y);}
}) );

function clear_input_text(){
	document.getElementById('in-text-cmd').value='';
}
function auto_complete_text(){
	var text = document.getElementById('in-text-cmd').value;
	var matches = dispatcher.find_matches(text);
	document.getElementById('in-text-cmd').value = matches[0].text;
}

function update_hints(){
	var text = document.getElementById('in-text-cmd').value;
	var matches = dispatcher.find_matches(text);
	var html = '';
	for( var i=0,l=matches.length; i<l; i+=1 ){
		html += matches[i].toHtml()+'<br/>';
	}
	document.getElementById('out-hint').innerHTML = html;
}

function try_to_run(){
	var text = document.getElementById('in-text-cmd').value;
	var result = dispatcher.exec(text);
	document.getElementById('out-hint').innerHTML = result;
}

function onKeyUp( event ){
	switch( event.keyCode ){
		case 13: // enter
		//case 32: // space
			try {
				try_to_run();
			}catch(e){}
			return;
	}
	update_hints();
}
function onKeyDown( event ){
	switch( event.keyCode ){
		// esc
		case 27:
			clear_input_text();
			update_hints();
			return;

		// tab
		case 9:
			auto_complete_text();
			event.preventDefault();
			event.stopPropagation();
			return false;
	}
}

document.getElementById('in-text-cmd-hint').innerHTML = dispatcher.toHtml();
document.getElementById('in-text-cmd').addEventListener('keyup',onKeyUp,false);
document.getElementById('in-text-cmd').addEventListener('keydown',onKeyDown,false);
