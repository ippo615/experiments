
function computeHistogram(src, nBins) {

	var xSize = src.width,
	    ySize = src.height,
	    srcPixels = src.data,
	    x, y, i, pos;

	var binSize = 256.0 / nBins;

	// Create a histogram for each channel
	var r = 0,
		rValues=[];
	var g = 0,
		gValues=[];
	var b = 0,
		bValues=[];
	var a = 0,
		aValues=[];

	// Initialize all the histogram bins to 0
	for( i=0; i<nBins; i+=1 ){
		rValues.push(0);
		gValues.push(0);
		bValues.push(0);
		aValues.push(0);
	}

	for(y=0; y<ySize; y++){
	    for(x=0; x<xSize; x++){

	        pos = (y*xSize+x)*4;
	                    
	        r = srcPixels[pos + 0];
	        g = srcPixels[pos + 1];
	        b = srcPixels[pos + 2];
	        a = srcPixels[pos + 3];

			rValues[ Math.floor( r / binSize ) ] += 1;
			gValues[ Math.floor( g / binSize ) ] += 1;
			bValues[ Math.floor( b / binSize ) ] += 1;
			aValues[ Math.floor( a / binSize ) ] += 1;

	    }
	}
	
	return [rValues,gValues,bValues,aValues];
};

function normalizeHistogram(histogram,newMin,newMax){
	// Returns the same histogram with the bins scaled so that
	// the values represent the percentage of occurances (not raw counts)

	var sum = 0.0, i, l = histogram.length;
	for( i=0; i<l; i+=1 ){
		sum += histogram[i];
	}

	var newHist = [];
	var newRange = newMax - newMin;
	for( i=0; i<l; i+=1 ){
		newHist.push( (histogram[i]*newRange)/sum + newMin );
	}
	
	return newHist;
}

function computeCdf(pdf){
	// Returns the cumulative density function computed from a
	// probability density function or histogram
	var total = 0, cdf = [];
	var i, l = pdf.length;
	for( i=0; i<l; i+=1 ){
		total += pdf[i]
		cdf.push( total );
	}
	return cdf;
}

function equalize(src,dst){
	var xSize = src.width,
	    ySize = src.height,
	    srcPixels = src.data,
	    dstPixels = dst.data,
		nBins = 256,
	    x, y, i, pos;

	var histograms = computeHistogram(src, nBins),
	    rAdj = computeCdf( normalizeHistogram( histograms[0], 0.0, nBins - 1.0 ) ),
	    gAdj = computeCdf( normalizeHistogram( histograms[1], 0.0, nBins - 1.0 ) ),
	    bAdj = computeCdf( normalizeHistogram( histograms[2], 0.0, nBins - 1.0 ) );

	for(y=0; y<ySize; y++){
	    for(x=0; x<xSize; x++){

	        pos = (y*xSize+x)*4;
	                    
	        r = srcPixels[pos + 0];
	        g = srcPixels[pos + 1];
	        b = srcPixels[pos + 2];
	        a = srcPixels[pos + 3];

			dstPixels[pos+0] = rAdj[r];
			dstPixels[pos+1] = gAdj[g];
			dstPixels[pos+2] = bAdj[b];
			dstPixels[pos+3] = a;
		}
	}
}

function equalizeArr(srcs, dsts,  opt){
	return equalize( srcs[0], dsts, 256 );
}

function computeHistogramArr(srcs,  opt){
	return computeHistogram( srcs[0], null, opt );
}

var computeHistogramInterface = {
    title: 'Compute Histogram',
	functionName: 'computeHistogram',
    description: 'Computes a histogram for all the channels of an input image',
    sources: [{
        title: 'src',
        description: 'The pixel data that will be used to generate the histogram'
    }],
    destinations: [],
    inputs: [{
        title: 'nBins',
        description: 'The number of bins that will be used in each histogram',
        type: 'int',
        min: 1,
        max: 256,
        value: 32
    }],
    outputs: [{
        title: 'r',
        description: 'The histogram for the red channel',
        type: 'array'
    }, {
        title: 'g',
        description: 'The histogram for the green channel',
        type: 'array'
    }, {
        title: 'b',
        description: 'The histogram for the blue channel',
        type: 'array'
    }, {
        title: 'a',
        description: 'The histogram for the alpha channel',
        type: 'array'
    }]
};

function pluckTo(things,results,propName){
	var i, obj, l=things.length;
	for( i=0; i<l; i+=1 ){
		results.push( things[i][propName] );
	}
}

function parseInterface( interfaceObj ){

	var args = [];
	pluckTo(interfaceObj.sources,args,'title');
	pluckTo(interfaceObj.destinations,args,'title');
	pluckTo(interfaceObj.inputs,args,'title');

	var returns = [];
	pluckTo(interfaceObj.outputs, returns, 'title');

	var strVersion = '';
	strVersion += 'function '+interfaceObj.functionName;
	strVersion += '(' + args.join(',') + '){\n';
	strVersion += '\n\t/* function body here */\n\n';
	strVersion += '\treturn {\n\t\t' + returns.join(': ,\n\t\t') + ': \n\t};\n';
	strVersion += '}';

	return strVersion;
}

console.info( parseInterface(computeHistogramInterface) );

/*
title: Compute Histogram
functionName: computeHistogram
description: |
  Computes a histogram for all the channels of an input image.
  Blah blah blah blah blah
  Blah balb blah blah blah
sources:
  - title: ahsh
    desc: ahs
  - title: jdj
    desc: blah
destinations:
  - title: ahs
    desc: ash
inputs:
  - title: red
    desc: the color red
outputs:
  - title: red
    desc: the red histogram
*/