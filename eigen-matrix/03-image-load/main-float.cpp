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
	image_bw.convertTo(image2, CV_32FC1);

	Eigen::Map<Eigen::MatrixXf> image(image2.ptr<float>(), image_bw.rows, image_bw.cols);

	// Create the nozzle mask for slicing the image
	Eigen::VectorXf nozzleMask(12);
	for( int i=0; i<12; i+=1 ){
		nozzleMask[i] = (1<<i);
	}

	//cout << "OpenCV rows: " << image_bw.rows << "\n";
	//cout << "OpenCV cols: " << image_bw.cols << "\n";

	//cout << "Eigen rows: " << image.rows() << "\n";
	//cout << "Eigen cols: " << image.cols() << "\n";

	for( int y=0; y<image_bw.rows-12; y+=1 ){
		for( int x=0; x<image_bw.cols; x+=1 ){
			// cout << image.block(x,y,1,12) * (nozzleMask) << "\n";
			image.block(x,y,1,12) * (nozzleMask);
		}
	}

	// Stride<outer,inner>
	// Outer stride: the distance between 2 columns in a row major matrix
	// Inner stride: the distance between 2 rows in a row major matrix
	// Consider:
	// 00 01 02 03
	// 04 05 06 07
	// 08 09 10 11
	// 12 13 14 15
	// Assuming this is "row major" the outer stride is 04, the inner stride is 01

}
