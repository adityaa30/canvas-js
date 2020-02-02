const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

const colorScheme = [
  '#00bdff',
  '#4d39ce',
  '#088eff'
];

class GradientColor {
  constructor() {
    this.colors = ['#d98880', '#cd6155', '#c0392b', '#a93226', '#922b21', '#f1948a', '#ec7063', '#e74c3c', '#cb4335', '#b03a2e', '#c39bd3', '#af7ac5', '#9b59b6', '#884ea0', '#76448a', '#bb8fce', '#a569bd', '#8e44ad', '#7d3c98', '#6c3483', '#7fb3d5', '#5499c7', '#2980b9', '#2471a3', '#1f618d', '#85c1e9', '#5dade2', '#3498db', '#2e86c1', '#2874a6', '#76d7c4', '#48c9b0', '#1abc9c', '#17a589', '#148f77', '#73c6b6', '#45b39d', '#16a085', '#138d75', '#117a65', '#7dcea0', '#52be80', '#27ae60', '#229954', '#1e8449', '#82e0aa', '#58d68d', '#2ecc71', '#28b463', '#239b56', '#f7dc6f', '#f4d03f', '#f1c40f', '#d4ac0d', '#b7950b', '#f8c471', '#f5b041', '#f39c12', '#d68910', '#b9770e', '#f0b27a', '#eb984e', '#e67e22', '#ca6f1e', '#af601a', '#e59866', '#dc7633', '#d35400', '#ba4a00', '#a04000'];
    // this.colors.reverse();
    this.idx = 0;
  }

  update() {
    this.idx += 1;
    if (this.idx >= this.colors.length) this.idx = 0;
  }

  getColor() {
    this.update();
    return this.colors[this.idx]
  }
}


window.addEventListener('resize', Init);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Particle {
  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.color = new GradientColor();

    this.width = Math.max(window.innerWidth, window.innerHeight) + 100;
    console.log(window.innerWidth, window.innerHeight);
    this.delta = {
      width: -(0.03 * this.width),
      radians: () => (Math.PI / 180) * (randomNumber(1, 10) / 10),
    }

    this.stop = {
      width: 0,
    };
    this.radians = 0;
  }

  draw(ctx, color) {
    // ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.radians);
    ctx.translate(-this.x, -this.y);
    ctx.fillStyle = color;
    ctx.fillRect(this.x - (this.width / 2), this.y - (this.width / 2), this.width, this.width);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(this.x - (this.width / 2), this.y - (this.width / 2), this.width, this.width);
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 25;
    ctx.fill();
    // ctx.closePath();
  }

  update(ctx) {
    // Move the points over-time
    let color = this.color.getColor();
    let done = true;
    this.radians += this.delta.radians();
    this.width += this.delta.width;

    if (this.width <= this.stop.width) {
      this.delta.radians = 0;
      this.radians = 0;
      this.delta.width = 0;
      color = "#ffffff";
      done = false;
    }

    this.draw(ctx, color);
    return done;
  }
}


particles = new Particle();
function Init() {
  myCanvas.width = innerWidth;
  myCanvas.height = innerHeight;

  particle = new Particle();
  // for (let i = 0; i < 100; ++i) {
  //   particles.push(new Particle(
  //     myCanvas.width / 2,
  //     myCanvas.height / 2,
  //     (Math.random() * 2) + 1));
  // }

  animate();
}

function animate() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.001)';
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  // particles.forEach(particle => particle.update(ctx));
  let val = particle.update(ctx);
  if (val) {
    requestAnimationFrame(animate);
  }
}

Init();