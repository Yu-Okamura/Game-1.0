// this page draws the home screen GUI

function Home(changeScreen) {
  this.images = [];

  this.setup = () => {
    this.preload();
    createCanvas(1330, 800);
  };

  this.preload = () => {
    this.images = [
      loadImage("assets/shape_legends.png"),
      loadImage("assets/vege_vs_fruit.png"),
      loadImage("assets/animal_hunter.png"),
    ];
  };

  // renders the home screen
  this.draw = () => {
    background(208, 228, 242);
    textAlign(CENTER, CENTER);

    this.drawBoxAndText(50, "Shape Legends", 0);
    this.drawBoxAndText(443 + 50, "Vegetable vs. Fruit", 1);
    this.drawBoxAndText(886 + 50, "Animal Hunter", 2);

    fill(0);
    textSize(50);
    text("Game!!", width / 2, 100);
    textSize(20);
  };

  // function to draw a game button
  this.drawBoxAndText = (xPosition, textValue, index) => {
    if (this.checkBounds(xPosition, 300, 343, 270)) {
      strokeWeight(5);
      stroke(0);
    } else {
      noStroke();
    }

    fill(255);
    image(this.images[index], xPosition, 300, 343, 220);

    fill(212, 42, 42);
    rect(xPosition, 520, 343, 50);

    fill(255);
    textSize(20);
    noStroke();
    text(textValue, xPosition + 343 / 2, 545);
  };

  //helper method
  this.checkBounds = (x, y, w, h) => {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  };

  // navigate to game if user clicks on it
  this.mousePressed = () => {
    for (let i = 0; i < 3; i++) {
      let xPosition = 50 + i * 443;
      if (this.checkBounds(xPosition, 300, 343, 270)) {
        changeScreen(i + 1);
      }
    }
  };

  this.mouseDragged = () => {};
  this.mouseReleased = () => {};
}
