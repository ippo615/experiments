#include <stdio.h>
#include <opencv2/opencv.hpp>
#include "../Eigen/Dense"
#include <opencv2/core/eigen.hpp>

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

	// Load the image as a grayscale image
	Mat image_gray = imread( argv[1], CV_LOAD_IMAGE_GRAYSCALE );
	if ( !image_gray.data ){
		printf("No image data \n");
		return -1;
	}

	// Threshold it (for black and white), black=1, white=0
	Mat image_bw;
	threshold(image_gray, image_bw, 128.0, 1.0, THRESH_BINARY_INV);

	// Make the values floats so they can be multiplied and will end up in the correct scale
	Mat image2;
	image_bw.convertTo(image2, CV_32S);

	Eigen::Map<Eigen::MatrixXi> image(image2.ptr<int>(), image_bw.rows, image_bw.cols);

	// Create the nozzle mask for slicing the image
	Eigen::VectorXi nozzleMask(12);
	for( int i=0; i<12; i+=1 ){
		nozzleMask[i] = (1<<i);
	}

	for( int y=0; y<image_bw.rows-12; y+=1 ){
		for( int x=0; x<image_bw.cols; x+=1 ){
			//cout << image.block(x,y,1,12)*nozzleMask << "\n";
			image.block(x,y,1,12)*nozzleMask;
		}
	}

}
