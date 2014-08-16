// ---------------------------------------------------------------------------
//                                                    Fourier Transform Stuff
// ---------------------------------------------------------------------------
var fourier = (function() {

	// -----------------------------------------------------------------------
	//                                                   Complex Number Class
	// -----------------------------------------------------------------------

	function Complex(re, im) {
		this.re = re || 0.0;
		this.im = im || 0.0;
	}
	Complex.add = function(a, b) {
		return new Complex(a.re + b.re, a.im + b.im);
	};
	Complex.sub = function(a, b) {
		return new Complex(a.re - b.re, a.im - b.im);
	};
	Complex.mul = function(a, b) {
		var re = a.re * b.re - a.im * b.im;
		var im = a.re * b.im + a.im * b.re;
		return new Complex(re, im);
	};
	Complex.cexp = function(a) {
		var er = Math.exp(a.re);
		var re = er * Math.cos(a.im);
		var im = er * Math.sin(a.im);
		return new Complex(re, im);
	};
	Complex.magnitude = function(a) {
		return Math.sqrt(a.re * a.re + a.im * a.im);
	};
	Complex.phase = function(a) {
		return Math.atan2(a.re, a.im);
	};

	Complex.I = new Complex(0, 1);
	Complex.i = new Complex(0, 1);
	Complex.J = new Complex(0, 1);
	Complex.j = new Complex(0, 1);

	// -----------------------------------------------------------------------
	//                                              Input Coercing/Validation
	// -----------------------------------------------------------------------

	function ensureLengthIsPowerOf2(values) {
		var nValues = values.length;
		var twoPow = Math.log(nValues) / Math.log(2);

		// If values does not have a power of 2 elements - make it power of 2
		if (twoPow !== Math.round(twoPow)) {
			var nExtra = Math.pow(2, Math.ceil(twoPow)) - nValues;
			for (var i = 0; i < nExtra; i += 1) {
				values.push(new Complex(0));
			}
		}

		return values;
	}

	function ensureArrayIsComplex(values) {
		var i, l = values.length;
		for (i = 0; i < l; i += 1) {
			if (!values[i].hasOwnProperty('im')) {
				values[i] = new Complex(values[i]);
			}
		}
		return values;
	}

	// -----------------------------------------------------------------------
	//                                                          FFT Algorithm
	// -----------------------------------------------------------------------
	function forward(values) {

		// When we have only 1 value we've fully recursed - exit
		var nValues = values.length;
		if (nValues <= 1) {
			return values;
		}

		// Validate the input array
		ensureArrayIsComplex(values);
		ensureLengthIsPowerOf2(values);

		// Divide the input into even and odd indecies
		var even = [],
			odd = [],
			i;
		for (i = 0; i < nValues; i += 2) {
			even.push(values[i]);
			odd.push(values[i + 1]);
		}

		// Compute FFT for each half
		even = forward(even);
		odd = forward(odd);

		// Combine the transformed even and odd halves
		for (i = 0; i < nValues / 2; i += 1) {
			var t = Complex.mul(Complex.cexp(new Complex(0.0, -2 * Math.PI * i / nValues)), odd[i]);
			values[i] = Complex.add(even[i], t);
			values[i + nValues / 2] = Complex.sub(even[i], t);
		}

		// Values are modified in-place - no need to return (done for ease)
		return values;
	}

	function inverse(values) {

		// Validate the input array
		ensureArrayIsComplex(values);
		ensureLengthIsPowerOf2(values);

		var i, nValues = values.length;

		// Conjugate
		for (i = 0; i < nValues; i += 1) {
			values[i].im = -values[i].im;
		}

		// Apply forward transform
		forward(values);

		// Conjugate results back and rescale
		for (i = 0; i < nValues; i += 1) {
			values[i].im = -values[i].im;
			values[i].re /= nValues;
			values[i].im /= nValues;
		}

		return values;
	}

	function magnitude(values) {
		// Computes the magnitude of an array of complex values
		// Returns an array of floating point magnitudes

		var mag = [];
		var i, nValues = values.length;
		for (i = 0; i < nValues; i += 1) {
			mag.push(Complex.magnitude(values[i]));
		}

		return mag;
	}

	function phase(values) {
		// Computes the phase angle (in radians) of an array of complex values
		// Returns an array of floating point phases

		var phases = [];
		var i, nValues = values.length;
		for (i = 0; i < nValues; i += 1) {
			phases.push(Complex.phase(values[i]));
		}

		return phases;
	}

	// -----------------------------------------------------------------------
	//                                                                  Tests
	// -----------------------------------------------------------------------

	function test() {

		var values = [1, 1, 1, 1, 0, 0, 0];
		// Compute the forward transform
		// then invert it (or revert it)
		console.info(forward(values));
		console.info(inverse(values));
		console.info(magnitude(forward(values)));
		console.info(phase(forward(values)));

		// Check a 20Hz sine wave
		var f = 20;
		var i, sinWave = [];
		var nSamples = 256;
		for (i = 0; i < nSamples; i += 1) {
			sinWave.push(Math.sin(2 * Math.PI * f * (i / nSamples)));
		}
		console.info(magnitude(forward(sinWave)));
	}

	// -----------------------------------------------------------------------
	//                                                                Exports
	// -----------------------------------------------------------------------

	return {
		forward: forward,
		inverse: inverse,
		magnitude: magnitude,
		phase: phase
	};

})();

var channelExtract = function(src, channel) {
	var xSize = src.width,
		ySize = src.height,
		srcPixels = src.data,
		x, y, pos;

	var matrix = [];

	for (y = 0; y < ySize; y++) {
		matrix.push([]);
		for (x = 0; x < xSize; x++) {
			pos = (y * xSize + x) * 4;
			matrix[y].push(srcPixels[pos + channel]);
		}
	}

	return matrix;
};
var channelInject = function(matrix, dst, channel) {

	var xSize = dst.width,
		ySize = dst.height,
		dstPixels = dst.data,
		x, y, pos;

	for (y = 0; y < ySize; y++) {
		for (x = 0; x < xSize; x++) {
			pos = (y * xSize + x) * 4;
			dstPixels[pos + channel] = matrix[y][x];
		}
	}

	return dst;
};

var normalize = function(matrix, newMin, newMax) {
	var ySize = matrix.length,
		xSize = matrix[0].length;
	var mMax = matrix[0][0],
		mMin = matrix[0][0];

	// find the current max and min
	var x, y;
	for (y = 0; y < ySize; y += 1) {
		for (x = 0; x < xSize; x += 1) {
			if (matrix[y][x] > mMax) {
				mMax = matrix[y][x];
			}
			if (matrix[y][x] < mMin) {
				mMin = matrix[y][x];
			}
		}
	}

	// compute the ranges the data will be mapped to/from
	var newRange = newMax - newMin;
	var range = mMax - mMin;

	// rescale all the data
	for (y = 0; y < ySize; y += 1) {
		for (x = 0; x < xSize; x += 1) {
			matrix[y][x] = newMin + newRange * (matrix[y][x] - mMin) / range;
		}
	}

	return matrix;
};

function transpose(matrix) {
	var ySize = matrix.length,
		xSize = matrix[0].length;

	var result = [],
		x, y;

	for (x = 0; x < xSize; x += 1) {
		result.push([]);
		for (y = 0; y < ySize; y += 1) {
			result[x].push(matrix[y][x]);
		}
	}

	return result;
}

function _imgFourier(src, fftType) {
	var xSize = src.width,
		ySize = src.height,
		x, y;

	var rs = normalize(channelExtract(src, 0), -1.0, 1.0),
		gs = channelExtract(src, 1),
		bs = channelExtract(src, 2);
	//as = channelExtract( src, 3 );

	for (y = 0; y < ySize; y += 1) {
		rs[y] = fourier.forward(rs[y]);
		//gs[y] = fourier.forward( gs[y] );
		//bs[y] = fourier.forward( bs[y] );
		//fourier.forward( as[y] );
	}

	// transpose (x is now a 'column array')

	rs = transpose(rs);
	//gs = transpose( gs );
	//bs = transpose( bs );
	//as = transpose( as );

	for (x = 0; x < xSize; x += 1) {
		fourier.forward(rs[x]);
		//fourier.forward( gs[x] );
		//fourier.forward( bs[x] );
		//fourier.forward( as[x] );
	}

	// transpose back to the original
	rs = transpose(rs);
	//gs = transpose( gs );
	//bs = transpose( bs );
	//as = transpose( as );

	// compute the magnitudes
	for (y = 0; y < ySize; y += 1) {
		rs[y] = fftType(rs[y]);
		//gs[y] = fftType( gs[y] );
		//bs[y] = fftType( bs[y] );
		//as[y] = fftType( as[y] );
	}


	// Save the image data
	var dst = new ImageData(xSize, ySize);
	var dstPixels = dst.data;
	channelInject(normalize(rs, 0, 255), dst, 0);
	//channelInject( rs, dst, 0 );
	//channelInject( gs, dst, 1 );
	//channelInject( bs, dst, 2 );
	//channelInject( as, dst, 3 );
	for (y = 0; y < ySize; y += 1) {
		for (x = 0; x < xSize; x += 1) {
			dstPixels[(y * xSize + x) * 4 + 3] = 255;
		}
	}

	return dst;
}

function fourierTransformMagnitude(src) {
	return _imgFourier(src, fourier.magnitude);
}

function fourierTransformPhase(src) {
	return _imgFourier(src, fourier.phase);
}

function _fourierTransformMagnitude(src) {

	var xSize = src.width,
		ySize = src.height,
		x, y;

	var rs = normalize(channelExtract(src, 0), -1.0, 1.0),
		gs = channelExtract(src, 1),
		bs = channelExtract(src, 2);
	//as = channelExtract( src, 3 );

	for (y = 0; y < ySize; y += 1) {
		rs[y] = fourier.forward(rs[y]);
		//gs[y] = fourier.forward( gs[y] );
		//bs[y] = fourier.forward( bs[y] );
		//fourier.forward( as[y] );
	}

	// transpose (x is now a 'column array')

	rs = transpose(rs);
	//gs = transpose( gs );
	//bs = transpose( bs );
	//as = transpose( as );

	for (x = 0; x < xSize; x += 1) {
		fourier.forward(rs[x]);
		//fourier.forward( gs[x] );
		//fourier.forward( bs[x] );
		//fourier.forward( as[x] );
	}

	// transpose back to the original
	rs = transpose(rs);
	//gs = transpose( gs );
	//bs = transpose( bs );
	//as = transpose( as );

	// compute the magnitudes
	for (y = 0; y < ySize; y += 1) {
		rs[y] = fourier.magnitude(rs[y]);
		//gs[y] = fourier.magnitude( gs[y] );
		//bs[y] = fourier.magnitude( bs[y] );
		//as[y] = fourier.magnitude( as[y] );
	}

	// Save the image data
	var dst = new ImageData(xSize, ySize);
	var dstPixels = dst.data;
	channelInject(rs, dst, 0);
	//channelInject( gs, dst, 1 );
	//channelInject( bs, dst, 2 );
	//channelInject( as, dst, 3 );
	for (y = 0; y < ySize; y += 1) {
		for (x = 0; x < xSize; x += 1) {
			dstPixels[(y * xSize + x) * 4 + 3] = 255;
		}
	}

	return dst;
}
