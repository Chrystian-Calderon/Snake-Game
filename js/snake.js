export class Snake {
    constructor(width, height) {
        this.x = width / 2;
        this.y = height / 2;
        this.gridSize = 20;
        this.width = width;
        this.height = height;
        this.direction = 'right';
        this.body = [{x: this.x, y: this.y}];
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

    collision() {
        if (this.x === -this.gridSize && this.direction === 'left' ||
            this.x === this.width && this.direction === 'right' ||
            this.y === -this.gridSize && this.direction === 'up' ||
            this.y === this.height && this.direction === 'down'
        ) {
            return true;
        } else {
            let head = this.body[0];
            return this.body.some((part, index) => {
                if (index >= 4 && head.x === part.x && head.y === part.y) return true;
            });
        }
        
    }

    eatApple(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
                fruit.randomPosition(this.body);
                this.body.unshift({x: this.x, y: this.y});
        }
    }

    move(fruit) {
        switch (this.direction) {
            case 'up': this.y -= this.gridSize; break;
            case 'down': this.y += this.gridSize; break;
            case 'left': this.x -= this.gridSize; break;
            case 'right': this.x += this.gridSize; break;
        }

        this.x = Math.max(-this.gridSize, Math.min(this.width, this.x));
        this.y = Math.max(-this.gridSize, Math.min(this.height, this.y));

        this.eatApple(fruit);
        
        if (!this.collision()) {
            this.body.unshift({x: this.x, y: this.y});
            this.body.pop();
        }
        return this.collision();
    }

    drawSnake(ctx) {
        ctx.fillStyle = 'green';
        this.body.forEach((part, index) => {
            ctx.fillRect(part.x, part.y, this.gridSize, this.gridSize);
        });
    }
}