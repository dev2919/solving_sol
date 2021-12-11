const canvasSketch = require('canvas-sketch');
const {
  lerp
} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
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

    context.beginPath();
    context.lineWidth = "80";
    context.strokeStyle = "black";
    console.log(points);
    context.rect(margin / 2, margin / 2, width - margin, height - margin);
    // ||| lines
    context.moveTo(width / 2, 120)
    context.lineTo(width / 2, height - margin + 80);

    //---- lines
    context.moveTo(120, height / 2)
    context.lineTo(width - margin + 80, height / 2);
    context.stroke();

    context.lineWidth = "20";

    let a = 0
    for (let index = 0; index < 16; index++) {
      context.moveTo(120 + a, 100)
      context.lineTo(120 + a, height / 2);
      a = a + 55
    }

    a = 0
    for (let index = 0; index < 16; index++) {
      context.moveTo(width / 2, 120 + a)
      context.lineTo(width - 120, 120 + a);
      a = a + 55
    }

    a = 0
    context.moveTo(width/2, height/2)
    context.lineTo(width- margin+80, height- margin+80);
    for (let index = 0; index < 12; index++) {
      context.moveTo(width/2+a, height/2)
      context.lineTo(width - margin+80, height- margin+80-a);
      a = a + 80
    }

    a = 0
    for (let index = 0; index < 12; index++) {
      context.moveTo(width/2, height/2+a)
      context.lineTo(width - margin+80-a, height- margin+80);
      a = a + 80
    }

    // ////

    a = 0
    context.moveTo(width/2, height/2)
    context.lineTo(80, height-80);
    for (let index = 0; index < 12; index++) {
      context.moveTo(width/2-a, height/2)
      context.lineTo(80, height-80-a);
      a = a + 80
    }

    a = 0
    for (let index = 0; index < 12; index++) {
      context.moveTo(width/2, height/2+a)
      context.lineTo(80+a, height-80);
      a = a + 80
    }

    context.stroke();

  };

};

canvasSketch(sketch, settings);