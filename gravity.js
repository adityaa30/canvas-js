const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;

const GRAVITY = 1;
const FRICTION = 0.9;

const mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', (event) => {
    myCanvas.width = innerWidth;
    myCanvas.height = innerHeight;
    Init();
});

window.addEventListener('click', (event) => {
    Init();
});

class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = randomColor();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.closePath();
    }

    update(ctx) {
        if (this.y + this.radius + this.dy >= myCanvas.height) {
            this.dy = -this.dy * FRICTION;
        } else {
            this.dy += GRAVITY;
        }

        if (this.x + this.radius >= myCanvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }
}

const ballArray = [];
function Init() {
    ballArray.splice(0, ballArray.length);
    for (let i = 0; i < 400; ++i) {
        const radius = randomNumber(10, 30);
        ballArray.push(new Ball(
            randomNumber(radius, myCanvas.width - radius),
            randomNumber(radius, myCanvas.height - radius),
            randomNumber(-4, 10),
            randomNumber(-4, 12),
            radius
        ));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ballArray.forEach((ball, idx) => ball.update(ctx));
}

Init();
animate();