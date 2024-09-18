// this page makes the navigation work

let screen = 0;
let myScreens = [];

function changeScreen(index) {
  screen = index;
}

function setup() {
  myScreens = [
    new Home(changeScreen),
    new ShapesGame(changeScreen),
    new VegetableGame(changeScreen),
    new AnimalGame(changeScreen),
  ];
  myScreens[screen].setup();
}

function draw() {
  myScreens[screen].draw();
}

function mousePressed() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
  let temp = screen;
  myScreens[screen].mousePressed();
  if (temp != screen) {
    // on a new page => run setup
    console.log("new page!");
    myScreens[screen].setup();
  }
}

function mouseReleased() {
  myScreens[screen].mouseReleased();
}

function mouseDragged() {
  myScreens[screen].mouseDragged();
}
