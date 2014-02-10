var presidentialQuestion = (function(){
	var csvPresidentalData = "index,ordinal,name,state,occupation\n"
	+"1,1st,George Washington,Virginia,Planter and land surveyor\n"
	+"2,2nd,John Adams,Massachusetts,Lawyer\n"
	+"3,3rd,Thomas Jefferson,Virginia,Planter and Lawyer\n"
	+"4,4th,James Madison,Virginia,lawyer\n"
	+"5,5th,James Monroe,Virginia,lawyer\n"
	+"6,6th,John Quincy Adams,Massachusetts,lawyer\n"
	+"7,7th,Andrew Jackson,Tennessee,lawyer\n"
	+"8,8th,Martin Van Buren,New York,lawyer and political organizer\n"
	+"9,9th,William Henry Harrison,Ohio,military\n"
	+"10,10th,John Tyler,Virginia,lawyer\n"
	+"11,11th,James K. Polk,Tennessee,lawyer\n"
	+"12,12th,Zachary Taylor,Louisiana,military\n"
	+"13,13th,Millard Fillmore,New York,lawyer\n"
	+"14,14th,Franklin Pierce,New Hampshire,lawyer\n"
	+"15,15th,James Buchanan,Pennsylvania,lawyer\n"
	+"16,16th,Abraham Lincoln,Illinois,Lawyer\n"
	+"17,17th,Andrew Johnson,Tennessee,Lawyer\n"
	+"18,18th,Ulysses S. Grant,Ohio,military\n"
	+"19,19th,Rutherford B. Hayes,Ohio,lawyer\n"
	+"20,20th,James A. Garfield,Ohio,lawyer\n"
	+"21,21st,Chester A. Arthur,New York,Lawyer\n"
	+"22,22nd,Grover Cleveland,New York,lawyer\n"
	+"23,23rd,Benjamin Harrison,Indiana,lawyer\n"
	+"24,24th,Grover Cleveland,New York,----\n"
	+"25,25th,William McKinley,Ohio,lawyer\n"
	+"26,26th,Theodore Roosevelt,New York,military historian\n"
	+"27,27th,William Howard Taft,Ohio,lawyer\n"
	+"28,28th,Woodrow Wilson,New Jersey,academic\n"
	+"29,29th,Warren G. Harding,Ohio,business owner\n"
	+"30,30th,Calvin Coolidge,Massachusetts,Lawyer\n"
	+"31,31st,Herbert Hoover,California,mining engineer\n"
	+"32,32nd,Franklin D. Roosevelt,New York,lawyer\n"
	+"33,33rd,Harry S. Truman,Missouri,business owner\n"
	+"34,34th,Dwight D. Eisenhower,Kansas,military\n"
	+"35,35th,John F. Kennedy,Massachusetts,politician\n"
	+"36,36th,Lyndon B. Johnson,Texas,teacher\n"
	+"37,37th,Richard Nixon,California,lawyer\n"
	+"38,38th,Gerald Ford,Michigan,lawyer\n"
	+"39,39th,Jimmy Carter,Georgia,farmer\n"
	+"40,40th,Ronald Reagan,California,actor\n"
	+"41,41st,George H. W. Bush,Texas,businessman\n"
	+"42,42nd,Bill Clinton,Arkansas,lawyer and teacher\n"
	+"43,43rd,George W. Bush,Texas,businessman\n"
	+"44,44th,Barack Obama,Illinois,lawyer";

	function delimetedToObjects(config){
		var rowDelimeter = 'rowDelimeter' in config ? config.rowDelimeter : '\n';
		var colDelimeter = 'colDelimeter' in config ? config.colDelimeter : '\t';

		var text = 'text' in config ? config.text : '';

		// start with the first 
		var headers = [];
		var rows = text.split(rowDelimeter);
		var nRows = rows.length;
		var row = rows[0];
		var cols = row.split(colDelimeter);
		var i,j,nCols=cols.length;
		for( i=0; i<nCols; i+=1 ){
			headers.push( cols[i] );
		}		

		var entry, entries = [];
		for( i=1; i<nRows; i+=1 ){
			cols = rows[i].split(colDelimeter);
			entry = {};
			for( j=0; j<nCols; j+=1 ){
				entry[headers[j]] = cols[j];
			}
			entries.push(entry);
		}

		return entries;
	}

	var presidents = delimetedToObjects({
		colDelimeter: ',',
		text: csvPresidentalData
	});

	function chooseRandom(group,n){
		var results = [];
		var nEntries = group.length, index, selected = [];
		while( results.length < n ){
			index = Math.floor( Math.random()*nEntries );
			if( !(index in selected) ){
				selected[index] = true;
				results.push( group[index] );
			}
		}
		return results;
	}

	var nthPresident = function(quiz,options){

		var choices = chooseRandom( presidents, 4 );
		var correctIndex = Math.floor( Math.random()*4 );
		var president = choices[correctIndex];

		var answers = [
			choices[0].name,
			choices[1].name,
			choices[2].name,
			choices[3].name
		];

		quiz.onResize = quiz.doNothing;

		quiz.choiceSet(1,answers[0], president.name===answers[0]);
		quiz.choiceSet(2,answers[1], president.name===answers[1]);
		quiz.choiceSet(3,answers[2], president.name===answers[2]);
		quiz.choiceSet(4,answers[3], president.name===answers[3]);

		quiz.questionText('Who was the '+president.ordinal+' president of the United States?');
	};

	return nthPresident;

})();
