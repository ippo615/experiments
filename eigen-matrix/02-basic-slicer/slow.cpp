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
	// running the following code takes on average 21.6 seconds
	double sum;
	for( int r=0; r<193548; r+=1 ){
		sum = 0;
		for( int i=0; i<32; i+=1 ){
			sum += nozzleMask[0] * image.col(i)[0];
			sum += nozzleMask[1] * image.col(i)[1];
			sum += nozzleMask[2] * image.col(i)[2];
			sum += nozzleMask[3] * image.col(i)[3];
			sum += nozzleMask[4] * image.col(i)[4];
			sum += nozzleMask[5] * image.col(i)[5];
			sum += nozzleMask[6] * image.col(i)[6];
			sum += nozzleMask[7] * image.col(i)[7];
			sum += nozzleMask[8] * image.col(i)[8];
			sum += nozzleMask[9] * image.col(i)[9];
			sum += nozzleMask[10] * image.col(i)[10];
			sum += nozzleMask[11] * image.col(i)[11];
		}
	}

}
