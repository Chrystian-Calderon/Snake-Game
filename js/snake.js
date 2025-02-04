class Snake {
    constructor(x, y, gridSize, ctx) {
        this.speed = 20;
        this.x = x;
        this.y = y;
        this.gridSize = gridSize;
        this.keys = {};
        this.direction = 'right';
        this.ctx = ctx;
    }

    handleKeyDown(e) {this.keys[e.key] = true;}

    handleKeyUp(e) {delete this.keys[e.key];}
    
    moving() {
        if (this.keys["ArrowUp"]) this.y -= this.speed;
        if (this.keys["ArrowDown"]) this.y += this.speed;
        if (this.keys["ArrowLeft"]) this.x -= this.speed;
        if (this.keys["ArrowRight"]) this.x += this.speed;
    }

    drawSnake() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.x, this.y, this.gridSize, this.gridSize);
    }
}