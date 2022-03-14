const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 100;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};

let MOVE_INTERVAL = 155;
let snakeLife = 3;
let snakeLevel = 1;
let audioLevelUp = new Audio("assets/up-level.wav");
let audioGameOver = new Audio("assets/game-over.mp3");

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

function initSnake() {
  return {
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
  };
}
let snake1 = initSnake();

let apple = {
  position: initPosition(),
};

let apple2 = {
  position: initPosition(),
};

let heart = {
  position: initPosition(),
};

let obstacle1 = {
  position: {
    x: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    y: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  },
  color: "#C70039",
};

let obstacle2 = {
  position: {
    x: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    y: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  },
  color: "#C70039",
};

let obstacle3 = {
  position: {
    x: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    y: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  },
  color: "#C70039",
};

let obstacle4 = {
  position: {
    x: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    y: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  color: "#C70039",
};

let obstacle5 = {
  position: {
    x: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    y: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  color: "#C70039",
};

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function showPicture(ctx, img, x, y) {
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake1.color) {
    scoreCanvas = document.getElementById("score1Board");
  }
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function cekPrima(num) {
  let div = 0;
  for (let i = 1; i <= num; i++) {
    if (num % i == 0) {
      div++;
    }
  }
  if (div == 2) {
    return true;
  } else {
    return false;
  }
}

function showObstacle() {
  let snakeCanvas = document.getElementById("snakeBoard");
  let ctx = snakeCanvas.getContext("2d");
  if (snakeLevel === 2) {
    for (let i = 0; i < obstacle1.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle1.position.x[i],
        obstacle1.position.y[i],
        obstacle1.color
      );
    }
  } else if (snakeLevel === 3) {
    for (let i = 0; i < obstacle1.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle1.position.x[i],
        obstacle1.position.y[i],
        obstacle1.color
      );
    }
    for (let i = 0; i < obstacle2.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle2.position.x[i],
        obstacle2.position.y[i],
        obstacle2.color
      );
    }
  } else if (snakeLevel === 4) {
    for (let i = 0; i < obstacle1.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle1.position.x[i],
        obstacle1.position.y[i],
        obstacle1.color
      );
    }
    for (let i = 0; i < obstacle2.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle2.position.x[i],
        obstacle2.position.y[i],
        obstacle2.color
      );
    }
    for (let i = 0; i < obstacle3.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle3.position.x[i],
        obstacle3.position.y[i],
        obstacle3.color
      );
    }
  } else if (snakeLevel === 5) {
    for (let i = 0; i < obstacle4.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle4.position.x[i],
        obstacle4.position.y[i],
        obstacle4.color
      );
    }
    for (let i = 0; i < obstacle5.position.x.length; i++) {
      drawCell(
        ctx,
        obstacle5.position.x[i],
        obstacle5.position.y[i],
        obstacle5.color
      );
    }
  }
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    let appleImg = document.getElementById("apple");
    let snakeHeadImg = document.getElementById("snake-head");
    let bodySnakeImg = document.getElementById("snake-body");
    let heartImg = document.getElementById("heart");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    showPicture(ctx, snakeHeadImg, snake1.head.x, snake1.head.y);
    for (let i = 1; i < snake1.body.length; i++) {
      showPicture(ctx, bodySnakeImg, snake1.body[i].x, snake1.body[i].y);
    }

    showPicture(ctx, appleImg, apple.position.x, apple.position.y);

    showPicture(ctx, appleImg, apple2.position.x, apple2.position.y);

    if (cekPrima(snake1.score)) {
      showPicture(ctx, heartImg, heart.position.x, heart.position.y);
    }

    for (let i = 0; i < snakeLife; i++) {
      showPicture(ctx, heartImg, i * 1.4 + 0.2, 0.5);
    }
    showObstacle();

    drawScore(snake1);
    document.getElementById("level").innerHTML = "Level : " + snakeLevel;
    document.getElementById("speed").innerHTML =
      "Speed: " + MOVE_INTERVAL + " ms";
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

function cekLevel(snake) {
  if (snake.score % 5 === 0) {
    snakeLevel++;
    audioLevelUp.play();
    MOVE_INTERVAL -= 25;
  }
}

function eat(snake, apple) {
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    cekLevel(snake);
  }
}

function eatHeart(snake, heartIcon) {
  if (
    snake.head.x == heartIcon.position.x &&
    snake.head.y == heartIcon.position.y
  ) {
    heartIcon.position = initPosition();
    snake.score++;
    cekLevel(snake);
    snakeLife++;
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple);
  eat(snake, apple2);
  eatHeart(snake, heart);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple);
  eat(snake, apple2);
  eatHeart(snake, heart);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple);
  eat(snake, apple2);
  eatHeart(snake, heart);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple);
  eat(snake, apple2);
  eatHeart(snake, heart);
}

function checkCollision(snakes) {
  let isCollide = false;
  //this
  for (let k = 1; k < snakes.body.length; k++) {
    if (
      snakes.head.x == snakes.body[k].x &&
      snakes.head.y == snakes.body[k].y
    ) {
      isCollide = true;
    }
  }

  if (snakeLevel >= 2 && snakeLevel <= 4) {
    if (snakeLevel >= 2) {
      for (let i = 0; i < obstacle1.position.x.length; i++) {
        if (
          snakes.head.x == obstacle1.position.x[i] &&
          snakes.head.y == obstacle1.position.y[i]
        ) {
          isCollide = true;
        }
      }
    }
    if (snakeLevel >= 3) {
      for (let i = 0; i < obstacle2.position.x.length; i++) {
        if (
          snakes.head.x == obstacle2.position.x[i] &&
          snakes.head.y == obstacle2.position.y[i]
        ) {
          isCollide = true;
        }
      }
    }
    if (snakeLevel >= 4) {
      for (let i = 0; i < obstacle3.position.x.length; i++) {
        if (
          snakes.head.x == obstacle3.position.x[i] &&
          snakes.head.y == obstacle3.position.y[i]
        ) {
          isCollide = true;
        }
      }
    }
  } else if (snakeLevel === 5) {
    for (let i = 0; i < obstacle4.position.x.length; i++) {
      if (
        snakes.head.x == obstacle4.position.x[i] &&
        snakes.head.y == obstacle4.position.y[i]
      ) {
        isCollide = true;
      }
    }
    for (let i = 0; i < obstacle5.position.x.length; i++) {
      if (
        snakes.head.x == obstacle5.position.x[i] &&
        snakes.head.y == obstacle5.position.y[i]
      ) {
        isCollide = true;
      }
    }
  }

  if (isCollide) {
    if (snakeLife === 1) {
      audioGameOver.play();
      MOVE_INTERVAL = 155;
      snakeLevel = 1;
      snake1 = initSnake();
      snakeLife = 3;
      alert("Game over");
    } else {
      //   snakes.score = 0;
      snake1 = initSnake();
      snakeLife--;
    }
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

  function initGame() {
    move(snake1);
  }

  moveBody(snake);
  if (!checkCollision(snake)) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    // move(snake1);
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

move(snake1);
