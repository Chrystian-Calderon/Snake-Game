export class Snake {
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

        const oppositeDirection = {
            "up": "down",
            "down": "up",
            "left": "right",
            "right": "left"
        };

        if (keyMap[e.key] && keyMap[e.key] !== oppositeDirection[this.direction]) this.direction = keyMap[e.key];
    }

    move(fruit) {
        switch (this.direction) {
            case 'up': this.y -= this.gridSize; break;
            case 'down': this.y += this.gridSize; break;
            case 'left': this.x -= this.gridSize; break;
            case 'right': this.x += this.gridSize; break;
        }

        this.x = Math.max(0, Math.min(this.width - this.gridSize, this.x));
        this.y = Math.max(0, Math.min(this.height - this.gridSize, this.y));

        if ((this.x === fruit.x + this.gridSize && 
            this.y === fruit.y + this.gridSize) ||
            (this.x === (fruit.x + fruit.gridSize) - this.gridSize &&
            this.y === (fruit.y + fruit.gridSize) - this.gridSize)) {
            fruit.randomPosition();
        }
    }

    drawSnake(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.gridSize, this.gridSize);
    }
}