var INPUT = function($input){
	if( ! $input  ){ $input = {} ;}
	var registerEvent = function(domObj,eventId,func){
	/// Attaches func as a lister on event eventId on node domObj. Returns
	/// this.
		// if we have the w3 model
		if(domObj.addEventListener){
			// add the event, use bubbling not capture
			domObj.addEventListener(eventId,func,false);
		}else if(domObj.attachEvent){
			// do it the IE way
			domObj.attachEvent('on'+eventId,func);
		}
		// prevent memory leaks
		domObj = null;
		return this;
	};

	var unregisterEvent = function(domObj,eventId,func){
	/// Removes func as a lister on event eventId on node domObj. Returns
	/// this.
		// if we have the w3 model
		if(domObj.removeEventListener){
			// add the event, use bubbling not capture
			domObj.removeEventListener(eventId,func,false);
		}else if(domObj.detachEvent){
			// do it the IE way
			domObj.dettachEvent('on'+eventId,func);
		}
		// prevent memory leaks
		domObj = null;
		return this;
	};

	var getPointerPositionsInTarget = function(e){
	/// Returns an array of {x: y:} objects that represent the x,y
	/// coordinates of the pointers relative to the top, left corner of the
	/// target object.
	/// Example:
	/// domNode.onclick = function(e){
	///   var positions = GetPointerPositionsInTarget(e);
	///   // Code that works with positions..
	/// }

		// Note that the target is the 'node on which the event occured'
		// not the 'node on which the event is registered'. For example:
		// <div id='parent'><div id='child'>BLAH</div></div>
		// If you regesiter the event on parent than target could be either
		// parent or child.
		var target, // dom node on which the event occured
		    locations = [], // array of x,y pairs (finger locations)
		    nLocations = 0, // number of locations
		    nTouches, // number of touches to look through
		    mx = 0, // mouse position
		    my = 0,
		    baseX = 0, // Base object's position
		    baseY = 0,
		    baseObj,
		    i, iLocation, iTouch; // temp for iterating

		//get the event
		if(!e){ e = window.event; }
		// if we're given a target element, use it (W3C)
		if(e.target){ target = e.target; }else
		//otherwise try scrElement (IE)
		if(e.srcElement){ target = e.srcElement; }
		//we need an array of x,y pairs
		//if this is a touch event
		if(e.type === "touchstart"
		|| e.type === "touchmove"
		|| e.type === "touchend"){
			nTouches = e.touches.length;
			for(i=0; i<nTouches; i+= 1){
				iTouch = e.touches[i];
				locations[nLocations] = { x: iTouch.pageX, y: iTouch.pageY };
				nLocations += 1;
			}
			//could also use: (i haven't noticed a difference)
			//t = event.changedTouches[0];
			//get the mouse coordinates on the page
		}else{	
			//if we're actually given the page coordinates
			if(e.pageX || e.pageY){
				//use the page coordinates as the mouse coordinates
				mx = e.pageX;
				my = e.pageY;
			}else if(e.clientX || e.clientY){
				//compute the page corrdinates
				mx = e.clientX + document.body.scrollLeft +
					document.documentElement.scrollLeft;
				my = e.clientY + document.body.scrollTop  +
					document.documentElement.scrollTop;
			}
			locations[nLocations] = { x: mx, y: my };
			nLocations += 1;
		}
		//find the location of the base object
		baseObj = target;
		//as long as we haven't added all of the parents' offsets
		while(baseObj.offsetParent !== null){
			//add it's offset
			baseX += parseInt(baseObj.offsetLeft,10);
			baseY += parseInt(baseObj.offsetTop,10);
			//get the next parent
			baseObj = baseObj.offsetParent;
		}
		//the mouse position within the target object is:
		for(i=0; i<nLocations; i+=1){
			iLocation = locations[i];
			locations[i].x = iLocation.x - baseX;
			locations[i].y = iLocation.y - baseY;
		}
		return locations;
	};

	var getPointerPositionsRelativeTo = function(e,target){
	/// Returns an array of {x: y:} objects that represent the x,y
	/// coordinates of the pointers relative to the top, left corner of the
	/// target object.
	/// Example:
	/// domNode.onclick = function(e){
	///   var positions = GetPointerPositionsInTarget(e);
	///   // Code that works with positions..
	/// }

		// Note that the target is the 'node on which the event occured'
		// not the 'node on which the event is registered'. For example:
		// <div id='parent'><div id='child'>BLAH</div></div>
		// If you regesiter the event on parent than target could be either
		// parent or child.
		var locations = [], // array of x,y pairs (finger locations)
		    nLocations = 0, // number of locations
		    nTouches, // number of touches to look through
		    mx = 0, // mouse position
		    my = 0,
		    baseX = 0, // Base object's position
		    baseY = 0,
		    baseObj,
		    i, iLocation, iTouch; // temp for iterating

		//get the event
		if(!e){ e = window.event; }
		//we need an array of x,y pairs
		//if this is a touch event
		if(e.type === "touchstart"
		|| e.type === "touchmove"
		|| e.type === "touchend"){
			nTouches = e.touches.length;
			for(i=0; i<nTouches; i+= 1){
				iTouch = e.touches[i];
				locations[nLocations] = { x: iTouch.pageX, y: iTouch.pageY };
				nLocations += 1;
			}
			//could also use: (i haven't noticed a difference)
			//t = event.changedTouches[0];
			//get the mouse coordinates on the page
		}else{	
			//if we're actually given the page coordinates
			if(e.pageX || e.pageY){
				//use the page coordinates as the mouse coordinates
				mx = e.pageX;
				my = e.pageY;
			}else if(e.clientX || e.clientY){
				//compute the page corrdinates
				mx = e.clientX + document.body.scrollLeft +
					document.documentElement.scrollLeft;
				my = e.clientY + document.body.scrollTop  +
					document.documentElement.scrollTop;
			}
			locations[nLocations] = { x: mx, y: my };
			nLocations += 1;
		}
		//find the location of the base object
		baseObj = target;
		//as long as we haven't added all of the parents' offsets
		while(baseObj.offsetParent !== null){
			//add it's offset
			baseX += parseInt(baseObj.offsetLeft,10);
			baseY += parseInt(baseObj.offsetTop,10);
			//get the next parent
			baseObj = baseObj.offsetParent;
		}
		//the mouse position within the target object is:
		for(i=0; i<nLocations; i+=1){
			iLocation = locations[i];
			locations[i].x = iLocation.x - baseX;
			locations[i].y = iLocation.y - baseY;
		}
		return locations;
	};

	$input.domNode = null;
	
	$input.ui = {};
	$input.ui.pointerLocations = [{x:0,y:0}];
	$input.ui.pointerStartLocations = [{x:0,y:0}];
	$input.ui.isPointerActive = 0;
	$input.ui.isKeyboardActive = 0;
	$input.ui.isKeyLeftHeld = 0;
	$input.ui.isKeyRightHeld = 0;
	$input.ui.isKeyUpHeld = 0;
	$input.ui.isKeyDownHeld = 0;
	$input.ui.isPointerStartLatched = 0;
	$input.ui.isPointerEndLatched = 0;
	var handlePointerStart = function(e){
		//$input.ui.pointerStartLocations = getPointerPositionsInTarget(e);
		$input.ui.pointerStartLocations = getPointerPositionsRelativeTo(e,$input.domNode);
		$input.ui.pointerLocations = $input.ui.pointerStartLocations;
		$input.ui.isPointerActive = 1;
		$input.ui.isPointerStartLatched = 1;
		e.preventDefault();
		return false;
	};
	var handlePointerMove = function(e){
		//$input.ui.pointerLocations = getPointerPositionsInTarget(e);
		$input.ui.pointerLocations = getPointerPositionsRelativeTo(e,$input.domNode);
		$input.ui.isPointerActive = 1;
		e.preventDefault();
		return false;
	};
	var handlePointerEnd = function(e){
		//$input.ui.pointerLocations = getPointerPositionsInTarget(e);
		$input.ui.pointerLocations = getPointerPositionsRelativeTo(e,$input.domNode);
		$input.ui.isPointerActive = 0;
		$input.ui.isPointerEndLatched = 1;
		e.preventDefault();
		return false;
	};
	var handleKeyboard = function(e){
		// Some browser's don't pass the event, get it from the window obj
		e = e || window.event;
		var keyCode = e.keyCode;
		// I have other useful keycodes here:
		// /home/andrew/DATA/Programming/LostWeb/Rebuild/GameAPI/Joystick/2009_03_19
		// and http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
		// arrow keys || vim keys || wasd || numpad || wii || safari
		if( keyCode === 37
		||  keyCode === 72 
		||  keyCode === 65
		||  keyCode === 100
		||  keyCode === 175
		||  keyCode === 63234 ){
			// set the value to 1 on the keydown event
			// set the value to 0 on any other (ie keyup, keypress) event
			$input.ui.isKeyLeftHeld = (e.type === 'keydown');
		}else
		if( keyCode === 38
		||  keyCode === 74
		||  keyCode === 87 
		||  keyCode === 104
		||  keyCode === 177
		||  keyCode === 63232 ){
			$input.ui.isKeyUpHeld = (e.type === 'keydown');
		}else
		if( keyCode === 39
		||  keyCode === 76
		||  keyCode === 68 
		||  keyCode === 102
		||  keyCode === 176
		||  keyCode === 63235 ){
			$input.ui.isKeyRightHeld = (e.type === 'keydown');
		}else
		if( keyCode === 40
		||  keyCode === 75
		||  keyCode === 83 
		||  keyCode === 98
		||  keyCode === 178
		||  keyCode === 63233 ){
			$input.ui.isKeyDownHeld = (e.type === 'keydown');
		}
		$input.ui.isPointerActive = 0;
		$input.ui.isKeyboardActive = 1;
		e.preventDefault();
		return false;
	};

	$input.ui.viewSizeX = 0;
	$input.ui.viewSizeY = 0;
	$input.setupOnNode = function(domNode){
		$input.domNode = domNode;
		$input.updateViewSize();

		$input.emulatedPointer.xMax = parseInt(domNode.offsetWidth,10);
		$input.emulatedPointer.yMax = parseInt(domNode.offsetHeight,10);
		$input.enablePointerEmulation();

		registerEvent($input.domNode,'mousedown',handlePointerStart);
		registerEvent($input.domNode,'touchstart',handlePointerStart);
		registerEvent($input.domNode,'mousemove',handlePointerMove);
		registerEvent($input.domNode,'touchmove',handlePointerMove);
		registerEvent($input.domNode,'mouseend',handlePointerEnd);
		registerEvent($input.domNode,'touchend',handlePointerEnd);
	
		// Add a tab index attribute and focus the element otherwise
		// it may not recieve certain keyboard events.
		$input.domNode.setAttribute('tabindex','-1');
		$input.domNode.focus();
		registerEvent($input.domNode,'keyup',handleKeyboard);
		registerEvent($input.domNode,'keydown',handleKeyboard);

	};

	var stayWithin = function(min,value,max){
		if( value < min ){ return min; }
		if( value > max ){ return max; }
		return value;
	};
	var moveToZero = function(value,speed){
		if( value > 0 ){
			if( value - speed < 0 ){
				return 0;
			}else{
				return value - speed;
			}
		}
		if( value < 0 ){
			if( value + speed > 0 ){
				return 0;
			}else{
				return value + speed;
			}
		}
		return 0;
	};

	var updateEmulatedPointer = function(){

		var nowTime = (new Date()).getTime();
		var dt = (nowTime - $input.emulatedPointer.lastTime)/1000;
		$input.emulatedPointer.lastTime = nowTime;

		// Update x speed and position
		var xDir = $input.ui.isKeyRightHeld - $input.ui.isKeyLeftHeld;
		var dx = xDir * $input.emulatedPointer.xSpeed * dt;
		var xMin = $input.emulatedPointer.xMin;
		var xMax = $input.emulatedPointer.xMax;
		var x = $input.emulatedPointer.x;
		$input.emulatedPointer.x = stayWithin(xMin,x+dx,xMax);

		// Update y speed and position
		var yDir = $input.ui.isKeyDownHeld - $input.ui.isKeyUpHeld;
		var dy = yDir * $input.emulatedPointer.ySpeed * dt;
		var yMin = $input.emulatedPointer.yMin;
		var yMax = $input.emulatedPointer.yMax;
		var y = $input.emulatedPointer.y;
		$input.emulatedPointer.y = stayWithin(yMin,y+dy,yMax);

		// Use the real pointer if possible 
		if( $input.ui.isPointerActive === 1 && $input.ui.pointerLocations[0] ){
			$input.emulatedPointer.x = $input.ui.pointerLocations[0].x;
			$input.emulatedPointer.y = $input.ui.pointerLocations[0].y;
			return;
		}

		$input.ui.pointerLocations =  [];
		$input.ui.pointerLocations.push(
			{ x: $input.emulatedPointer.x,
			  y: $input.emulatedPointer.y } );
	};

	$input.enablePointerEmulation = function(){

	};
	$input.setEmulatedPointerSpeed = function(xPixPerSec,yPixPerSec){
		$input.emulatedPointer.xSpeed = xPixPerSec;
		$input.emulatedPointer.ySpeed = yPixPerSec;
	};
	$input.setEmulatedPointerRangeX = function(xMin,xMax){
		$input.emulatedPointer.xMin = xMin;
		$input.emulatedPointer.xMax = xMax;
	};
	$input.setEmulatedPointerRangeY = function(yMin,yMax){
		$input.emulatedPointer.yMin = yMin;
		$input.emulatedPointer.yMax = yMax;
	};

	$input.ui.getPointerPercent = function(){
		updateEmulatedPointer();

	};
	$input.ui.getPointerX = function(){
		updateEmulatedPointer();
		return $input.emulatedPointer.x;
	};
	$input.ui.getPointerY = function(){
		updateEmulatedPointer();
		return $input.emulatedPointer.y;
	};

	$input.isPointerEmulatationEnabled = 1;
	$input.emulatedPointer = {};
	$input.emulatedPointer.xMin = 0;
	$input.emulatedPointer.yMin = 0;
	$input.emulatedPointer.xMax = 320;
	$input.emulatedPointer.yMax = 320;
	$input.emulatedPointer.lastTime = (new Date()).getTime();
	$input.emulatedPointer.x = 0;
	$input.emulatedPointer.y = 0;
	$input.emulatedPointer.xSpeed = 320;
	$input.emulatedPointer.ySpeed = 320;

	$input.updateViewSize = function(){
		$input.ui.viewSizeX = parseFloat($input.domNode.clientWidth);
		$input.ui.viewSizeY = parseFloat($input.domNode.clientHeight);
	};
	$input.getPointerPercent = function(){
		updateEmulatedPointer();
		return {
			x: 100 * $input.emulatedPointer.x / $input.ui.viewSizeX,
			y: 100 * $input.emulatedPointer.y / $input.ui.viewSizeY
		};
	};
	$input.resetLatches = function(){
		$input.ui.isPointerStartLatched = 0;
		$input.ui.isPointerEndLatched = 0;
	};

	return $input;

};

// Returns 0-100 based on where on the setup node the pointer is located
// 0,0 is left/top edge 100,100 is the right/bottom
//getPointerPercent(){

//}