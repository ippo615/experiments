/** Counting Sundays
 * Problem 19
 * 
 * You are given the following information, but you may prefer to do
 * some research for yourself.
 * 
 *     1 Jan 1900 was a Monday.
 *     Thirty days has September,
 *     April, June and November.
 *     All the rest have thirty-one,
 *     Saving February alone,
 *     Which has twenty-eight, rain or shine.
 *     And on leap years, twenty-nine.
 *     A leap year occurs on any year evenly divisible by 4, but not
 *     on a century unless it is divisible by 400.
 * 
 * How many Sundays fell on the first of the month during the
 * twentieth century (1 Jan 1901 to 31 Dec 2000)?
 */

function is_leap_year( year ){
	if( year % 100 === 0 ){
		return year % 400 === 0;
	}
	return year % 4 === 0;
}

function get_month_days( year, month ){
	switch( month ){

		// 30 days have sep, apr, jun, nov
		case 3:
		case 5:
		case 8:
		case 10:
			return 30;

		// 31 days: jan, mar, may, jul, aug, oct, dec
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			return 31;

		// FEB
		case 1:
			if( is_leap_year ){
				return 29;
			}else{
				return 28;
			}
	
	}
}

var count = 0;
var weekday = 1;
for( var y=1900; y<2001; y+=1 ){
	for( var m=0; m<12; m+=1 ){
		var days = get_month_days( y, m );
		for( var d=0; d<days; d+=1 ){
			weekday = (weekday+1) % 7;
			if( y >= 1901 && y < 2001 ){
				if( weekday === 0 && d == 0 ){
					count += 1;
				}
			}
		}
	}
}
console.info( count );

/** 171
 * Congratulations, the answer you gave to problem 19 is correct.
 * 
 * You are the 69200th person to have solved this problem.
 */
