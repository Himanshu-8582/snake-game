// ✅ game.test.js
// Basic example tests for Snake Game

describe("Snake Game Basic Tests", () => {

    

  test("Canvas should exist in the DOM", () => {
    document.body.innerHTML = `<canvas id="gameCanvas"></canvas>`;
    const canvas = document.getElementById("gameCanvas");
    expect(canvas).not.toBeNull();
  });

  test("Initial snake should have 3 segments", () => {
    const snake = [{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }];
    expect(snake.length).toBe(3);
  });

    
    
  test("Random food position should not overlap with snake", () => {
    const numberOfCells = 25;
    const snake = [{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }];

    function generateRandomPos() {
      let pos;
      do {
        pos = { 
          x: Math.floor(Math.random() * numberOfCells),
          y: Math.floor(Math.random() * numberOfCells)
        };
      } while (snake.some(segment => segment.x === pos.x && segment.y === pos.y));
      return pos;
      }

    const food = generateRandomPos();
    const overlap = snake.some(s => s.x === food.x && s.y === food.y);
    expect(overlap).toBe(false);
  });
    
    
    
  test("Snake should grow when it eats food", () => {
    let snake = [{ x: 1, y: 1 }];
    let food = { x: 2, y: 1 };
    let score = 0;
    const direction = { x: 1, y: 0 };

    function update() {
      const head = { ...snake[0] };
      head.x += direction.x;
      head.y += direction.y;
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: 3, y: 1 }; // move food elsewhere
      } else {
        snake.pop();
      }
    }

    update(); // snake moves and eats
    expect(snake.length).toBe(2);
    expect(score).toBe(1);
  });

    
    
  test("Game should end if snake hits the wall", () => {
    const numberOfCells = 25;
    let snake = [{ x: 24, y: 10 }];
    const direction = { x: 1, y: 0 };

    function checkCollision(head) {
      return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= numberOfCells ||
        head.y >= numberOfCells
      );
    }

    const head = { ...snake[0], x: snake[0].x + direction.x };
    const collided = checkCollision(head);
    expect(collided).toBe(true);
  });
    
    
});
