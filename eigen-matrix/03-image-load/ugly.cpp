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
	//Mat image_bw = image_gray > 128;
	Mat image_bw;
	threshold(image_gray, image_bw, 128.0, 1.0, THRESH_BINARY_INV);

	cout << image_rgb.type() << '\n';
	cout << image_gray.type() << '\n';
	cout << image_bw.type() << '\n';

	// Create the nozzle mask for slicing the image
	Eigen::VectorXf nozzleMask(12);
	for( int i=0; i<12; i+=1 ){
		nozzleMask[i] = (1<<i);
	}

	Mat image2;
	image_bw.convertTo(image2, CV_32FC1);

	// Map the image to an eigen matrix
	//Eigen::Map<Eigen::MatrixXf> image(image_bw.data,image_bw.rows,image_bw.cols);

	//Eigen::Matrix<float, Eigen::Dynamic, Eigen::Dynamic> image;
	//cv2eigen(image2, &image);

	//Eigen::Map<Eigen::Matrix<float, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor>> image;
	//Eigen::Map<Eigen::Matrix<float, Eigen::Dynamic, Eigen::Dynamic, Eigen::RowMajor>>;
	//(image_bw.ptr<float>(), image_bw.rows, image_bw.cols);

	Eigen::Map<Eigen::MatrixXf> image(image2.ptr<float>(), image_bw.rows, image_bw.cols);

	for( int i=0; i<32; i+=1 ){
		//std::cout << nozzleMask << '\n' << image.block(i,0,1,12) << "\n --- \n";
		std::cout << nozzleMask << '\n' << image.block(0,i,12,1) << "\n --- \n";
		std::cout << nozzleMask.cwiseProduct(image.block(0,i,12,1)).sum() << "\n --- \n";
		//std::cout << nozzleMask.dot( image.block(0,i,12,1) ) << '\n';
	}

}
