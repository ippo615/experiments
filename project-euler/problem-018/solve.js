/** Maximum path sum I
 * 
 * By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.
 * 
 *        3
 *       7 4
 *      2 4 6
 *     8 5 9 3
 * 
 * That is, 3 + 7 + 4 + 9 = 23.
 * 
 * Find the maximum total from top to bottom of the triangle below:
 * 
 *                                 75
 *                               95  64
 *                             17  47  82
 *                           18  35  87  10
 *                         20  04  82  47  65
 *                       19  01  23  75  03  34
 *                     88  02  77  73  07  63  67
 *                   99  65  04  28  06  16  70  92
 *                 41  41  26  56  83  40  80  70  33
 *               41  48  72  33  47  32  37  16  94  29
 *             53  71  44  65  25  43  91  52  97  51  14
 *           70  11  33  28  77  73  17  78  39  68  17  57
 *         91  71  52  38  17  14  91  43  58  50  27  29  48
 *       63  66  04  68  89  53  67  30  73  16  69  87  40  31
 *     04  62  98  27  23  09  70  98  73  93  38  53  60  04  23
 *
 * NOTE: As there are only 16384 routes, it is possible to solve this
 * problem by trying every route. However, Problem 67, is the same
 * challenge with a triangle containing one-hundred rows; it cannot be
 * solved by brute force, and requires a clever method! ;o)
 */

var tri_small = [
	[3],
	[7,4],
	[2,4,6],
	[8,5,9,3]
];

var tri_large = [
	[75],
	[95,64],
	[17,47,82],
	[18,35,87,10],
	[20,04,82,47,65],
	[19,01,23,75,03,34],
	[88,02,77,73,07,63,67],
	[99,65,04,28,06,16,70,92],
	[41,41,26,56,83,40,80,70,33],
	[41,48,72,33,47,32,37,16,94,29],
	[53,71,44,65,25,43,91,52,97,51,14],
	[70,11,33,28,77,73,17,78,39,68,17,57],
	[91,71,52,38,17,14,91,43,58,50,27,29,48],
	[63,66,04,68,89,53,67,30,73,16,69,87,40,31],
	[04,62,98,27,23,09,70,98,73,93,38,53,60,04,23]
];

// Obligatory brute-force:

function path_score_brute_force( triangle, scores, r, c, score ){

	var nRows = triangle.length;
	var thisScore = triangle[r][c];
	if( nRows === r+1 ){
		scores.push( thisScore+score );
		return scores;
	}

	path_score_brute_force( triangle, scores, r+1, c, score+thisScore );
	path_score_brute_force( triangle, scores, r+1, c+1, score+thisScore );
	return scores;
}

function find_max( values ){
	var best_value = values[0];
	var best_index = 0;
	var nValues = values.length;
	for( var i=0; i<nValues; i+=1 ){
		var value = values[i];
		if( value > best_value ){
			best_value = value;
			best_index = i;
		}
	}
	return best_value;
}

function path_score_dynamic( triangle ){

	// copy the triangle
	var nRows = triangle.length;
	var tri = [];
	for( var r=0; r<nRows; r+=1 ){
		var row = [];
		for( var c=0; c<triangle[r].length; c+=1 ){
			row.push( triangle[r][c] );
		}
		tri.push(row);
	}

	// Each spot can be reached from 2 spots in the previous row
	// We add the higher of the two to the current spot, keeping
	// only the highest possible paths through the triangle
	for( var r=1; r<nRows; r+=1 ){
		var colEnd = tri[r].length-1;
		tri[r][0] += tri[r-1][0];
		for( var c=1; c<colEnd; c+=1 ){
			var parentLeft = tri[r-1][c-1];
			var parentRight = tri[r-1][c];
			tri[r][c] += (parentLeft > parentRight)?parentLeft:parentRight;
		}
		tri[r][colEnd] += tri[r-1][colEnd-1];
	}

	return find_max( tri[ nRows - 1 ] );

}

console.info( find_max( path_score_brute_force( tri_small, [], 0, 0, 0, [] ) ) );
console.info( find_max( path_score_brute_force( tri_large, [], 0, 0, 0, [] ) ) );

console.info( path_score_dynamic( tri_small ) );
console.info( path_score_dynamic( tri_large ) );

/** 1074
 * Congratulations, the answer you gave to problem 18 is correct.
 * 
 * You are the 74888th person to have solved this problem.
 */
