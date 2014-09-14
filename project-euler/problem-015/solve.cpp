#include <iostream>

// Build: g++ solve.cpp
// Run: ./a.out
// Note: brute-force c++ is just as slow as js, check out the js
// for better implementations (memoization, dynamic programming)

int solve(int xSize, int ySize, int x, int y){
	bool xArrived = (x==xSize);
	bool yArrived = (y==ySize);
	if( xArrived && yArrived ){
		return 1;
	}else
	if( xArrived && ! yArrived ){
		return solve(xSize,ySize,x,y+1);
	}else
	if( ! xArrived && yArrived ){
		return solve(xSize,ySize,x+1,y);
	}else{
		int dx = solve(xSize,ySize,x+1,y);
		int dy = solve(xSize,ySize,x,y+1);
		return dx+dy;
	}
}

int main(){

	std::cout << solve( 2,2, 0,0 ) << '\n';
	std::cout << solve( 3,3, 0,0 ) << '\n';
	std::cout << solve( 4,4, 0,0 ) << '\n';
	std::cout << solve( 10,10, 0,0 ) << '\n';
	//std::cout << solve( 20,20, 0,0 ) << '\n'; // hours

}
