var mathQuestions = (function(){

	function shuffle(things) {
		var nThings = things.length;
		var i, a, b, swap, l = Math.floor(nThings * 0.5);
		for (i = 0; i < l; i += 1) {
		    a = Math.floor(Math.random() * nThings);
		    b = Math.floor(Math.random() * nThings);
		    swap = things[a];
		    things[a] = things[b];
		    things[b] = swap;
		}
		return things;
	}

	function getOption(options, name, value) {
		if (options.hasOwnProperty(name)) {
		    return options[name];
		}
		return value;
	}

	var formatToInteger = function (x) {
    	return x.toFixed(0);
	};

	function additionQuestion(quiz,options) {
		var formatNumber = getOption(options,'formatNumber',formatToInteger);
		var opMin = parseInt(getOption(options,'additionMin','0'),10);
		var opMax = parseInt(getOption(options,'additionMax','9999'),10);
		var op1 = opMin + Math.random()*(opMax-opMin);
		var op2 = opMin + Math.random()*(opMax-opMin);
		var answer = parseFloat(formatNumber(op1))+parseFloat(formatNumber(op2));
		var answers = [
		    formatNumber(answer),
		    formatNumber(answer * 1.01+1),
		    formatNumber(answer * 0.99-1),
		    formatNumber(answer * Math.random())
		];
		answer = formatNumber(answer);
		answers = shuffle(answers);
		quiz.onResize = quiz.doNothing;
		quiz.choiceSet(1,answers[0], answer===answers[0]);
		quiz.choiceSet(2,answers[1], answer===answers[1]);
		quiz.choiceSet(3,answers[2], answer===answers[2]);
		quiz.choiceSet(4,answers[3], answer===answers[3]);
		quiz.questionNumbers( formatNumber(op1), '+'+formatNumber(op2) );
		quiz.questionPrompt( 'Sum?' );
	}

	function subtractionQuestion(quiz,options) {
		var formatNumber = getOption(options,'formatNumber',formatToInteger);
		var opMin = parseInt(getOption(options,'subtractionMin','0'),10);
		var opMax = parseInt(getOption(options,'subtractionMax','9999'),10);
		var op1 = opMin + Math.random()*(opMax-opMin);
		var op2 = opMin + Math.random()*(opMax-opMin);
		op1 = op1+op2;
		var answer = parseFloat(formatNumber(op1))-parseFloat(formatNumber(op2));
		var answers = [
		    formatNumber(answer),
		    formatNumber(answer * 1.01+1),
		    formatNumber(answer * 0.99-1),
		    formatNumber(answer * Math.random())
		];
		answer = formatNumber(answer);
		answers = shuffle(answers);
		quiz.onResize = quiz.doNothing;
		quiz.choiceSet(1,answers[0], answer===answers[0]);
		quiz.choiceSet(2,answers[1], answer===answers[1]);
		quiz.choiceSet(3,answers[2], answer===answers[2]);
		quiz.choiceSet(4,answers[3], answer===answers[3]);
		quiz.questionNumbers( formatNumber(op1), '-'+formatNumber(op2) );
		quiz.questionPrompt( 'Difference?' );
	}

	function multiplicationQuestion(quiz,options) {
		var formatNumber = getOption(options,'formatNumber',formatToInteger);
		var opMin = parseInt(getOption(options,'multiplicationMin','0'),10);
		var opMax = parseInt(getOption(options,'multiplicationMax','15'),10);
		var op1 = opMin + Math.random()*(opMax-opMin);
		var op2 = opMin + Math.random()*(opMax-opMin);
		var answer = parseFloat(formatNumber(op1))*parseFloat(formatNumber(op2));
		var answers = [
		    formatNumber(answer),
		    formatNumber(answer * 1.01+1),
		    formatNumber(answer * 0.99-1),
		    formatNumber(answer * Math.random())
		];
		answer = formatNumber(answer);
		answers = shuffle(answers);
		quiz.onResize = quiz.doNothing;
		quiz.choiceSet(1,answers[0], answer===answers[0]);
		quiz.choiceSet(2,answers[1], answer===answers[1]);
		quiz.choiceSet(3,answers[2], answer===answers[2]);
		quiz.choiceSet(4,answers[3], answer===answers[3]);
		quiz.questionNumbers( formatNumber(op1), '&times;'+formatNumber(op2) );
		quiz.questionPrompt( 'Product?' );
	}

	function divisionQuestion(quiz,options) {
		var formatNumber = getOption(options,'formatNumber',formatToInteger);
		var opMin = parseInt(getOption(options,'divisionMin','1'),10);
		var opMax = parseInt(getOption(options,'divisionMax','15'),10);
		var op1 = opMin + Math.random()*(opMax-opMin);
		var op2 = opMin + Math.random()*(opMax-opMin);
		var prod = parseFloat(formatNumber(op1))*parseFloat(formatNumber(op2));
		op1 = prod;
		var answer = parseFloat(formatNumber(op1))/parseFloat(formatNumber(op2));
		var answers = [
		    formatNumber(answer),
		    formatNumber(answer * 1.01+1),
		    formatNumber(answer * 0.99-1),
		    formatNumber(answer * Math.random())
		];
		answer = formatNumber(answer);
		answers = shuffle(answers);
		quiz.choiceSet(1,answers[0], answer===answers[0]);
		quiz.choiceSet(2,answers[1], answer===answers[1]);
		quiz.choiceSet(3,answers[2], answer===answers[2]);
		quiz.choiceSet(4,answers[3], answer===answers[3]);
		quiz.onResize = quiz.doNothing;
		quiz.questionNumbers( formatNumber(op1), '&divide;'+formatNumber(op2) );
		quiz.questionPrompt( 'Quotient?' );
	}

	function anyQuestion(quiz,options){
		var rn = Math.random();
		if( rn < 0.25 ){
			divisionQuestion(quiz,options);
		}else if( rn < 0.50 ){
			multiplicationQuestion(quiz,options);
		}else if( rn < 0.75 ){
			subtractionQuestion(quiz,options);
		}else{
			additionQuestion(quiz,options);
		}
	}

	return {
		addition: additionQuestion,
		subtraction: subtractionQuestion,
		multiplication: multiplicationQuestion,
		division: divisionQuestion,
		any: anyQuestion
	};
})();
