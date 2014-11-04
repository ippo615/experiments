
app = (function(app){

	app.dispatcher = new Dispatcher();

	function clear_input_text(){
		document.getElementById('in-text-cmd').value='';
	}
	function auto_complete_text(){
		var text = document.getElementById('in-text-cmd').value;
		var matches = app.dispatcher.find_matches(text);
		document.getElementById('in-text-cmd').value = matches[0].text;
	}

	function update_hints(){
		var text = document.getElementById('in-text-cmd').value;
		var matches = app.dispatcher.find_matches(text);
		var html = '';
		for( var i=0,l=matches.length; i<l; i+=1 ){
			html += matches[i].toHtml()+'<br/>';
		}
		document.getElementById('out-hint').innerHTML = html;
	}

	function try_to_run(){
		var text = document.getElementById('in-text-cmd').value;
		var result = app.dispatcher.exec(text);
		document.getElementById('out-hint').innerHTML = result;
	}

	function quick_run(){
		var text = document.getElementById('in-text-cmd').value;
		var matches = app.dispatcher.find_matches_without_args(text);
		if( matches.length === 1 ){
			var result = matches[0].exec( text );
			document.getElementById('out-hint').innerHTML = result;
			return true;
		}
		return false;
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
		if( quick_run() ){
			clear_input_text();
		}else{
			update_hints();
		}
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

	app.inits.push( function(){
		document.getElementById('in-text-cmd-hint').innerHTML = app.dispatcher.toHtml();
		document.getElementById('in-text-cmd').addEventListener('keyup',onKeyUp,false);
		document.getElementById('in-text-cmd').addEventListener('keydown',onKeyDown,false);
	});

	return app;
	
})(app);
