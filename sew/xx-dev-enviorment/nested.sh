#!/bin/bash

function doc(){

	function build(){
		echo "Building $1 ..."
	}

	function install(){
		echo "Installing $1 ..."
	}

	action=$1
	shift
	$action $@
}

action=$1
shift
$action $@
