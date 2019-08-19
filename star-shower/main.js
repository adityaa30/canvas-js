const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

addEventListener('resize', Init);

class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {x: 0, y: 3};
    this.gravity = {x: 0, y: 1};

    this.friction = 0.8;
    this.dradius = 3; // Change in radius
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);

    // When ball hits bottom/top of the screen
    if (this.y + this.radius + this.velocity.y > myCanvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      this.velocity.y += this.gravity.y;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
  }

  shatter() {
    this.radius = Math.max(this.radius - this.dradius, 0);
    for (let i = 0; i < 8; ++i) {
      miniStars.push(new MiniStar(this.x, this.y, 2, 'red'));
    }
  }
}

class MiniStar extends Star {
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
    this.velocity = {
      x: randomNumber(-5, 5),
      y: randomNumber(-15, 15),
    };
    this.gravity = {x: 0, y: 0.1};
    this.timeToLive = 100; // Number of frames to live
  }

  update(ctx) {
    this.draw(ctx);

    // When ball hits bottom/top of the screen
    if (this.y + this.radius + this.velocity.y > myCanvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
    } else {
      this.velocity.y += this.gravity.y;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.timeToLive -= 1;
  }

}

let stars = [];
let miniStars = [];

function Init() {
  // Initialize the canvas size
  myCanvas.width = innerWidth;
  myCanvas.height = innerHeight;

  // Create multiple start objects
  stars = [];
  miniStars = [];
  for (let i = 0; i < 1; ++i) {
    stars.push(new Star(myCanvas.width / 2, 30, 30, 'blue'));
  }
}

function Animate() {
  requestAnimationFrame(Animate);

  // Clear the canvas
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // Update & Draw the stars
  stars.forEach((star, idx) => {
    // Remove the Star if its size becomes negligible
    if (star.radius === 0) {
      stars.splice(idx, 1);
    }
    star.update(ctx);
  });
  miniStars.forEach((star, idx) => {
    // Remove the Mini Star if its time to live becomes < 0
    if (star.timeToLive <= 0) {
      miniStars.splice(idx, 1);
    }
    star.update(ctx);
  });
}

Init();
Animate();