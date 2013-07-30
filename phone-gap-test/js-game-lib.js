//////////1234567890//////////1234567890//////////1234567890//////////1234567890
var GAME = function($game){
	if( ! $game  ){ $game = {} ;}
	/// ------------------------------------------ [ Utility Functions ] --
	var requestAnimFrame = (function(){
	/// Compatibility for animation frame on older browsers
		return window.requestAnimationFrame    || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	/// ------------------------------------------- [ Game Update Loop ] --
	$game.frameLastTime = 0;
	$game.frameThisTime = 0;
	$game.frameMaxDt = 0.5;
	$game.frameTotalTime = 0;
	// Constant update rate
	$game.isUpdateRateConst = 1;
	$game.frameConstUpdateDt = 0.02;
	$game.frameTimeOfLastUpdate = 0;
	$game.frameTimeSinceLastUpdate = 0;
	// Constant draw rate
	$game.isDrawRateConst = 1;
	$game.frameConstDrawDt = 0.04;
	$game.frameTimeOfLastDraw = 0;
	$game.frameTimeSinceLastDraw = 0;

	$game.updateFunctions = [];
	$game.drawFunctions = [];
	$game.onUpdate = function($game,dt){};
	$game.onDraw = function($game,dt){};

	$game.pushUpdateFunction = function(onUpdate){
	/// Pushes the update function onto the stack and uses it 
	/// as the current update function.
		$game.updateFunctions.push(onUpdate);
		$game.onUpdate = onUpdate;
	};
	$game.popUpdateFunction = function(onUpdate){
	/// Pops the last update function from the stack. Uses the
	/// previous update function as the current one.
		if( $game.updateFunctions.length > 0 ){
			$game.onUpdate = $game.updateFunctions.pop();
		}
	};
	$game.setUpdateFunction = function(onUpdate){
	/// Sets the game's update function. The update function should be of
	/// the form: function gameUpdate($game,dt). $game is the handle to the
	/// game module. dt is the amount of seconds that have passed between
	/// the last update call.
		$game.onUpdate = onUpdate;
	};

	$game.pushDrawFunction = function(onDraw){
	/// Pushes the draw function onto the stack and uses it 
	/// as the current draw function.
		$game.drawFunctions.push(onDraw);
		$game.onDraw = onDraw;
	};
	$game.popDrawFunction = function(onDraw){
	/// Pops the last draw function from the stack. Uses the
	/// previous draw function as the current one.
		if( $game.drawFunctions.length > 0 ){
			$game.onDraw = $game.drawFunctions.pop();
		}
	};
	$game.setDrawFunction = function(onDraw){
		$game.onDraw = onDraw;
	};
	
	$game.limitUpdatesPerSecond = function(updatesPerSec){
	/// Forces the game to be updated 'updatesPerSec' times per second. It 
	/// also gives you a constant time step (dt) between frames.
		$game.isUpdateRateConst = 1;
		$game.frameConstUpdateDt = 1/updatesPerSec;
	};
	$game.limitDrawsPerSecond= function(drawsPerSec){
	/// Forces the game to be redrawn 'drawsPerSec' times per second. It 
	/// also gives you a constant time step (dt) between drawing frames.
		$game.isDrawRateConst = 1;
		$game.frameConstDrawDt = 1/drawsPerSec;
	};
	$game.unlimitUpdates = function(){
	/// Lets the game update as many times as the engine will allow.
	/// You will get variable time steps (dt) between updates.
		$game.isUpdateRateConst = 0;
	};
	$game.unlimitDraws = function(){
	/// Lets the game redraw as many times as the engine will allow.
	/// You will get variable time steps (dt) between redraws.
		$game.isDrawRateConst =0;
	};

	$game.update = function(){
	/// The game's main update loop:

		// Compute the difference in time between this frame and the last.
		$game.frameLastTime = $game.frameThisTime;
		$game.frameThisTime = (new Date()).getTime();

		// The times are in milliseconds: we *0.001 to convert to seconds.
		var nIterations,
		    dt = ($game.frameThisTime - $game.frameLastTime)*0.001;

		// Limit the timestep 
		if(dt > $game.frameMaxDt){ dt = $game.frameMaxDt; }
		$game.frameTotalTime += dt;

		// If we're throttling the update rate
		if( $game.isUpdateRateConst ){
			$game.frameTimeSinceLastUpdate = $game.frameTotalTime - $game.frameTimeOfLastUpdate;
			nIterations = Math.floor( $game.frameTimeSinceLastUpdate / $game.frameConstUpdateDt );
			if( nIterations > 0 ){
				$game.frameTimeOfLastUpdate += $game.frameConstUpdateDt*nIterations;
				while( nIterations-- ){
					$game.onUpdate($game,$game.frameConstUpdateDt);
				}
			}
		}else{
			$game.onUpdate($game,dt);
		}

		// If we're throttling the drawing rate
		if( $game.isDrawRateConst ){
			$game.frameTimeSinceLastDraw = $game.frameTotalTime - $game.frameTimeOfLastDraw;
			nIterations = Math.floor( $game.frameTimeSinceLastDraw / $game.frameConstDrawDt );
			if( nIterations > 0 ){
				$game.frameTimeOfLastDraw += $game.frameConstDrawDt*nIterations;
				$game.onDraw($game,$game.frameConstDrawDt*nIterations);
			}
		}else{
			$game.onDraw($game,dt);
		}

		// setup another update
		requestAnimFrame($game.update);
	};

	$game.start = function(){
		$game.frameLastTime = (new Date()).getTime();
		$game.frameThisTime = $game.frameLastTime;

		requestAnimFrame($game.update);
	};

	return $game;
};