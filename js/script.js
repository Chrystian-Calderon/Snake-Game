import { Snake } from './snake.js';
import { Fruit } from './fruit.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const boxScore = document.getElementById("score");
let fruit = new Fruit(canvas.width, canvas.height);
let snake = new Snake(canvas.width, canvas.height);
let isGameOver = false;
let isPaused = false;
let timeout;
let score = 0;
boxScore.innerHTML = score;

window.addEventListener('keydown', (e) => snake.handleKeyDown(e));

function updateScore() {
    score += 10;
    boxScore.innerHTML = score;
}

function update() {
    if (snake.body[0].x < fruit.x) snake.handleKeyDown({key: "ArrowRight"});
    else if (snake.body[0].x > fruit.x) snake.handleKeyDown({key: "ArrowLeft"});
    else if (snake.body[0].y < fruit.y) snake.handleKeyDown({key: "ArrowDown"});
    else if (snake.body[0].y > fruit.y) snake.handleKeyDown({key: "ArrowUp"});
    fruit.drawFruit(ctx);
    if (snake.move(fruit, updateScore)) {
        clearTimeout(timeout);
        alert('Game Over!');
        isGameOver = true;
    };
    snake.drawSnake(ctx);
}

export function loop() {
    if (timeout) {
        clearTimeout(timeout);
        fruit = new Fruit(canvas.width, canvas.height);
        snake = new Snake(canvas.width, canvas.height);
    }

    function game() {
        if (isGameOver) return;
        if (!isPaused) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            update();
        }
        timeout = setTimeout(() => requestAnimationFrame(game), 500);
    }

    game();
}

document.getElementById("pause").addEventListener("click", () => {isPaused = true});
document.getElementById("resume").addEventListener("click", () => {isPaused = false});