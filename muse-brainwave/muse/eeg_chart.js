
function EegChart(){

	this.leftEar = new TimeSeries();
	this.leftHead = new TimeSeries();
	this.rightEar = new TimeSeries();
	this.rightHead = new TimeSeries();
	
	this.chart = new SmoothieChart({
		grid: {
			strokeStyle:'rgb(60, 60, 60)',
			fillStyle:'rgb(20, 20, 20)',
			lineWidth: 1,
			millisPerLine: 250,
			verticalSections: 6
		},
		labels: {
			fillStyle:'rgb(200, 200, 200)'
		}
	});

	this.chart.addTimeSeries( this.leftEar, {
		strokeStyle:'rgb(255, 0, 0)',
		fillStyle:'rgba(255, 0, 0, 0.4)',
		lineWidth:3
	} );
	this.chart.addTimeSeries( this.leftHead, {
		strokeStyle:'rgb(255, 255, 0)',
		fillStyle:'rgba(255, 255, 0, 0.4)',
		lineWidth:3
	} );
	this.chart.addTimeSeries( this.rightEar, {
		strokeStyle:'rgb(0, 255, 0)',
		fillStyle:'rgba(0, 255, 0, 0.4)',
		lineWidth:3
	} );
	this.chart.addTimeSeries( this.rightHead, {
		strokeStyle:'rgb(0, 0, 255)',
		fillStyle:'rgba(0, 0, 255, 0.4)',
		lineWidth:3
	} );

	this.canvas = document.createElement('canvas');
	this.canvas.width = 128;
	this.canvas.height = 128;
	this.canvas.className = 'media-object';

	this.chart.streamTo( this.canvas, 1000 );

}

EegChart.prototype.push = function( time, data ){
	this.leftEar.append( time, data.leftEar );
	this.leftHead.append( time, data.leftHead );
	this.rightHead.append( time, data.rightHead );
	this.rightEar.append( time, data.rightEar );
};



