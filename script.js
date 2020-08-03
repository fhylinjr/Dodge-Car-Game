// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, random, background, fill, color, rect, ellipse, square,
stroke, noStroke, noFill, strokeWeight, colorMode,  width, height, text, HSB,
line, mouseX, mouseY, mouseIsPressed, collideCircleCircle, collideRectCircle,
keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, textAlign, CENTER, noLoop, rotate, PI */

let backgroundColor,
  canvasDimension,
  frogX,
  frogY,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V,
  frogRadius,
  goalLineHeight,
  brushHue,
  brushSaturation,
  brushBrightness,
  car2X,
  car2Y,
  car2V,
  powerUpFaster,
  barr1X,
  barr2X,
  barr3X,
  barrY;

function setup() {
  // Canvas & color settings
  canvasDimension = 500;
  createCanvas(canvasDimension, canvasDimension);
  colorMode(HSB, 360, 100, 100);

  brushHue = 0;
  brushSaturation = 50;
  brushBrightness = 70;

  backgroundColor = 95;
  frogX = canvasDimension / 2; // x-coordinate of the frog
  frogY = canvasDimension - 30; // y-coordinate of the frog
  score = 0; // initial player score
  lives = 3; // number of lives
  gameIsOver = false; // whether the game is over yet (true or false)
  car1X = 0; // x-coordinate of the car
  car1Y = random(50, canvasDimension - 40); // y-coordinate of the car
  car1V = 5; // velocity of our moving car
  frogRadius = 20;
  goalLineHeight = 50;
  car2X = 530;
  car2Y = random(50, canvasDimension - 40);
  car2V = 7;

  barrY = 250;
  barr1X = 0;
  barr2X = 150;
  barr3X = 400;

  //   powerUpFaster = rect(random(0, canvasDimension), random(0, canvasDimension), 5, 5);
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, goalLineHeight);
  // Code to display Frog
  chooseColors();
  ellipse(frogX, frogY, frogRadius);
  barrier();
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 10;
  } else if (keyCode === DOWN_ARROW) {
    frogY += 10;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += 10;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;
  if (score > 0) {
    car2X -= car2V;
  }
  // Reset if it moves off screen
  if (car1X >= width || car2X <= 0) {
    car1X = -30;
    car1Y = random(50, canvasDimension - 41);
    car2X = 500;
    car2Y = random(50, canvasDimension - 41);
  }

  // game over stop moving
  if (gameIsOver) {
    noLoop();
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  fill(255, 204, 100);
  rect(car2X, car2Y, 40, 30);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (
    collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, frogRadius) ||
    collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, frogRadius)
  ) {
    // reset the frog's location
    reset();

    // subtract a life
    if (!gameIsOver) {
      lives -= 1;
    }
  }

  // game ends when we run out of lives
  if (lives === 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= goalLineHeight) {
    score += 1;
    reset();
  }
  if (score === 3) {
    gameIsOver = true;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 40);
  // Display game over message if the game is over
  if (gameIsOver) {
    textSize(60);

    if (lives === 0) {
      text("YOU LOSE!", width / 8, height / 2);
    }
    if (score === 3) {
      text("YOU WIN!", width / 7, height / 2);
    }
  }
}

function reset() {
  frogX = canvasDimension / 2;
  frogY = canvasDimension - 30;
}

function chooseColors() {
  fill(brushHue, brushSaturation, brushBrightness);
  brushHue += 1;
  if (brushHue > 259) {
    brushHue = 0;
  }
}

/* POWER UP - Increase Velocity */

function increaseFrogSpeed() {}

function barrier() {
  fill(30);
  rect(barr1X, barrY, 100, 20);
  rect(barr2X, barrY, 200, 20);
  rect(barr3X, barrY, 100, 20);

  if (collideRectCircle(barr1X, barrY, 100, 20, frogX, frogY, 20)) {
    console.log("Collided with wall!");
    // Reset the frog's location'
    frogX = 250;
    frogY = 470;
    console.log(`frogX: ${frogX}`);
    console.log(`frogY: ${frogY}`);
    // Substract a life
    lives -= 1;
  } else if (collideRectCircle(barr2X, barrY, 100, 20, frogX, frogY, 20)) {
    console.log("Collided with wall!");
    // Reset the frog's location'
    frogX = 250;
    frogY = 470;
    console.log(`frogX: ${frogX}`);
    console.log(`frogY: ${frogY}`);
    // Substract a life
    lives -= 1;
  } else if (collideRectCircle(barr3X, barrY, 100, 20, frogX, frogY, 20)) {
    console.log("Collided with wall!");
    // Reset the frog's location'
    frogX = 250;
    frogY = 470;
    console.log(`frogX: ${frogX}`);
    console.log(`frogY: ${frogY}`);
    // Substract a life
    lives -= 1;
  }
}
