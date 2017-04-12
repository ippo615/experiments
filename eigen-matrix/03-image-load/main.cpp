#include <stdio.h>
#include <opencv2/opencv.hpp>
#include "../Eigen/Dense"

using namespace cv;
using namespace std;

int main(int argc, char** argv ){

	bool debug = true;

	if ( argc < 2 ){
		printf("usage: %s <Image_Path>\n", argv[0]);
		return -1;
	}
	if( argc >= 3 ){
		debug = true;
	}else{
		debug = false;
	}

	// Load the image
	Mat image_rgb = imread( argv[1], 1 );
	if ( !image_rgb.data ){
		printf("No image data \n");
		return -1;
	}

	// Convert it to greyscale
	Mat image_gray;
	cvtColor( image_rgb, image_gray, CV_RGB2GRAY );

	// Threshold it (for black and white)
	Mat image_bw = image_gray > 128;

	// Create the nozzle mask for slicing the image
	Eigen::VectorXd nozzleMask(12);
	for( int i=0; i<12; i+=1 ){
		nozzleMask[i] = (1<<i);
	}

	// Map the image to an eigen matrix
	//Eigen::Map<Eigen::MatrixXf> image(image_bw.data,image_bw.rows,image_bw.cols);

	//for( int i=0; i<32; i+=1 ){
	//	std::cout << nozzleMask.dot(image.col(i)) << '\n';
	//}

}
