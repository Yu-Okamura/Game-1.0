function VegetableGame(changeScreen) {
  // instance variables
  this.fruits = [];
  this.vegetables = [];
  this.fruitBasket;
  this.vegetableBasket;
  this.bellSound;
  this.hornSound;
  this.playAgainButton;
  this.vegetableBasketImage;
  this.fruitBasketImage;
  this.checkMark;
  this.xMark;
  this.resultState = -1;
  this.score = 0;
  this.backgroundImage;
  this.startTime = 0;
  this.timePassed = 0;

  // runs when page is first loaded, gets all neccessary assets
  this.preload = () => {
    this.fruits.push(loadImage("assets/vegvsfruit/kiwi.png"));
    this.fruits.push(loadImage("assets/vegvsfruit/apple.png"));
    this.fruits.push(loadImage("assets/vegvsfruit/orange.png"));
    this.vegetables.push(loadImage("assets/vegvsfruit/broccoli.png"));
    this.vegetables.push(loadImage("assets/vegvsfruit/carrot.png"));
    this.vegetables.push(loadImage("assets/vegvsfruit/corn.png"));
    this.backgroundImage = loadImage("assets/vegvsfruit/background_art.png");

    this.bellSound = loadSound("assets/vegvsfruit/bell.mp3");
    this.hornSound = loadSound("assets/vegvsfruit/ahooga.mp3");
    this.fruitBasketImage = loadImage("assets/vegvsfruit/fruit_basket.png");
    this.vegetableBasketImage = loadImage(
      "assets/vegvsfruit/vegetable_basket.png"
    );

    this.checkMark = loadImage("assets/vegvsfruit/check.png");
    this.xMark = loadImage("assets/vegvsfruit/x.png");
  };

  // creates canvas, and sets up locations of important elements
  this.setup = () => {
    createCanvas(1330, 800);
    this.startTime = new Date().getTime() / 1000;
    this.fruits = [];
    this.vegetables = [];
    this.preload();
    this.score = 0;

    this.fruitBasket = {
      x: 100,
      y: height - 250,
      width: 200,
      height: 200,
      label: "Fruit",
    };

    this.vegetableBasket = {
      x: width - 300,
      y: height - 250,
      width: 200,
      height: 200,
    };

    this.playAgainButton = {
      x: width / 2 - 100,
      y: height / 2 - 20,
      width: 200,
      height: 60,
      label: "Play Again",
      show: false,
    };

    for (let i = 0; i < this.fruits.length; i++) {
      this.fruits[i].x = random(width - 200) + 100;
      this.fruits[i].y = random(height - 300) + 60;
      this.fruits[i].dragging = false;
    }

    for (let i = 0; i < this.vegetables.length; i++) {
      this.vegetables[i].x = random(width);
      this.vegetables[i].y = random(height - 200);
      this.vegetables[i].dragging = false;
    }
  };

  // runs every frame
  this.draw = () => {
    // adds background image and makes it a lighter color
    image(this.backgroundImage, 0, 0, width, height);
    background(255, 255, 255, 100);

    // Draw baskets
    this.drawBasket(this.fruitBasket);
    this.drawBasket(this.vegetableBasket);

    // Draw fruits and vegetables
    for (let fruit of this.fruits) {
      if (fruit) {
        image(fruit, fruit.x, fruit.y, 100, 100);
      }
    }

    for (let vegetable of this.vegetables) {
      if (vegetable) {
        image(vegetable, vegetable.x, vegetable.y, 100, 100);
      }
    }

    if (this.fruits.every((f) => !f) && this.vegetables.every((v) => !v)) {
      this.playAgainButton.show = true;
      this.drawButton(this.playAgainButton);
    } else {
      const tempTime = new Date().getTime() / 1000;
      const currTime = tempTime - this.startTime;
      this.timePassed = Math.floor(currTime);
    }

    this.drawResultState();

    // adds labels
    textSize(30);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Score: " + this.score, width / 2, height - 75);

    text("Time: " + Math.floor(this.timePassed), width / 2, height - 25);

    fill(255);
    textSize(40);
    text(
      "Drag the fruit or vegetable into its corresponding basket.",
      width / 2 + 60,
      30
    );
    strokeWeight(0);
    noStroke();

    this.drawHomeButton();
  };

  // home button
  this.drawHomeButton = () => {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(52, 99, 186);
    rect(0, 0, 200, 60);
    fill(255);

    text("Home", 100, 30);
  };

  // adds check mark or X depending on where user drops food
  this.drawResultState = () => {
    if (this.resultState == 0) {
      image(
        this.checkMark,
        this.fruitBasket.x,
        this.fruitBasket.y,
        this.fruitBasket.width,
        this.fruitBasket.height
      );
    } else if (this.resultState == 1) {
      image(
        this.xMark,
        this.fruitBasket.x,
        this.fruitBasket.y,
        this.fruitBasket.width,
        this.fruitBasket.height
      );
    } else if (this.resultState == 2) {
      image(
        this.checkMark,
        this.vegetableBasket.x,
        this.vegetableBasket.y,
        this.vegetableBasket.width,
        this.vegetableBasket.height
      );
    } else if (this.resultState == 3) {
      image(
        this.xMark,
        this.vegetableBasket.x,
        this.vegetableBasket.y,
        this.vegetableBasket.width,
        this.vegetableBasket.height
      );
    }
  };

  // draws the fruit/vegetable basket
  this.drawBasket = (basket) => {
    if (basket.label === "Fruit") {
      image(
        this.fruitBasketImage,
        basket.x,
        basket.y,
        basket.width,
        basket.height
      );
    } else {
      image(
        this.vegetableBasketImage,
        basket.x,
        basket.y,
        basket.width,
        basket.height
      );
    }
  };

  // draws any button we need
  this.drawButton = (button) => {
    if (button.show) {
      fill(47, 189, 47);
      rect(button.x, button.y, button.width, button.height);
      fill(255);
      textAlign(CENTER, CENTER);
      text(
        button.label,
        button.x + button.width / 2,
        button.y + button.height / 2
      );
    }
  };

  // checks for whether user is pressing on a button
  this.mousePressed = () => {
    if (this.checkBounds(0, 0, 200, 60)) {
      changeScreen(0);
    }
    for (let fruit of this.fruits) {
      if (
        fruit &&
        mouseX > fruit.x &&
        mouseX < fruit.x + 100 &&
        mouseY > fruit.y &&
        mouseY < fruit.y + 100
      ) {
        fruit.dragging = true;
      }
    }

    for (let vegetable of this.vegetables) {
      if (
        vegetable &&
        mouseX > vegetable.x &&
        mouseX < vegetable.x + 100 &&
        mouseY > vegetable.y &&
        mouseY < vegetable.y + 100
      ) {
        vegetable.dragging = true;
      }
    }

    if (
      this.playAgainButton.show &&
      mouseX > this.playAgainButton.x &&
      mouseX < this.playAgainButton.x + this.playAgainButton.width &&
      mouseY > this.playAgainButton.y &&
      mouseY < this.playAgainButton.y + this.playAgainButton.height
    ) {
      this.setup();
    }
  };

  // when user releases food, check if it is on a basket
  this.mouseReleased = () => {
    for (let i = 0; i < this.fruits.length; i++) {
      if (this.fruits[i] && this.fruits[i].dragging) {
        this.fruits[i].dragging = false;
        if (
          mouseX > this.fruitBasket.x &&
          mouseX < this.fruitBasket.x + this.fruitBasket.width &&
          mouseY > this.fruitBasket.y &&
          mouseY < this.fruitBasket.y + this.fruitBasket.height
        ) {
          this.bellSound.play();
          this.fruits[i] = null;
          this.resultState = 0;
          this.score += 1;
          setTimeout(() => {
            this.resultState = -1;
          }, 500);
        } else if (
          mouseX > this.vegetableBasket.x &&
          mouseX < this.vegetableBasket.x + this.vegetableBasket.width &&
          mouseY > this.vegetableBasket.y &&
          mouseY < this.vegetableBasket.y + this.vegetableBasket.height
        ) {
          this.hornSound.play();
          this.resultState = 3;
          setTimeout(() => {
            this.resultState = -1;
          }, 500);
        }
      }
    }

    for (let i = 0; i < this.vegetables.length; i++) {
      if (this.vegetables[i] && this.vegetables[i].dragging) {
        this.vegetables[i].dragging = false;
        if (
          mouseX > this.vegetableBasket.x &&
          mouseX < this.vegetableBasket.x + this.vegetableBasket.width &&
          mouseY > this.vegetableBasket.y &&
          mouseY < this.vegetableBasket.y + this.vegetableBasket.height
        ) {
          this.bellSound.play();
          this.vegetables[i] = null;
          this.resultState = 2;
          this.score += 1;
          setTimeout(() => {
            this.resultState = -1;
          }, 500);
        } else if (
          mouseX > this.fruitBasket.x &&
          mouseX < this.fruitBasket.x + this.fruitBasket.width &&
          mouseY > this.fruitBasket.y &&
          mouseY < this.fruitBasket.y + this.fruitBasket.height
        ) {
          this.hornSound.play();
          this.resultState = 1;
          setTimeout(() => {
            this.resultState = -1;
          }, 500);
        }
      }
    }
  };

  // drags food around screen
  this.mouseDragged = () => {
    for (let fruit of this.fruits) {
      if (fruit && fruit.dragging) {
        fruit.x = mouseX - 25;
        fruit.y = mouseY - 25;
      }
    }

    for (let vegetable of this.vegetables) {
      if (vegetable && vegetable.dragging) {
        vegetable.x = mouseX - 25;
        vegetable.y = mouseY - 25;
      }
    }
  };

  // helper method
  this.checkBounds = (x, y, w, h) => {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  };
}
