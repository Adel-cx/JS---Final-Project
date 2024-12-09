Snake Game

🎮 Project Description

The Snake Game is a modern browser-based implementation of the classic arcade game. The goal is to control a snake, collect food to grow, avoid obstacles (stones), and achieve 100 points to win. The game includes engaging mechanics such as dynamic food regeneration, a red hover effect after eating, and smooth wall wrapping for continuous gameplay.

---

🚀 Features

Dynamic Food Regeneration: New food appears after the snake eats the existing one.

Wall Wrapping: The snake reappears on the opposite side of the canvas upon crossing boundaries.

Obstacle Challenge: Stones appear randomly, reducing lives if the snake collides with them.

Engaging Visual Feedback: The snake glows red briefly after eating food.

Winning Goal: Players aim for 100 points to win.
Dark Theme Design: Sleek and modern visuals for an enjoyable gaming experience.

---

🛠️ Installation Instructions

Clone the Repository:

// git clone (https://github.com/Adel-cx/JS-Final-Project.git)

Navigate to the Project Folder
// cd snake-game

Run the Game
Open index.html in your browser to start playing!

---

🎯 Quick Guide to Use

1. Start the Game:

   - Open the game in your browser.
   - Enter your name in the prompt and click "Start Game."

2. Controls:

- Use arrow keys to guide the snake:
  - Arrow Up: Move Up.
  - Arrow Down: Move Down.
  - Arrow Left: Move Left.
  - Arrow Right: Move Right.

3. Game Objective:

   - Collect Food: Grow and earn points.
   - Avoid Stones: Colliding with stones reduces lives.
   - Win the Game: Reach 100 points to win.

---

🧠 Core Features Explained

1. Dynamic Food Regeneration
   📜 Code:



// Dynamic food regeneration when food is eaten
for (let i = 0; i < foodItems.length; i++) {
const food = foodItems[i];
const ateFood =
snake.body[0].x === food.position.x && snake.body[0].y === food.position.y;
if (ateFood) {
snake.grow(); // Snake grows in size
snake.recentFood = true; // Activates red hover effect
updateScore(10); // Adds points
foodItems[i] = new Food(); // Replace eaten food with new food
}
}



💡 How It Works:

- Detect Food Collision: Checks if the snake's head matches the position of any food.

- Snake Growth: Calls snake.grow() to increase the snake's size.

- Visual Feedback: Activates a red hover effect for a brief time.

- Food Replacement: Replaces the eaten food with a new one at a random position.

🛠️ Challenges:

- Ensuring new food does not overlap with the snake or stones.

- Handling multiple food items dynamically.

🎁 Added Value:

Players always have new food to target, keeping the game engaging and fun.

---

2. Smooth Wall Wrapping

📜 Code:

/\*
// Movement logic with wall wrapping
move() {
const head = { ...this.body[0] };
head.x += this.direction.x;
head.y += this.direction.y;

    // Wrap-around behavior when hitting canvas edges
    head.x = (head.x + canvasWidth) % canvasWidth;
    head.y = (head.y + canvasHeight) % canvasHeight;

    // Collision with self
    if (this.body.some((segment) => segment.x === head.x && segment.y === head.y)) {
        endGame("Game Over: You hit yourself!");
    }

    // Add new head and remove tail unless growing
    this.body.unshift(head);
    if (!this.growing) this.body.pop();
    this.growing = false;

}

\*/

💡 How It Works:

- Wall Wrapping: Adjusts the snake’s head position using modulo (%) to wrap around canvas edges.

- Collision Detection: Ends the game if the snake’s head collides with its body.

- Snake Growth: Retains the tail when this.growing is true, increasing its length.

🛠️ Challenges:

- Implementing smooth wrapping behavior without disrupting gameplay.

🎁 Added Value:
Players can focus on strategic gameplay without worrying about abrupt wall collisions.

---

🔑 Keywords in the Code

1. Dynamic Food:

- foodItems[i] = new Food() ensures new food is added when the snake eats existing food.

2. Wall Wrapping:

- head.x = (head.x + canvasWidth) % canvasWidth enables the snake to reappear on the opposite side of the canvas.

3. Visual Feedback:
   snake.recentFood = true triggers the red hover effect.

---

👾 Challenges Faced

1. Dynamic Food Placement:

- Ensuring food doesn’t overlap with the snake or stones.

2. Collision Detection:

- Avoiding false positives when checking for self-collision.

3. Smooth Movement:

- Handling wrapping and responsiveness without breaking the snake’s path.
