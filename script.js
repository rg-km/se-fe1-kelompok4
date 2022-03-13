const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
// Move Interval
let MOVE_INTERVAL;
// Snake Life
let snakeLife = 3;
// Audio Game Over
let audioGameOver = new Audio("assets/game-over.mp3");
// Audio Level Up
let audioLevelUp = new Audio("assets/up-level.wav");

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
  };
}
let snake1 = initSnake("#48BF53");

let apple = {
  color: "red",
  position: initPosition(),
};

// \Apple 2
let apple2 = {
  color: "red",
  position: initPosition(),
};

// Heart
let heart = {
  color: "red",
  position: initPosition(),
};

// Draw Snake
function drawCell(ctx, x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(
    x * CELL_SIZE + 10,
    y * CELL_SIZE + 10,
    CELL_SIZE / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

// draw obstacle
function drawObstacle(x, y, w, h, color) {
  let snakeCanvas = document.getElementById("snakeBoard");
  let ctx = snakeCanvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake1.color) {
    scoreCanvas = document.getElementById("score1Board");
  }
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = "#000";
  scoreCtx.fillText(snake.score, 20, scoreCanvas.scrollHeight / 2);

  // Leveling of snake games
  if (snake.score < 5) {
    document.getElementById("level").value = "1";
    MOVE_INTERVAL = 160;
    document.getElementById("speed").value = MOVE_INTERVAL;
  } else if (snake.score < 10) {
    document.getElementById("level").value = "2";
    MOVE_INTERVAL = 140;
    document.getElementById("speed").value = MOVE_INTERVAL;
    drawObstacle(50, 250, 400, 10, "#BD0036");
  } else if (snake.score < 15) {
    document.getElementById("level").value = "3";
    MOVE_INTERVAL = 120;
    document.getElementById("speed").value = MOVE_INTERVAL;
    drawObstacle(50, 200, 400, 10, "#BD0036");
    drawObstacle(50, 300, 400, 10, "#BD0036");
  } else if (snake.score < 20) {
    document.getElementById("level").value = "4";
    MOVE_INTERVAL = 100;
    document.getElementById("speed").value = MOVE_INTERVAL;
    drawObstacle(50, 150, 400, 10, "#BD0036");
    drawObstacle(50, 250, 400, 10, "#BD0036");
    drawObstacle(50, 350, 400, 10, "#BD0036");
  } else if (snake.score >= 20) {
    document.getElementById("level").value = "5";
    MOVE_INTERVAL = 80;
    document.getElementById("speed").value = MOVE_INTERVAL;
    drawObstacle(100, 50, 10, 400, "#BD0036");
    drawObstacle(400, 50, 10, 400, "#BD0036");
  }
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    // Initialize apple
    let apelImg = document.getElementById("apple");
    let heartImg = document.getElementById("heart");
    let prima = true;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
    for (let i = 1; i < snake1.body.length; i++) {
      drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
    }

    // Show Apple
    ctx.drawImage(
      apelImg,
      apple.position.x * CELL_SIZE,
      apple.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    ctx.drawImage(
      apelImg,
      apple2.position.x * CELL_SIZE,
      apple2.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Show Heart
    if (snake1.score > 1) {
      for (let i = 2; i < snake1.score; i++) {
        if (snake1.score % i == 0) {
          prima = false;
          break;
        }
      }
      if (prima) {
        ctx.drawImage(
          heartImg,
          heart.position.x * CELL_SIZE,
          heart.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    // Show snake's score
    drawScore(snake1);

    // Show Heart in Left Corner
    for (let i = 0; i < snakeLife; i++) {
      ctx.drawImage(heartImg, 25 * i + 10, 10, CELL_SIZE, CELL_SIZE);
    }
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function eat(snake, apple, apple2, heart) {
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
  // function eat apple2
  if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
    apple2.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
  // Adding heart when snake eat it
  if (snake.head.x == heart.position.x && snake.head.y == heart.position.y) {
    heart.position = initPosition();
    snakeLife++;
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple, apple2, heart);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple, apple2, heart);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple, apple2, heart);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple, apple2, heart);
}

function checkCollision(snakes, obstacles) {
  let isCollide = false;
  //this
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          isCollide = true;
        }
      }
    }
  }
  if (isCollide) {
    audioGameOver.play();
    alert("Game over");
    snake1 = initSnake("#F6D55C");
  }
  return isCollide;
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();
