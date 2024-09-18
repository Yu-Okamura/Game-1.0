function AnimalGame(myFunc) {
  this.x = 0;

  // instance variables
  this.animals = [];
  this.net;
  this.targetAnimal;
  this.lastTarget = null;
  this.score = 0;
  this.displayAnimals = [];
  this.yobgImage;
  this.myFont;
  this.bearImage;
  this.chickenImage;
  this.cowImage;
  this.dogImage;
  this.giraffeImage;
  this.gorillaImage;
  this.lionImage;
  this.monkeyImage;
  this.pandaImage;
  this.pigImage;
  this.sheepImage;
  this.tigerImage;
  this.villager1Image;
  this.villager2Image;
  this.villager3Image;
  this.villager4Image;
  this.correctSound1;
  this.correctSound2;
  this.correctSound3;
  this.correctSound4;
  this.wrongSound1;
  this.wrongSound2;
  this.villagerSound;
  this.timer;
  this.gameEnded = false;
  this.homeButton;
  this.gameState = "start";
  this.startButton;
  this.instructionsButton;
  this.startGameButton;
  this.lastSetIndex = -1;
  this.refreshIntervalId;

  // gets all neccesary assets
  this.preload = () => {
    this.score = 0;
    this.timer = 180;
    this.yobgImage = loadImage("assets/animal_assets/yobackground.jpg");
    this.cowImage = loadImage("assets/animal_assets/cow.PNG");
    this.sheepImage = loadImage("assets/animal_assets/sheep.PNG");
    this.chickenImage = loadImage("assets/animal_assets/chicken.PNG");
    this.pigImage = loadImage("assets/animal_assets/pig.PNG");
    this.bearImage = loadImage("assets/animal_assets/bear.PNG");
    this.dogImage = loadImage("assets/animal_assets/dog.PNG");
    this.giraffeImage = loadImage("assets/animal_assets/giraffe.PNG");
    this.gorillaImage = loadImage("assets/animal_assets/gorilla.PNG");
    this.lionImage = loadImage("assets/animal_assets/lion.PNG");
    this.monkeyImage = loadImage("assets/animal_assets/monkey.PNG");
    this.pandaImage = loadImage("assets/animal_assets/panda.PNG");
    this.tigerImage = loadImage("assets/animal_assets/tiger.PNG");
    this.villager1Image = loadImage("assets/animal_assets/villager-1.PNG");
    this.villager2Image = loadImage("assets/animal_assets/villager-2.PNG");
    this.villager3Image = loadImage("assets/animal_assets/villager-3.PNG");
    this.villager4Image = loadImage("assets/animal_assets/villager-4.PNG");
    this.correctSound1 = loadSound("assets/animal_assets/correct1.mp3");
    this.correctSound2 = loadSound("assets/animal_assets/correct2.mp3");
    this.correctSound3 = loadSound("assets/animal_assets/correct3.mp3");
    this.correctSound4 = loadSound("assets/animal_assets/correct4.mp3");
    this.wrongSound1 = loadSound("assets/animal_assets/wrong1.mp3");
    this.wrongSound2 = loadSound("assets/animal_assets/wrong2.mp3");
    this.villagerSound = loadSound("assets/animal_assets/villager.mp3");
    this.myFont = loadFont("assets/animal_assets/myFont.otf");
  };

  // adds all the initial animals and images to the screen
  this.setup = () => {
    createCanvas(1330, 800);
    this.preload();
    this.animals.push(new Animal(this, "cow"));
    this.animals.push(new Animal(this, "sheep"));
    this.animals.push(new Animal(this, "chicken"));
    this.animals.push(new Animal(this, "pig"));
    this.animals.push(new Animal(this, "bear"));
    this.animals.push(new Animal(this, "dog"));
    this.animals.push(new Animal(this, "giraffe"));
    this.animals.push(new Animal(this, "gorilla"));
    this.animals.push(new Animal(this, "lion"));
    this.animals.push(new Animal(this, "monkey"));
    this.animals.push(new Animal(this, "panda"));
    this.animals.push(new Animal(this, "tiger"));
    this.animals.push(new Animal(this, "villager1"));
    this.animals.push(new Animal(this, "villager2"));
    this.animals.push(new Animal(this, "villager3"));
    this.animals.push(new Animal(this, "villager4"));
    this.setNewTarget();
    this.setDisplayAnimals();
    this.net = new Net();
    this.timer = 180;
    this.refreshIntervalId = setInterval(() => {
      if (this.timer > 0 && !this.gameEnded) this.timer--;
    }, 1000);
    this.startButton = new Animal(this, "startButton");
    this.instructionsButton = new Animal(this, "instructionsButton");
    this.startGameButton = new Animal(this, "startGameButton");
  };

  // draws out start screen if user has not started to play
  this.displayStartScreen = () => {
    image(this.yobgImage, 0, 0, width, height);
    background(255, 255, 255, 80);

    textSize(120);
    fill(255, 255, 0);
    stroke(0, 0, 255);
    strokeWeight(10);
    textAlign(CENTER, CENTER);
    text("Animal Hunter", width / 2, height / 2 - 175);
    strokeWeight(3);
    this.startButton.show();
    this.instructionsButton.show();
  };

  // renders the content of the game
  this.draw = () => {
    //adds background image and makes it lighter
    image(this.yobgImage, 0, 0, width, height);
    background(255, 255, 255, 80);

    // shows content of game if the user is not in start screen
    if (this.gameState === "playing" && !this.gameEnded) {
      for (let animal of this.displayAnimals) {
        animal.show();
      }
      this.net.show();
      textSize(70);
      stroke(0);
      strokeWeight(6);
      textAlign(LEFT, TOP);
      fill(255);
      text("Catch a", 100, 100);
      fill(255, 182, 193);
      text(this.targetAnimal.type, 378, 100);
      fill(255);
      text("Score:", 700, 100);
      fill(255, 182, 193);
      text(this.score, 920, 100);
      fill(255);
      text(
        `Time: ${Math.floor(this.timer / 60)}:${
          this.timer % 60 < 10 ? "0" : ""
        }${this.timer % 60}`,
        800,
        10
      );
    } else if (this.gameState === "start") {
      this.displayStartScreen();
    } else if (this.gameState === "instructions") {
      this.displayInstructions();
    } else if (this.gameState === "end") {
      this.displayEndGameMessage();
    }

    if (
      this.gameState === "playing" &&
      (this.timer === 0 || this.score === 15) &&
      !this.gameEnded
    ) {
      this.gameEnded = true;
      this.displayAnimals = [];
      this.gameState = "end";
    }

    this.drawHomeButton();
  };

  // draws button that allows the user to navigate to the home screen
  this.drawHomeButton = () => {
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(52, 99, 186);
    rect(0, 0, 200, 60);
    fill(255);

    text("Home", 100, 30);
  };

  // if game finished, this will be called which will display the ending screen content
  this.displayEndGameMessage = () => {
    stroke(0);
    strokeWeight(5);
    fill(255);
    rect(width / 2 - 350, height / 2 - 200, 700, 400);
    textSize(80);
    textAlign(CENTER, CENTER);

    let message;

    if (this.score === 15) {
      message = "Congrats!";
      fill(255, 255, 0);
      stroke(0, 0, 255);
      strokeWeight(3);
      text(message, width / 2, height / 2 - 80);
    } else {
      message = "Game Over!";
      fill(255, 0, 0);
      stroke(0);
      strokeWeight(3);
      text(message, width / 2, height / 2);
    }

    if (this.score === 15) {
      let timeTaken = 180 - this.timer;
      let minutes = Math.floor(this.timeTaken / 60);
      let seconds = this.timeTaken % 60;
      textSize(60);
      fill(255);
      text("Time Taken:", width / 2, height / 2 + 50);
      fill(255, 182, 193);
      text(`${minutes}m ${seconds}s`, width / 2, height / 2 + 130);
    }

    fill(255);
    stroke(0);
    strokeWeight(3);
    rect(width - 250, height - 100, 200, 50, 20);
    fill(0);
    noStroke();
    textSize(25);
    text("Return to Home", width - 150, height - 75);
    this.homeButton = {
      x: width - 250,
      y: height - 100,
      width: 200,
      height: 50,
    };
  };

  // picks a new target to draw
  this.setNewTarget = () => {
    let potentialTargets = this.animals.filter(
      (a) =>
        a.type !== "villager1" &&
        a.type !== "villager2" &&
        a.type !== "villager3" &&
        a.type !== "villager4" &&
        a !== this.lastTarget
    );
    this.targetAnimal = random(potentialTargets);
    this.lastTarget = this.targetAnimal;
  };

  this.gridCoordinates = [
    [
      { x: 200, y: 250 },
      { x: 450, y: 550 },
      { x: 700, y: 300 },
      { x: 950, y: 500 },
      { x: 1000, y: 250 },
    ],
    [
      { x: 150, y: 350 },
      { x: 400, y: 200 },
      { x: 650, y: 450 },
      { x: 900, y: 300 },
      { x: 1150, y: 550 },
    ],
    [
      { x: 250, y: 500 },
      { x: 500, y: 250 },
      { x: 750, y: 550 },
      { x: 1000, y: 300 },
      { x: 1050, y: 500 },
    ],
    [
      { x: 150, y: 250 },
      { x: 400, y: 500 },
      { x: 650, y: 200 },
      { x: 900, y: 450 },
      { x: 1050, y: 300 },
    ],
    [
      { x: 200, y: 350 },
      { x: 450, y: 600 },
      { x: 700, y: 350 },
      { x: 950, y: 200 },
      { x: 1000, y: 450 },
    ],
    [
      { x: 250, y: 200 },
      { x: 500, y: 450 },
      { x: 750, y: 600 },
      { x: 1000, y: 350 },
      { x: 1050, y: 200 },
    ],
    [
      { x: 150, y: 450 },
      { x: 400, y: 300 },
      { x: 650, y: 550 },
      { x: 900, y: 200 },
      { x: 1150, y: 450 },
    ],
    [
      { x: 200, y: 500 },
      { x: 450, y: 250 },
      { x: 700, y: 500 },
      { x: 950, y: 250 },
      { x: 1000, y: 550 },
    ],
    [
      { x: 250, y: 300 },
      { x: 500, y: 550 },
      { x: 750, y: 250 },
      { x: 1000, y: 500 },
      { x: 1050, y: 300 },
    ],
    [
      { x: 150, y: 550 },
      { x: 400, y: 200 },
      { x: 650, y: 400 },
      { x: 900, y: 600 },
      { x: 1150, y: 350 },
    ],
    [
      { x: 200, y: 450 },
      { x: 450, y: 600 },
      { x: 700, y: 200 },
      { x: 950, y: 450 },
      { x: 1000, y: 600 },
    ],
    [
      { x: 250, y: 350 },
      { x: 500, y: 200 },
      { x: 750, y: 450 },
      { x: 1000, y: 600 },
      { x: 1050, y: 350 },
    ],
    [
      { x: 150, y: 300 },
      { x: 400, y: 550 },
      { x: 650, y: 300 },
      { x: 900, y: 550 },
      { x: 1150, y: 200 },
    ],
    [
      { x: 200, y: 600 },
      { x: 450, y: 350 },
      { x: 700, y: 550 },
      { x: 950, y: 300 },
      { x: 1000, y: 200 },
    ],
    [
      { x: 250, y: 250 },
      { x: 500, y: 600 },
      { x: 750, y: 350 },
      { x: 1000, y: 200 },
      { x: 1050, y: 450 },
    ],
  ];

  // helper method to get new coordinates
  this.getRandomSetIndex = (excludeIndex, totalSets) => {
    let randomIndex = floor(random(totalSets));
    while (randomIndex === excludeIndex) {
      randomIndex = floor(random(totalSets));
    }
    return randomIndex;
  };

  // 2nd helper method to get new coordinates
  this.setRandomCoordinatesForAnimals = () => {
    let currentSetIndex = this.getRandomSetIndex(
      this.lastSetIndex,
      this.gridCoordinates.length
    );
    this.lastSetIndex = currentSetIndex;

    for (let i = 0; i < this.displayAnimals.length; i++) {
      this.displayAnimals[i].x = this.gridCoordinates[currentSetIndex][i].x;
      this.displayAnimals[i].y = this.gridCoordinates[currentSetIndex][i].y;
    }
  };

  // displays animals
  this.setDisplayAnimals = () => {
    let others = shuffle(
      this.animals.filter((animal) => animal !== this.targetAnimal)
    );
    this.displayAnimals = others.slice(0, 4);
    this.displayAnimals.push(this.targetAnimal);
    shuffle(this.displayAnimals, true);
    this.setRandomCoordinatesForAnimals();
  };

  // updates screen depending on which animal the user clicks
  this.mousePressed = () => {
    if (mouseX < 200 && mouseY < 60) {
      clearInterval(this.refreshIntervalId);
      myFunc(0);
    }

    if (this.gameState === "start") {
      if (this.startButton.contains(mouseX, mouseY)) {
        this.gameState = "playing";
        this.setNewTarget();
        this.setDisplayAnimals();
        this.timer = 180;
        this.score = 0;
        this.gameEnded = false;
      } else if (this.instructionsButton.contains(mouseX, mouseY)) {
        this.gameState = "instructions";
      }
    } else if (this.gameState === "instructions") {
      if (this.startGameButton.contains(mouseX, mouseY)) {
        this.gameState = "playing";
        this.setNewTarget();
        this.setDisplayAnimals();
        this.timer = 180;
        this.score = 0;
        this.gameEnded = false;
      }
    } else if (this.gameState === "playing") {
      for (let animal of this.displayAnimals) {
        if (animal.contains(mouseX, mouseY)) {
          if (animal === this.targetAnimal) {
            this.score++;
            let correctSounds = [
              this.correctSound1,
              this.correctSound2,
              this.correctSound3,
              this.correctSound4,
            ];
            let soundToPlay = random(correctSounds);
            soundToPlay.play();
            this.setNewTarget();
            this.setDisplayAnimals();
          } else {
            let wrongSounds = [this.wrongSound1, this.wrongSound2];
            let soundToPlay = random(wrongSounds);
            if (this.score > 0) {
              this.score--;
            }
            if (animal.type.startsWith("villager")) {
              this.villagerSound.play();
            } else {
              soundToPlay.play();
            }
          }
          break;
        }
      }
    } else if (this.gameState === "end") {
      // End game screen interactions
    }
  };

  // draws the instructions that can be navigated to from the start screen
  this.displayInstructions = () => {
    fill(255);
    stroke(0);
    strokeWeight(5);
    rect(width / 2 - 350, height / 2 - 200, 700, 400);
    strokeWeight(0);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      " \n\n\nRule:\n" +
        "Use your mouse to click on the target animal displayed\nat the top of the screen among the others.\n\n\n" +
        "Scoring:\n" +
        "Each time you correctly click on the target animal, you earn a point.\nIf you click on the wrong animal, you will lose a point.\nIf you reach 15 points before the time runs out, you win!",
      width / 2,
      height / 2 - 50
    );
    textSize(20);
    strokeWeight(3);
    this.startGameButton.show();
  };

  this.mouseDragged = () => {};
  this.mouseReleased = () => {};
}

// subclass for a single animal or villager
class Animal {
  constructor(game, type) {
    this.type = type;
    this.game = game; // Store the reference to the game instance
    this.image = this.setImageForType(type);
    this.height = 80;
    if (type === "startButton" || type === "instructionsButton") {
      this.width = 330;
    } else if (type === "startGameButton") {
      this.width = 320;
      this.height = 50;
    } else {
      this.height = 300;
      this.width = 300;
      this.setRandomPosition();
    }
    if (type === "startButton" || type === "instructionsButton") {
      this.x = width / 2 - this.width / 2;
      this.y = type === "startButton" ? height / 2 : height / 2 + 100;
    } else if (type === "startGameButton") {
      this.x = width - this.width - 50;
      this.y = height - 100;
    }
  }

  // gets the corresponding image for the animal
  setImageForType(type) {
    switch (type) {
      case "cow":
        return this.game.cowImage;
      case "sheep":
        return this.game.sheepImage;
      case "chicken":
        return this.game.chickenImage;
      case "pig":
        return this.game.pigImage;
      case "bear":
        return this.game.bearImage;
      case "dog":
        return this.game.dogImage;
      case "giraffe":
        return this.game.giraffeImage;
      case "gorilla":
        return this.game.gorillaImage;
      case "lion":
        return this.game.lionImage;
      case "monkey":
        return this.game.monkeyImage;
      case "panda":
        return this.game.pandaImage;
      case "tiger":
        return this.game.tigerImage;
      case "villager1":
        return this.game.villager1Image;
      case "villager2":
        return this.game.villager2Image;
      case "villager3":
        return this.game.villager3Image;
      case "villager4":
        return this.game.villager4Image;
      case "startButton":
        break;
      case "instructionsButton":
        break;
      case "startGameButton":
        break;
      default:
        console.error("Unknown animal type:", type);
        return null;
    }
  }

  setRandomPosition() {
    this.x = random(300, 550);
    this.y = random(200, 600);
  }

  // draws the animal and related content
  show() {
    if (
      this.type === "startButton" ||
      this.type === "instructionsButton" ||
      this.type === "startGameButton"
    ) {
      fill(255);
      stroke(0);
      rect(this.x, this.y, this.width, this.height, 20);
      let buttonText;
      if (this.type === "startButton") {
        buttonText = "Start the Game";
      } else if (this.type === "instructionsButton") {
        buttonText = "Instructions";
      } else if (this.type === "startGameButton") {
        buttonText = "Start the Game";
      }
      fill(255);
      stroke(0);
      strokeWeight(3);
      textSize(40);
      textAlign(CENTER, CENTER);
      text(buttonText, this.x + this.width / 2, this.y + this.height / 2);
    } else {
      image(this.image, this.x, this.y, this.width, this.height);
    }
  }

  contains(px, py) {
    return (
      px > this.x &&
      px < this.x + this.width &&
      py > this.y &&
      py < this.y + this.height
    );
  }
}

// follows mouse to help kids see where the mouse is
class Net {
  show() {
    fill(100, 100, 255, 150);
    ellipse(mouseX, mouseY, 75);
  }
}
