
function Chart(data){

	this.chart = new SmoothieChart({
		grid: this.gridStyle,
		labels: this.labelStyle
	});

	this.data = {};
	for( var prop in data ){
		if( data.hasOwnProperty( prop ) ){
			this.data[ prop ] = new TimeSeries();
		}
	}

	var i = 0;
	for( var prop in this.data ){
		if( data.hasOwnProperty( prop ) ){
			this.chart.addTimeSeries(
				this.data[ prop ],
				this.styles[ i ]
			);
		}
		i += 1;
	}

	this.canvas = document.createElement('canvas');
	this.canvas.width = 128;
	this.canvas.height = 128;
	this.canvas.className = 'media-object';

	this.chart.streamTo( this.canvas, 1000 );

}

Chart.prototype.labelStyle = {
	fillStyle:'rgb(200, 200, 200)'
};

Chart.prototype.gridStyle = {
	strokeStyle:'rgb(60, 60, 60)',
	fillStyle:'rgb(20, 20, 20)',
	lineWidth: 1,
	millisPerLine: 250,
	verticalSections: 6
};

Chart.prototype.styles = [
	{
		strokeStyle:'rgb(255, 0, 0)',
		fillStyle:'rgba(255, 0, 0, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(0, 0, 255)',
		fillStyle:'rgba(0, 0, 255, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(0, 255, 0)',
		fillStyle:'rgba(0, 255, 0, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(255, 255, 0)',
		fillStyle:'rgba(255, 255, 0, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(255, 0, 255)',
		fillStyle:'rgba(255, 0, 255, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(255, 128, 0)',
		fillStyle:'rgba(255, 128, 0, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(0, 255, 255)',
		fillStyle:'rgba(0, 255, 255, 0.4)',
		lineWidth:3
	}, {
		strokeStyle:'rgb(255, 255, 255)',
		fillStyle:'rgba(255, 255, 255, 0.4)',
		lineWidth:3
	}
];

Chart.prototype.push = function( time, data ){
	for( var prop in data ){
		if( data.hasOwnProperty( prop ) && this.data.hasOwnProperty( prop ) ){
			this.data[prop].append( time, data[prop] );
		}
	}
};

