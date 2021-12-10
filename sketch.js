const canvasSketch = require('canvas-sketch');
const {
  lerp
} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [4048, 2048],
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6)
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const margin = 200;





  // random.setSeed(512);




  return ({
    context,
    width,
    height
  }) => {

    const createGrid = () => {
      const points = [];
      const count = 6;
      for (let x = 0; x < count; x++) {
        for (let y = 0; y < count; y++) {
          const u = count <= 1 ? 0.5 : x / (count - 1);
          const v = count <= 1 ? 0.5 : y / (count - 1);
          const px = lerp(margin, width - margin, u);
          const py = lerp(margin, height - margin, v);
          points.push([px, py]);
        }
      }
      return points;
    }

    let points = createGrid()
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let shape = [];
    while (points.length > 2) {

      const pointsToRemove = random.shuffle(points).slice(0, 2);

      if (pointsToRemove.length < 2) {
        break;
      }

      const color = random.pick(palette);

      points = points.filter((p) => !pointsToRemove.includes(p))

      console.log(pointsToRemove);
      context.beginPath();
      context.lineTo(pointsToRemove[0][0], height-margin);
      context.lineTo(pointsToRemove[0][0], pointsToRemove[0][1]);
      context.lineTo(pointsToRemove[1][0], pointsToRemove[1][1]);
      context.lineTo(pointsToRemove[1][0], height-margin);
      context.closePath();
      context.lineWidth = 20;
      // context.globalAlpha = 0.85;
      context.fillStyle = color;
      context.fill();

      // Outline at full opacity
      context.lineJoin = context.lineCap = 'round';
      context.strokeStyle = "white";
      context.globalAlpha = 1;
      context.stroke();


    }


  };

};

canvasSketch(sketch, settings);