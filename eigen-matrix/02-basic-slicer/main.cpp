#include <iostream>
#include "../Eigen/Dense"

int main(){
	Eigen::MatrixXd image(12,32);
	image <<
		1,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0, 1,0,1,0,
		0,1,0,0, 0,0,0,0, 0,0,0,0, 1,1,0,0, 0,1,0,0, 1,0,0,0, 0,1,1,0, 1,0,1,0,
		0,0,1,0, 0,0,0,0, 0,0,0,0, 0,1,1,0, 0,0,1,0, 1,0,0,0, 1,0,1,0, 1,0,0,1,
		0,0,0,1, 0,0,0,0, 0,0,0,0, 0,0,1,1, 0,0,0,1, 0,1,0,0, 0,1,1,0, 1,0,0,1,
		0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,1, 0,0,0,0, 0,1,0,0, 1,0,1,0, 1,0,0,0,
		0,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,1,0,0, 0,1,1,0, 1,0,0,0,
		0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0, 1,0,0,1, 1,0,0,0,
		0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,1,0,1, 1,0,0,0,
		0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,1, 0,0,1,0, 1,0,0,1, 1,0,0,1,
		0,0,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,1, 0,1,0,1, 1,0,0,1,
		0,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0, 0,1,0,0, 0,0,0,1, 1,0,0,1, 1,0,1,0,
		0,0,0,0, 0,0,0,0, 0,0,0,1, 0,0,0,0, 1,0,0,0, 0,0,0,1, 0,1,0,1, 1,0,1,0;

	Eigen::VectorXd nozzleMask(12);
	for( int i=0; i<12; i+=1 ){
		nozzleMask[i] = (1<<i);
	}

	// a 6"x6" image at 254dpi -> 1524x1524 pixels
	// a 12x1 mask gives us 1524x127 (=193548) firing patterns
	// running the following code takes on average 5.46 seconds
	for( int r=0; r<193548; r+=1 ){
		for( int i=0; i<32; i+=1 ){
			//std::cout << nozzleMask.dot(image.col(i)) << '\n';
			nozzleMask.dot(image.col(i));
		}
	}

}