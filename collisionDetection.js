const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;

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


class Circle {
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


        this.draw(ctx);
    }

    changeColor() {
        this.color = randomColor();
    }
}

let circle1, circle2;
function Init() {
    circle1 = new Circle(300, 300, 0, 0, 100);
    circle2 = new Circle(100, 100, 0, 0, 20);

}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // change color of circle1 as the both circle touches
    if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < (circle1.radius + circle2.radius)) {
        circle1.changeColor();
    }
    circle1.update(ctx);

    // Move circle 2 as the mouse moves
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update(ctx);

}


Init();
animate();