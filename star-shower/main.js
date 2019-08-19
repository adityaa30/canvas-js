const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

addEventListener('resize', Init);

class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: 3,
    };
    this.gravity = {x: 0, y: 1};

    this.friction = 0.8;
    this.dradius = 3; // Change in radius
  }

  draw(ctx) {
    ctx.save(); // Save the current status of context
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = '#e3eaef';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
    ctx.restore(); // Restore the previously stored state for context
  }

  update(ctx) {
    this.draw(ctx);

    // When ball hits bottom/top of the screen
    if (this.y + this.radius + this.velocity.y > myCanvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      this.velocity.y += this.gravity.y;
    }

    // Hits side of screen
    if (this.x + this.radius + this.velocity.x > myCanvas.width || this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x * this.friction;
      this.shatter();
    }

    this.y += this.velocity.y;
    this.x += this.velocity.x;
  }

  shatter() {
    this.radius = Math.max(this.radius - this.dradius, 0);
    for (let i = 0; i < 8; ++i) {
      miniStars.push(new MiniStar(this.x, this.y, 2));
    }
  }
}

class MiniStar extends Star {
  constructor(x, y, radius) {
    super(x, y, radius, 'rgba(227, 234, 239, 1)');
    this.velocity = {
      x: randomNumber(-5, 5),
      y: randomNumber(-15, 15),
    };
    this.gravity = {x: 0, y: 0.1};
    this.timeToLive = 150; // Number of frames to live
    this.opacity = 1; // Decreases with timeToLive
  }

  update(ctx) {
    this.draw(ctx);

    // When ball hits bottom/top of the screen
    if (this.y + this.radius + this.velocity.y > myCanvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction;
    } else {
      this.velocity.y += this.gravity.y;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.timeToLive -= 1;
    this.opacity -= 1 / this.timeToLive;
    this.color = `rgba(227, 234, 239, ${this.opacity})`;
  }

}

function createMountainRange(ctx, mountainAmount, height, color) {
  const mountainSpacing = 325;
  for (let i = 0; i < mountainAmount; ++i) {
    const mountainWidth = myCanvas.width / mountainAmount;
    ctx.beginPath();
    ctx.moveTo(i * mountainWidth, myCanvas.height); // Bottom left point
    ctx.lineTo(i * mountainWidth + mountainWidth + mountainSpacing, myCanvas.height); // Bottom right point
    ctx.lineTo(i * mountainWidth + mountainWidth / 2, myCanvas.height - height); // Center top point
    ctx.lineTo(i * mountainWidth - mountainSpacing, myCanvas.height); // Bottom left point
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

const backgroundGradient = ctx.createLinearGradient(0, 0, 0, myCanvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f587b');

let stars = [];
let miniStars = [];
let backgroundStars = [];
let ticker = 0;
let randomTicker = 75;
let groundHeight = 100;
// Create a new star
function newStar() {
  const radius = 12;
  const x = Math.max(radius, Math.random() * myCanvas.width - radius);
  return (new Star(x, -100, radius, 'white'));
}

function Init() {
  // Initialize the canvas size
  myCanvas.width = innerWidth;
  myCanvas.height = innerHeight;

  // Create multiple start objects
  stars = [];
  miniStars = [];
  backgroundStars = [];
  ticker = 0; // Keep track of number of frames (time)
  randomTicker = 75;
  groundHeight = 100;
  for (let i = 0; i < 1; ++i) {
    stars.push(newStar());
  }
  for (let i = 0; i < 150; ++i) {
    const radius = Math.random() * 3;
    const x = Math.random() * myCanvas.width;
    const y = Math.random() * myCanvas.height;
    backgroundStars.push(new Star(x, y, radius, 'white'));
  }
}


function Animate() {
  requestAnimationFrame(Animate);

  // Clear the canvas
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  // Background star position need to be static
  backgroundStars.forEach(star => star.draw(ctx));

  createMountainRange(ctx, 1, myCanvas.height - 50, '#384551');
  createMountainRange(ctx, 2, myCanvas.height - 100, '#2b3843');
  createMountainRange(ctx, 3, myCanvas.height - 300, '#26333e');
  ctx.fillStyle = '#182028';
  ctx.fillRect(0, myCanvas.height - groundHeight, myCanvas.width, groundHeight);
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

  ticker++;
  // Randomly generate a star
  if (ticker % randomTicker === 0) {
    for (let i = 0; i < 1; ++i) {
      stars.push(newStar());
    }
    randomTicker = randomNumber(75, 200);
  }

}

Init();
Animate();