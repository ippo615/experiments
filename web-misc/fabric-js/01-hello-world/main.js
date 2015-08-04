var canvas = new fabric.Canvas('canvas-main');

var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  selectable: false // disable drag, scale, rotate
  /*
  hasControls: false,      // disable scale, rotate
  hasRotatingPoint: false, // disbale rotate
  hasBorders: false,       // don't draw bounding box
  lockMovementX: true,  // disable x dragging
  lockMovementY: true,  // disable y dragging
  */
});

canvas.add(rect);
