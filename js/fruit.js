export class Fruit {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.gridSize = 20;
        this.x = Math.floor(Math.random() * width / this.gridSize) * this.gridSize;
        this.y = Math.floor(Math.random() * height / this.gridSize) * this.gridSize;
        this.image = new Image();
        this.image.src = '../sprites/apple.png';
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        }
    }

    randomPosition(snakeBody) {
        let isRepeatRandomPosition = false;
        let x, y;
        // console.log('1', this.x, this.y);
        do {
            x = Math.floor(Math.random() * this.width / this.gridSize) * this.gridSize;
            y = Math.floor(Math.random() * this.height / this.gridSize) * this.gridSize;
            // console.table(JSON.parse(JSON.stringify(snakeBody)));
            // console.log('2', x, y);
            
            isRepeatRandomPosition = snakeBody.some(part => this.x === part.x && this.y === part.y);
        } while (isRepeatRandomPosition);
        // console.log('end');
        this.x = x;
        this.y = y;
    }

    drawFruit(ctx) {
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.gridSize, this.gridSize)
        }
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.gridSize, this.gridSize);
    }
}