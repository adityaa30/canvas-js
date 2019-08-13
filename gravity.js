const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');

function animate() {
    requestAnimationFrame(animate);
}