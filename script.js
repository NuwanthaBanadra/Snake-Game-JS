const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400;
let score = 0;


let snake = [{ x: 200, y: 200 }];
let food = generateFood();

let direction = null;

document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw snake
    snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? 'lime' : '#0f0';
        ctx.fillRect(part.x, part.y, box, box);
    });

    //Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    //Draw snake
    let head = { ...snake[0] };
    if (direction === 'UP') head.y -= box;
    else if (direction === 'DOWN') head.y += box;
    else if (direction === 'LEFT') head.x -= box;
    else if (direction === 'RIGHT') head.x += box;
    else return;

    //game over
    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert('Game Over! Final score: ' + score);
        snake = [{ x: 200, y: 200 }];
        direction = null;
        food = generateFood();
        score = 0;
        document.getElementById('score').textContent = 'Score: 0';
        return;

    }

    snake.unshift(head);

    //Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
        food = generateFood();
    } else {
        snake.pop();
    }

}

setInterval(draw, 100);