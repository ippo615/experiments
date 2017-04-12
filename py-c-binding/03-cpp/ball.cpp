
#include <stdio.h>
#include <iostream>
#include "ball.h"

Ball::Ball(double radius, double x, double y){
	this->radius = radius;
	this->x = x;
	this->y = y;
}
void Ball::move_by( double x, double y ){
	this->x += x;
	this->y += y;
}
void Ball::move_to( double x, double y ){
	this->x = x;
	this->y = y;
}
void Ball::print(void){
	std::cout << "Your ball is at ( " << this->x << ", " << this->y << " ) and has radius " << this->radius << ".\n";
}
