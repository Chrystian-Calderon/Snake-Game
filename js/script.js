import { Snake } from './snake.js';
import { Fruit } from './fruit.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const boxScore = document.getElementById("score");
let fruit = new Fruit(canvas.width, canvas.height, ctx);
let snake = new Snake(canvas.width, canvas.height);
let isGameOver = false;
let isPaused = false;
let timeout;
let score = 0;
let highScore = 40;
boxScore.innerHTML = score;

highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : highScore;
document.getElementById("high-score").innerText = highScore;

document.querySelector(".controls #resume").style.display = "none";
document.querySelector(".controls #pause").style.display = "none";
document.querySelector(".controls #restart").style.display = "none";
window.addEventListener('keydown', (e) => snake.handleKeyDown(e));

function updateScore() {
    score += 10;
    boxScore.innerHTML = score;
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("high-score").innerText = highScore;
    }
}

function update() {
    // if (snake.body[0].x < fruit.x) snake.handleKeyDown({key: "ArrowRight"});
    // else if (snake.body[0].x > fruit.x) snake.handleKeyDown({key: "ArrowLeft"});
    // else if (snake.body[0].y < fruit.y) snake.handleKeyDown({key: "ArrowDown"});
    // else if (snake.body[0].y > fruit.y) snake.handleKeyDown({key: "ArrowUp"});
    fruit.drawFruit(ctx);
    if (snake.move(fruit, updateScore)) {
        clearTimeout(timeout);
        updateHighScore();
        document.getElementById("message").style.display = "flex";
        document.getElementById("message-title").innerText = "Juego Terminado";
        document.getElementById("message-title").style.color = "red";
        document.getElementById("result-score").innerText = `Puntuación: ${score}`;
        document.getElementById("message-text").innerText = "Presiona el botón \"Reiniciar\" para volver a jugar.";
        document.querySelector("#message #start").style.display = "none";
        document.querySelector("#message #resume").style.display = "none";
        document.getElementById("pause").style.display = "none";
        isGameOver = true;
    };
    snake.draw(ctx);
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

document.getElementById("restart").addEventListener("click", () => {
    isPaused = false;
    isGameOver = false;
    score = 0;
    document.getElementById("message").style.display = "none";
    document.getElementById("pause").style.display = "block";
    document.querySelector("#message #resume").style.display = "none";
    document.querySelector(".controls #resume").style.display = "none";
    boxScore.innerHTML = score;
    loop();
});

document.getElementById("pause").addEventListener("click", () => {
    document.getElementById("message").style.display = "flex";
    document.getElementById("message-title").innerText = "Juego Pausado";
    document.getElementById("message-title").style.color = "white";
    document.getElementById("result-score").style.display = "none";
    document.getElementById("message-text").innerText = "Presiona el botón \"Reanudar\" para continuar jugando.";
    document.querySelector("#message #start").style.display = "none";
    document.querySelector("#message #resume").style.display = "block";
    document.querySelector(".controls #resume").style.display = "block";
    document.getElementById("pause").style.display = "none";
    isPaused = true;
});

const startButtons = document.querySelectorAll("#start");
const resumeButtons = document.querySelectorAll("#resume");

startButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("message").style.display = "none";
        document.querySelector("#message #start").style.display = "none";
        document.querySelector(".controls #start").style.display = "none";
        document.getElementById("pause").style.display = "block";
        document.getElementById("restart").style.display = "block";
        isPaused = false;
        isGameOver = false;
        score = 0;
        boxScore.innerHTML = score;
        loop();
    });
});

resumeButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("message").style.display = "none";
        document.querySelector(".controls #resume").style.display = "none";
        document.getElementById("pause").style.display = "block";
        document.querySelector("#message #resume").style.display = "none";
        document.querySelector(".controls #resume").style.display = "none";
        isPaused = false;
    });
});