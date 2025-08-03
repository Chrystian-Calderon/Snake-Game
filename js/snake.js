export class Snake {
    constructor(width, height) {
        this.x = width / 2;
        this.y = height / 2;
        this.gridSize = 20;
        this.width = width;
        this.height = height;
        this._direction = 'right';
        this.body = [{ x: this.x, y: this.y }, { x: this.x - this.gridSize, y: this.y }];
        this.positionCordsCurved = [];
        this.image = new Image();
        this.image.src = './sprites/snake.png';
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        }
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

        const newDirection = keyMap[e.key];
        if (newDirection && newDirection !== oppositeDirection[this.getDirection()]) {
            this.setDirection(newDirection);
        }
    }

    getDirection() {
        return this._direction;
    }

    setDirection(direction) {
        this.addPositionCordsCurved(this._direction, direction);
        this._direction = direction;
    }

    addPositionCordsCurved(directionAfter, directionBefore) {
        if (directionAfter === 'up' && directionBefore === 'right' || directionAfter === 'left' && directionBefore === 'down') {
            this.positionCordsCurved.push({ curved: 'curvedUL', x: this.x, y: this.y });
        }
        if (directionAfter === 'up' && directionBefore === 'left' || directionAfter === 'right' && directionBefore === 'down') {
            this.positionCordsCurved.push({ curved: 'curvedUR', x: this.x, y: this.y });
        }
        if (directionAfter === 'down' && directionBefore === 'right' || directionAfter === 'left' && directionBefore === 'up') {
            this.positionCordsCurved.push({ curved: 'curvedDL', x: this.x, y: this.y });
        }
        if (directionAfter === 'down' && directionBefore === 'left' || directionAfter === 'right' && directionBefore === 'up') {
            this.positionCordsCurved.push({ curved: 'curvedDR', x: this.x, y: this.y });
        }
    }

    checkPositionCordsCurved() {
        this.positionCordsCurved = this.positionCordsCurved.filter(curved => {
            return this.body.some(part => part.x === curved.x && part.y === curved.y);
        });
    }

    spriteCords(type) {
        const spriteCords = {
            head: [0, 0],
            body: [84, 84],
            tail: [42, 84],
            curvedUR: [84, 0],
            curvedUL: [42, 0],
            curvedDR: [84, 42],
            curvedDL: [42, 42]
        };
        return spriteCords[type];
    }

    collision() {
        if (this.x === -this.gridSize && this.getDirection() === 'left' ||
            this.x === this.width && this.getDirection() === 'right' ||
            this.y === -this.gridSize && this.getDirection() === 'up' ||
            this.y === this.height && this.getDirection() === 'down'
        ) {
            return true;
        } else {
            let head = this.body[0];
            return this.body.some((part, index) => {
                if (index >= 4 && head.x === part.x && head.y === part.y) return true;
            });
        }

    }

    eatApple(fruit, updateScore) {
        if (this.x === fruit.x && this.y === fruit.y) {
            fruit.randomPosition(this.body, updateScore);
            this.body.unshift({ x: this.x, y: this.y });
            updateScore();
        }
    }

    move(fruit, updateScore) {
        switch (this.getDirection()) {
            case 'up': this.y -= this.gridSize; break;
            case 'down': this.y += this.gridSize; break;
            case 'left': this.x -= this.gridSize; break;
            case 'right': this.x += this.gridSize; break;
        }

        this.x = Math.max(-this.gridSize, Math.min(this.width, this.x));
        this.y = Math.max(-this.gridSize, Math.min(this.height, this.y));

        this.eatApple(fruit, updateScore);

        if (!this.collision()) {
            this.body.unshift({ x: this.x, y: this.y });
            this.body.pop();
        }
        return this.collision();
    }

    drawSnake(ctx, part, type = 'body', angle = 0, reverse = false) {
        ctx.save();
        ctx.translate(part.x, part.y);
        if (angle !== 0) ctx.rotate(angle * Math.PI / 180);
        if (reverse) ctx.scale(1, -1);

        let [sx, sy] = this.spriteCords(type);
        ctx.drawImage(this.image, sx, sy, 42, 42, 0, 0, this.gridSize, this.gridSize);
        ctx.restore();
    }

    draw(ctx) {
        this.checkPositionCordsCurved();
        console.table(this.positionCordsCurved);
        for (let index = 0; index < this.body.length; index++) {
            let part = this.body[index];
            let drawCurved = false;
            if (this.imageLoaded) {
                if (index === 0) {
                    if (this.getDirection() === 'up') this.drawSnake(ctx, { x: part.x, y: part.y + this.gridSize }, 'head', 0, true);
                    if (this.getDirection() === 'down') this.drawSnake(ctx, part, 'head')
                    if (this.getDirection() === 'left') this.drawSnake(ctx, { x: part.x + this.gridSize, y: part.y }, 'head', 90);
                    if (this.getDirection() === 'right') this.drawSnake(ctx, part, 'head', 90, true);
                } else {
                    if (this.body.length > 2 && index < this.body.length - 1) {
                        for (const curved of this.positionCordsCurved) {
                            if (curved.x === part.x && curved.y === part.y) {
                                this.drawSnake(ctx, part, curved.curved);
                                drawCurved = true;
                                break;
                            }
                        }
                    }
                    if (!drawCurved) {
                        if (this.body[index - 1].y === part.y - this.gridSize) this.drawSnake(ctx, part, (index === this.body.length - 1) ? 'tail' : 'body');
                        if (this.body[index - 1].y === part.y + this.gridSize) this.drawSnake(ctx, { x: part.x, y: part.y + this.gridSize }, (index === this.body.length - 1) ? 'tail' : 'body', 0, true);
                        if (this.body[index - 1].x === part.x - this.gridSize) this.drawSnake(ctx, part, (index === this.body.length - 1) ? 'tail' : 'body', 90, true);
                        if (this.body[index - 1].x === part.x + this.gridSize) this.drawSnake(ctx, { x: part.x + this.gridSize, y: part.y }, (index === this.body.length - 1) ? 'tail' : 'body', 90);
                    }
                }
            }
        }
    }
}