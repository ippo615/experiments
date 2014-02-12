var clockQuestion = (function(){
    // draws the face of the clock without the hands
	// need to add parameter for passing in a canvas 2d context
	// perhaps color as well
	function drawClockFace(x,y,r,options){
		var ctx = ('clockContext' in options)?options.clockContext:null;
        var clockFaceColor = ('clockFaceColor' in options)?options.clockFaceColor:'white';
        var clockOutlineColor = ('clockOutlineColor' in options)?options.clockOutlineColor:'#0000AA';
        var clockHourTickColor = ('clockHourTickColor' in options)?options.clockHourTickColor:'black';
        var clockMinuteTickColor = ('clockMinuteTickColor' in options)?options.clockMinuteTickColor:'black';
		ctx.save();
			ctx.clearRect(x-r,y-r,r+r,r+r);
			ctx.translate(x,y);
			ctx.scale(r,r);
			ctx.fillStyle = clockFaceColor;
			ctx.lineCap = "round";
			//note the sizes can be though of as %'s
			//ex 0.1 == 10% so for r=150px -> 15px
			//according to mozilla it is better to use ints
			//so i should change this
			ctx.beginPath();
				ctx.lineWidth = 0.1;
				ctx.strokeStyle = clockOutlineColor;
				ctx.arc(0,0,1,0,Math.PI*2,true);	
                ctx.fill();
			ctx.stroke();
		
			//draw hour ticks
			ctx.strokeStyle = clockHourTickColor;
			ctx.lineWidth = 0.05;
			ctx.save();	
			for (var i=0;i<12;i++){
				ctx.beginPath();
				ctx.rotate(Math.PI/6);
				ctx.moveTo(0.85,0);
				ctx.lineTo(0.75,0);
				ctx.stroke();
			}
			ctx.restore();
		
			//draw minute ticks
			ctx.strokeStyle = clockMinuteTickColor;
			ctx.lineWidth = 0.025;
			ctx.save();	
			for (var i=0;i<60;i++){
				ctx.beginPath();
				ctx.rotate(Math.PI/30);
				ctx.moveTo(0.85,0);
				ctx.lineTo(0.80,0);
				ctx.stroke();
			}
			ctx.restore();
		ctx.restore();
	}
	// draw the hour and minutes hands for a particular time
	function drawClockHands(h,m,x,y,r,options){
		var ctx = ('clockContext' in options)?options.clockContext:null;
        var clockHourHandColor = ('clockHourHandColor' in options)?options.clockHourHandColor:'black';
        var clockMinuteHandColor = ('clockMinuteHandColor' in options)?options.clockMinuteHandColor:'black';
		ctx.save();
			ctx.translate(x,y);
			ctx.scale(r,r);
			ctx.strokeStyle = clockHourHandColor;
			ctx.lineCap = "round";
			//draw hour
			ctx.save();
				ctx.lineWidth = 0.07;
				ctx.beginPath();
				ctx.rotate(-Math.PI/2+h*Math.PI/6);
				ctx.moveTo(0.00,0);
				ctx.lineTo(0.50,0);
				ctx.stroke();
			ctx.restore();
			//draw minutes
            ctx.strokeStyle = clockMinuteHandColor;
			ctx.save();
				ctx.lineWidth = 0.07;
				ctx.beginPath();
				ctx.rotate(-Math.PI/2+m*Math.PI/30);
				ctx.moveTo(0.00,0);
				ctx.lineTo(0.65,0);
				ctx.stroke();
			ctx.restore();
		ctx.restore();
	}
	//draw the face and hands in one call
	function drawTime(x,y,r,h,m,options){
		drawClockFace(x,y,r,options);
		drawClockHands(h,m,x,y,r,options);
	}
    function drawTimeIndex(options){
    	var index = ('timeIndex' in options)?options.timeIndex:(Math.random()*12*60);
        var isContinuous = ('clockIsContinuous' in options)?options.clockIsContinuous:true;
		var quiz = ('quiz' in options)?options.quiz:{globalScale:1.0};
		var scale = quiz.globalScale;
        var hour = (index / 60);
        if( ! isContinuous ){
        	hour = Math.floor(hour);
        }
        var minute = index % 60;
		//console.info(hour+':'+minute);
        drawTime( 120*scale, 120*scale, 100*scale, hour, minute, options );
    }
	/*
    drawTimeIndex({
    	timeIndex: 1400,
    	clockContext: document.getElementById('generic-canvas').getContext('2d'),
        clockMinuteHandColor: '#00EEAA',
        clockMinuteTickColor: '#00EEAA',
        clockHourHandColor: '#FFF',
        clockHourTickColor: '#FFF',
        clockFaceColor: 'black',
        clockOutlineColor: '#AAA'
    });
	*/

	var animateTimeTransition = (function () {
		var timeStart = [];
		var timeEnd = [];
		var startTime = 0;
		var duration = 0;
		var onDoneAction = null;
		var animationOptions = {};
		var requestAnimFrame = window.requestAnimationFrame ||
		    window.webkitRequestAnimationFrame ||
		    window.mozRequestAnimationFrame ||
		    window.oRequestAnimationFrame ||
		    window.msRequestAnimationFrame ||
		        function ( /* function */ callback /*, DOMElement element */ ) {
		            window.setTimeout(function () {
		                callback();
		            }, 16);
		    };

		var runAmin = function (timeStamp) {
		    //timeStamp = timeStamp || (new Date()).getTime();
		    timeStamp = (new Date()).getTime();
		    var dt = timeStamp - startTime;
		    var percent = 0.5 - (Math.cos(dt / duration * (Math.PI)) / 2);

		    if (dt < duration) {
				animationOptions.timeIndex = timeStart + (timeEnd - timeStart)*percent;
		        drawTimeIndex(animationOptions);
		        requestAnimFrame(runAmin);
		    } else {
				animationOptions.timeIndex = timeEnd;
		        drawTimeIndex(animationOptions);
		        if (onDoneAction) {
		            onDoneAction();
		        }
		    }
		};

		return function (start, end, ms, options, onDone) {
		    requestAnimFrame(runAmin);
			var prop;
			animationOptions = {};
			for( prop in options ){
				animationOptions[prop] = options[prop];
			}
		    timeStart = start;
		    timeEnd = end;
		    duration = ms;
		    startTime = (new Date()).getTime();
		    onDoneAction = onDone;
		};
	})();

	var time = 0;
	function animateToNewTime(newTime,ms,options,onDone){
		animateTimeTransition(time,newTime,ms,options,onDone);
		time = newTime;
	};
	var savedOptions = {};
	function redraw(){
		savedOptions.timeIndex = time;
		drawTimeIndex(savedOptions);
	}

	function newRandomTime(){
		var nt = Math.random()*12*60;
		animateToNewTime(nt,4000,{
		      clockIsContinuous: true,
		      //clockContext: document.getElementById('generic-canvas').getContext('2d'),
		      clockMinuteHandColor: '#00EEAA',
		      clockMinuteTickColor: '#00EEAA',
		      clockHourHandColor: '#FFF',
		      clockHourTickColor: '#FFF',
		      clockFaceColor: 'black',
		      clockOutlineColor: '#AAA'
		  },newRandomTime);
		time = nt;
	}

	function formatTime(time){
		var hour = Math.floor(time / 60);
		var minute = Math.round(time%60);
		if( hour === 0 ){ hour = '12'; }
		if( minute < 10 ){ minute = '0'+minute; }
		return hour+':'+minute;
	}
	function clockQuestion(quiz,options){
		options.clockContext = quiz.genericCanvas.getContext('2d');
		options.quiz = quiz;

		savedOptions = {};
		var opt;
		for( opt in options ){ savedOptions[opt] = options[opt]; }

		var minAnswerDeviation = parseFloat( ('minAnswerDeviation' in options) ? options.minAnswerDeviation : '0.01');
		var maxAnswerDeviation = parseFloat( ('maxAnswerDeviation' in options) ? options.maxAnswerDeviation : '0.10');
		var answerDeviationRange = (maxAnswerDeviation - minAnswerDeviation)
		var newTime = Math.round(Math.random()*12*60);
		var answers = [
		    formatTime(newTime),
		    formatTime(newTime * (1.0+minAnswerDeviation+Math.random()*answerDeviationRange)),
		    formatTime(newTime * (1.0-minAnswerDeviation-Math.random()*answerDeviationRange)),
		    formatTime(newTime * Math.random())
		];
		var answer = formatTime(newTime);
		answers = shuffle(answers);
		quiz.onResize = redraw;
		quiz.choiceSet(1,answers[0], answer===answers[0]);
		quiz.choiceSet(2,answers[1], answer===answers[1]);
		quiz.choiceSet(3,answers[2], answer===answers[2]);
		quiz.choiceSet(4,answers[3], answer===answers[3]);
		quiz.questionNumbers( '','' );
		quiz.questionPrompt( 'Time?' );

		animateToNewTime(newTime,5000,options,quiz.doNothing);
	}

	return clockQuestion;
})();
