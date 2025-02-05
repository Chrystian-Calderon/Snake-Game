export class Fruit {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.gridSize = 20;
        this.x = Math.floor(Math.random() * width / this.gridSize) * this.gridSize;
        this.y = Math.floor(Math.random() * height / this.gridSize) * this.gridSize;
    }

    randomPosition() {
        this.x = Math.floor(Math.random() * this.width / this.gridSize) * this.gridSize;
        this.y = Math.floor(Math.random() * this.height / this.gridSize) * this.gridSize;
    }

    drawFruit(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.gridSize, this.gridSize);
    }
}