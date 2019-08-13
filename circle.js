
const MAX_RADIUS = 40;

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.fillColor = randomColor();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    }

    update(ctx, mouse) {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) < 50
            && Math.abs(mouse.y - this.y) < 50) {
            // Increase the radius of the circles near the mouse
            if (this.radius < MAX_RADIUS) this.radius += 1;
        } else if (this.radius > this.minRadius) {
            // Decrease the radius of the circles far from the mouse
            this.radius -= 1;
        }

        this.draw(ctx);
    }
}

const mouse = {
    x: undefined,
    y: undefined,
}


window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', (event) => {
    myCanvas.width = innerWidth;
    myCanvas.height = innerHeight;
    Init();
});

const circleArr = [];

function Init() {
    circleArr.length = 0;
    for (let i = 0; i < 750; ++i) {
        const radius = randomNumber(1, 10);
        const x = randomNumber(radius, innerWidth - radius);
        const y = randomNumber(radius, innerHeight - radius);
        const dx = randomNumber(-4, 4);
        const dy = randomNumber(-4, 4);
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArr.length; ++i) {
        circleArr[i].update(ctx, mouse);
    }
}


const myCanvas = document.getElementById('my-canvas');
myCanvas.width = innerWidth;
myCanvas.height = innerHeight;
const ctx = myCanvas.getContext('2d');


Init();
animate();