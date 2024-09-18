function ShapesGame(myFunc) {
  // instance variables
  this.button;
  this.slider;
  this.volume = 0.5;
  this.backgroundImg;
  this.grabbed = [false, false, false];
  this.shapeX = [];
  this.shapeY = [];
  this.Width1 = 150;
  this.Height1 = 150;
  this.diameter = 150;
  this.radius = this.diameter / 2.0;
  this.myFont;
  this.correctSound;
  this.wrongSound;
  this.backgroundMusic;

  // loads assets
  this.preload = () => {
    this.backgroundImg = loadImage("assets/shapes_bg.jpg");
    this.correctSound = loadSound("bellDing.mp3");
    this.clickSound = loadSound("click.mp3");
    this.incorrectSound = loadSound("Wrong.mp3");
    this.gameSound = loadSound("Game.mp3");
  };

  this.setup = () => {
    this.preload();
    createCanvas(1600, 900);
    // Initial Shape positions of shapes that user moves.

    // Circle
    this.shapeX[0] = 450;
    this.shapeY[0] = 450;
    //Square
    this.shapeX[1] = 800;
    this.shapeY[1] = 375;
    // Triangle
    this.shapeX[2] = 1200;
    this.shapeY[2] = 525;
    this.shapeX[3] = 1275;
    this.shapeY[3] = 375;
    this.shapeX[4] = 1350;
    this.shapeY[4] = 525;
  };

  this.baseLength = 150;
  this.tHeight = 150;

  // Color Changing Square Variables
  this.x = 1;
  this.r;
  this.g;
  this.b;

  this.draw = () => {
    image(this.backgroundImg, 0, 0, width, height);
    background(255, 255, 255, 80);

    // --- RGB FUNCTION ---
    this.r = 255 * sin(this.x);
    this.g = 255 * cos(this.x * 0.5);
    this.b = 255 * cos(this.x * 1.2);
    // --- RGB Function ---

    // Black-outlined structure shapes and text
    stroke(0);
    strokeWeight(4);
    fill(255, 0, 0, 0);
    rect(0, 0, 1600, 100);
    strokeWeight(4);
    fill(255, 255, 255);
    textSize(95);
    text("Shape Legends", 700, 55);
    strokeWeight(4);
    fill(255, 0, 0, 0);
    rect(0, 100, 300, 800);
    fill(255, 255, 255, 0);
    rect(0, 800, 1600, 100);
    textSize(20);
    fill(255);
    text("Drag and drop shapes here", 150, 120);
    textSize(27.5);
    text(
      "Drag and drop the shapes below into the correct outline of the correct shapes on the left.",
      1010,
      145
    );

    // Outline Shapes
    strokeWeight(4);
    fill(255, 255, 255, 100);
    circle(150, 225, 150);
    rect(75, 350, 150, 150);
    triangle(75, 700, 150, 550, 225, 700);

    //Draggable shapes
    //stroke(255);
    strokeWeight(4);
    fill("red");
    circle(this.shapeX[0], this.shapeY[0], this.diameter);
    fill("blue");
    rect(this.shapeX[1], this.shapeY[1], this.Width1, this.Height1);
    fill("green");
    triangle(
      this.shapeX[2],
      this.shapeY[2],
      this.shapeX[3],
      this.shapeY[3],
      this.shapeX[4],
      this.shapeY[4]
    );

    //Restart Button
    stroke(255);
    strokeWeight(4);
    fill(255);
    rect(750, 825, 300, 50);
    fill(0);
    textSize(50);
    text("Restart", 900, 850);

    // Variable for RGB effect
    this.x += 0.01;

    if (this.circleCorrect() && this.squareCorrect() && this.triCorrect()) {
      strokeWeight(0);
      textSize(200);
      fill("lime");
      text("WELL DONE", 670, 450);
    }

    this.drawHomeButton();
  };

  this.drawHomeButton = () => {
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(52, 99, 186);
    rect(0, 0, 200, 60);
    fill(255);

    text("Home", 100, 30);
  };

  // helper to see where mouse is
  this.mouseIsInRect = (squareX, squareY, Width, Height) => {
    let inRect = false;
    if (
      mouseX > squareX &&
      mouseX < squareX + Width &&
      mouseY > squareY &&
      mouseY < squareY + Height
    ) {
      inRect = true;
    }
    return inRect;
  };

  // helper to see where mouse is
  this.mouseIsInCircle = (radius, circleX, circleY) => {
    let inCirc = false;
    let d = dist(mouseX, mouseY, circleX, circleY);
    if (d < radius) {
      inCirc = true;
    }
    return inCirc;
  };

  // helper to see where mouse is
  this.MouseInTriangle = (TX1, TY1, TX2, TY2, TX3, TY3) => {
    let inTri = false;
    if (mouseX > TX1 && mouseX < TX3 && mouseY > TY2 && mouseY < TY3) {
      inTri = true;
    }
    return inTri;
  };

  // if user clicks, take them home or reset depending on what they click
  this.mousePressed = () => {
    if (mouseX < 200 && mouseY < 60) {
      myFunc(0);
    }

    if (
      mouseX > 750 &&
      mouseY > 825 &&
      mouseX < 750 + 300 &&
      mouseY < 825 + 50
    ) {
      console.log("reset");
      this.resetSketch();
    }
    if (this.mouseIsInCircle(this.radius, this.shapeX[0], this.shapeY[0])) {
      // Mouse in circle
      this.grabbed[0] = true;
    }
    // Mouse in rectangle
    else if (
      this.mouseIsInRect(
        this.shapeX[1],
        this.shapeY[1],
        this.Width1,
        this.Height1
      )
    ) {
      this.grabbed[1] = true;
    }
    // mouse in Triangle
    else if (
      this.MouseInTriangle(
        this.shapeX[2],
        this.shapeY[2],
        this.shapeX[3],
        this.shapeY[3],
        this.shapeX[4],
        this.shapeY[4]
      )
    ) {
      this.grabbed[2] = true;
    }
  };

  // when user releases mouse, see if the shape is in the right spot
  this.mouseReleased = () => {
    this.grabbed[0] = false;
    this.grabbed[1] = false;
    this.grabbed[2] = false;

    if (
      this.shapeX[0] < 235 &&
      this.shapeX[0] > 65 &&
      this.shapeY[0] < 310 &&
      this.shapeY[0] > 140
    ) {
      this.shapeX[0] = 150;
      this.shapeY[0] = 225;
    }
    if (
      this.shapeX[1] < 235 &&
      this.shapeX[1] > 65 &&
      this.shapeY[1] < 510 &&
      this.shapeY[1] > 340
    ) {
      this.shapeX[1] = 75;
      this.shapeY[1] = 350;
    }
    if (
      (this.shapeX[2] < 225 &&
        this.shapeX[2] > 75 &&
        this.shapeY[2] < 700 &&
        this.shapeY[2] > 550) ||
      (this.shapeX[4] < 225 &&
        this.shapeX[4] > 75 &&
        this.shapeY[4] < 700 &&
        this.shapeY[4] > 550)
    ) {
      this.shapeX[2] = 75;
      this.shapeY[2] = 700;
      this.shapeX[3] = 150;
      this.shapeY[3] = 550;
      this.shapeX[4] = 225;
      this.shapeY[4] = 700;
    }
    // Correct vs. Incorrect Haptics
    if (this.circleCorrect() && this.mouseIsInCircle(this.radius, 150, 225)) {
      // this.correctSound.play();
    } else if (
      !this.circleCorrect() &&
      ((this.shapeX[0] < 235 &&
        this.shapeX[0] > 65 &&
        this.shapeY[0] < 510 &&
        this.shapeY[0] > 340) ||
        (this.shapeX[0] < 225 &&
          this.shapeX[0] > 75 &&
          this.shapeY[0] < 700 &&
          this.shapeY[0] > 550))
    ) {
      //this.incorrectSound.play();
      this.shapeX[0] = 450;
      this.shapeY[0] = 450;
    }
    if (
      this.squareCorrect() &&
      this.mouseIsInRect(75, 350, this.Width1, this.Height1)
    ) {
      //this.correctSound.play();
    } else if (
      !this.squareCorrect() &&
      ((this.shapeX[1] < 225 &&
        this.shapeX[1] > 75 &&
        this.shapeY[1] < 300 &&
        this.shapeY[1] > 150) ||
        (this.shapeX[1] < 225 &&
          this.shapeX[1] > 75 &&
          this.shapeY[1] < 700 &&
          this.shapeY[1] > 550))
    ) {
      //this.incorrectSound.play();
      this.shapeX[1] = 800;
      this.shapeY[1] = 375;
    }
    if (
      this.triCorrect() &&
      this.MouseInTriangle(75, 700, 150, 550, 225, 700)
    ) {
      this.correctSound.play();
    } else if (
      !this.triCorrect() &&
      (dist(
        this.shapeX[2] || this.shapeX[3],
        this.shapeY[2] || this.shapeY[3],
        150,
        225
      ) < 150 ||
        dist(
          this.shapeX[2] || this.shapeX[3],
          this.shapeY[2] || this.shapeY[3],
          150,
          425
        ) < 75)
    ) {
      this.incorrectSound.play();
    }
  };

  // if the circle is correct, leave it there
  this.circleCorrect = () => {
    let correctPlace = false;
    if (this.shapeX[0] == 150 && this.shapeY[0] == 225) {
      correctPlace = true;
    }
    return correctPlace;
  };

  // this.to check if the square is in the correct spot
  this.squareCorrect = () => {
    let correctPlace = false;
    if (this.shapeX[1] == 75 && this.shapeY[1] == 350) {
      correctPlace = true;
    }
    return correctPlace;
  };

  // this.to check if the triangle is in the correct spot
  this.triCorrect = () => {
    let correctPlace = false;
    if (
      this.shapeX[2] == 75 &&
      this.shapeY[2] == 700 &&
      this.shapeX[3] == 150 &&
      this.shapeY[3] == 550 &&
      this.shapeX[4] == 225 &&
      this.shapeY[4] == 700
    ) {
      correctPlace = true;
    }
    return correctPlace;
  };

  // moves shapes when user drags one
  this.mouseDragged = () => {
    if (this.grabbed[0]) {
      this.shapeX[0] = mouseX;
      this.shapeY[0] = mouseY;
    } else if (this.grabbed[1]) {
      this.shapeX[1] = mouseX - this.Width1 / 2;
      this.shapeY[1] = mouseY - this.Height1 / 2;
    }
    // Only works for an isoceles or equilateral triangle
    else if (this.grabbed[2]) {
      this.shapeX[2] = mouseX - this.baseLength / 2.0;
      this.shapeY[2] = mouseY + this.tHeight / 2.0;
      this.shapeX[3] = mouseX;
      this.shapeY[3] = mouseY - this.tHeight / 2.0;
      this.shapeX[4] = mouseX + this.tHeight / 2.0;
      this.shapeY[4] = mouseY + (this.shapeY[2] - this.shapeY[3]) / 2.0;
    }
  };

  // if user wants to play again
  this.resetSketch = () => {
    // Initial Shape positions of shapes that user moves.
    // Circle

    this.shapeX[0] = 450;
    this.shapeY[0] = 450;
    //Square
    this.shapeX[1] = 800;
    this.shapeY[1] = 375;
    // Triangle
    this.shapeX[2] = 1200;
    this.shapeY[2] = 525;
    this.shapeX[3] = 1275;
    this.shapeY[3] = 375;
    this.shapeX[4] = 1350;
    this.shapeY[4] = 525;
  };

  this.mouseClicked = () => {
    if (mouseX < 1050 && mouseX > 750 && mouseY < 875 && mouseY > 825) {
      this.resetSketch();
    }
  };
}
