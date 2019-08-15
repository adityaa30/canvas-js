const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined,
}

const colorScheme = [
    '#00bdff',
    '#4d39ce',
    '#088eff'
];

function _randomColor() {
    return colorScheme[randomNumber(0, colorArray.length - 1)];
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', Init);

window.addEventListener('click', () => {
    particles.forEach(particle => particle.distanceFromCenter += 5);
});

class Particle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lastMouse = {x : x, y: y};

        this.distanceFromCenter = randomNumber(100, 200);
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.color = _randomColor();
    }

    draw(ctx, lastPoint) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(ctx) {
        const lastPoint = { x: this.x, y: this.y };

        // Move the points over-time
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        // Circular Motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y =  this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw(ctx, lastPoint);
    }
}


let particles = [];
function Init() {
    myCanvas.width = innerWidth;
    myCanvas.height = innerHeight;

    particles = [];
    for (let i = 0; i < 100; ++i) {
        particles.push(new Particle(
            myCanvas.width / 2,
            myCanvas.height / 2,
            (Math.random() * 2) + 1));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    particles.forEach(particle => particle.update(ctx));
}

Init();
animate();
