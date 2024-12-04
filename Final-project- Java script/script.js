// Snake Game - script.js

// Topics: DOM Manipulation, Events, Classes, Algorithms, Higher-Order Functions, Debugging

// DOM Elements
const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerNameDisplay = document.getElementById("player-name");
const livesDisplay = document.getElementById("lives");
const pointsDisplay = document.getElementById("points");

// Game State
let gameInterval;
let playerName;
let snake;
let foodItems = [];
let stones = [];
let score = 0;
let lives = 3;

// Constants
const gridSize = 20; // Size of each cell in the grid
const canvasWidth = canvas.width / gridSize;
const canvasHeight = canvas.height / gridSize;
const initialSnakeSpeed = 300; // In milliseconds

// Helper Functions
function randomGridPosition() {
  // Returns a random position within the canvas grid
  return {
    x: Math.floor(Math.random() * canvasWidth),
    y: Math.floor(Math.random() * canvasHeight),
  };
}

function updateScore(points) {
  // Higher-order function: Updates score
  score += points;
  pointsDisplay.textContent = `Points: ${score}`;
  if (score >= 100) {
    endGame("You Win!");
  }
}

function endGame(message) {
  clearInterval(gameInterval);
  alert(message);
  resetGame();
}

function resetGame() {
  lives = 3;
  score = 0;
  pointsDisplay.textContent = "Points: 0";
  livesDisplay.textContent = "Lives: 3";
  foodItems = [];
  stones = [];
}

// Game Classes
class Snake {
  constructor() {
    this.body = [{ x: 5, y: 5 }];
    this.direction = { x: 1, y: 0 }; // Moving right
    this.speed = initialSnakeSpeed;
  }

  move() {
    const head = { ...this.body[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    // Handle wall collisions (wrap-around behavior)
    head.x = (head.x + canvasWidth) % canvasWidth;
    head.y = (head.y + canvasHeight) % canvasHeight;

    // Collision with self
    if (
      this.body.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      endGame("Game Over: You hit yourself!");
    }

    // Add new head and remove tail unless growing
    this.body.unshift(head);
    if (!this.growing) this.body.pop();
    this.growing = false;
  }

  grow() {
    this.growing = true;
  }

  draw() {
    // Red hover effect after eating food
    ctx.fillStyle = this.recentFood ? "red" : "lime";
    this.body.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize,
        gridSize
      );
    });

    if (this.recentFood) {
      // Reset hover effect after a delay
      setTimeout(() => (this.recentFood = false), 3000);
    }
  }

  setDirection(newDirection) {
    // Logical conditions and block scope
    if (
      (newDirection.x !== 0 && this.direction.x === 0) ||
      (newDirection.y !== 0 && this.direction.y === 0)
    ) {
      this.direction = newDirection;
    }
  }
}

class Food {
  constructor() {
    const { x, y } = randomGridPosition();
    this.position = { x, y };
    this.color = ["red", "blue", "yellow"][Math.floor(Math.random() * 3)];
    this.size = Math.random() < 0.5 ? gridSize : gridSize * 1.5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x * gridSize,
      this.position.y * gridSize,
      this.size,
      this.size
    );
  }
}

class Stone {
  constructor() {
    const { x, y } = randomGridPosition();
    this.position = { x, y };
  }

  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      this.position.x * gridSize,
      this.position.y * gridSize,
      gridSize,
      gridSize
    );
  }
}

// Game Logic
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move and draw the snake
  snake.move();
  snake.draw();

  // Draw food
  foodItems.forEach((food) => food.draw());

  // Check food collision
  for (let i = 0; i < foodItems.length; i++) {
    const food = foodItems[i];
    const ateFood =
      snake.body[0].x === food.position.x &&
      snake.body[0].y === food.position.y;
    if (ateFood) {
      snake.grow();
      snake.recentFood = true; // Activate red hover effect
      updateScore(10);

      // Replace the eaten food with a new one
      foodItems[i] = new Food();
    }
  }

  // Draw stones
  stones.forEach((stone) => stone.draw());

  // Check collision with stones
  stones.forEach((stone) => {
    if (
      snake.body[0].x === stone.position.x &&
      snake.body[0].y === stone.position.y
    ) {
      // Lose a life if the snake collides with a stone
      lives--;
      livesDisplay.textContent = `Lives: ${lives}`;
      if (lives === 0) {
        endGame("Game Over: You hit a stone!");
      }
    }
  });
}

// Game Initialization and Event Listeners
function startGame() {
  resetGame();
  snake = new Snake();

  // Ensure there is at least one food item
  foodItems.push(new Food());

  // Add some stones to the game (e.g., 5 stones)
  for (let i = 0; i < 5; i++) {
    stones.push(new Stone());
  }

  gameInterval = setInterval(gameLoop, initialSnakeSpeed);
}

startBtn.addEventListener("click", () => {
  playerName = prompt("Enter your name:");
  playerNameDisplay.textContent = `Player: ${playerName}`;
  startGame();
});

document.addEventListener("keydown", (event) => {
  const direction = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  }[event.key];
  if (direction) snake.setDirection(direction);
});
