class Snake {
    constructor(width, height) {
        this.x = width / 2;
        this.y = height / 2;
        this.gridSize = 20;
        this.width = width;
        this.height = height;
        this.direction = 'right';
    }

    handleKeyDown(e) {
        const keyMap = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right"
        };
        if (keyMap[e.key]) this.direction = keyMap[e.key];
    }

    move() {
        switch (this.direction) {
            case 'up': this.y -= this.gridSize; break;
            case 'down': this.y += this.gridSize; break;
            case 'left': this.x -= this.gridSize; break;
            case 'right': this.x += this.gridSize; break;
        }

        this.x = Math.max(0, Math.min(this.width - this.gridSize, this.x));
        this.y = Math.max(0, Math.min(this.height - this.gridSize, this.y));
    }

    drawSnake(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.gridSize, this.gridSize);
    }
}