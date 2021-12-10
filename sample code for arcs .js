//sample code for arcs 
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        context.beginPath();
        var x = width/6 + j * 450; // x coordinate
        var y = height/6 + i * 450; // y coordinate
        var radius = 150; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        var counterclockwise = i % 2 !== 0; // clockwise or counterclockwise

        context.arc(x, y, radius, startAngle, endAngle, counterclockwise);

        if (i > 1) {
          context.fill();
        } else {
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
