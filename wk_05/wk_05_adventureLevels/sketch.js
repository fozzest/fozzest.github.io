//code 02
//wk_05_02

//forrest_whitcomb

//levels



// scene data model: 

// {
//   sceneText: '', //the scene text
//   options: [], // the text options to choose
//   nextScenes: []  // the target scene based on the previous options
// }

var sceneData;

var currentScene = 0;
var scenes = [];

function preload() {
  sceneData = loadJSON('scenes.json');
}

function setup() {
  createCanvas(800, 800);
  CreateScenesFromData(sceneData.scenes);
}

function draw() {
  background(85, 198, 204);
  scenes[currentScene].display();
  noStroke();

  // fill (201, 118, 197);
  // ellipse(mouseX+5,mouseY+5,30,30);


  // fill (237, 137, 232);
  // ellipse(mouseX,mouseY,30,30);

  fill(0);
  textSize(24);
  text("press the option number to advance to the indicated scene", 50, 700);
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes))
  }
}

function Scene(sceneText, options, nextScenes) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;

  this.display = function() {
    fill(0);
    textSize(32);
    text(this.sceneText, 100, 100);

    for (var i = 0; i < options.length; i++) {
      text('OPTION ' + (i + 1) + ': ' + this.options[i], 85, 198 + i * 50);

      fill (201, 118, 197);
      this.shapes[i] (mouseX+5,mouseY+5,30,30);


      fill (237, 137, 232);
      this.shapes[i](mouseX,mouseY,30,30);
    }
  }
}

function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}

// function switchScene(){
// var xpos = mouseX;
// var ypos = mouseY
// var newScene = scenes[currentScene].nextScenes[xpos, ypos];

// if (xpos > 100 && ypos >100)
//   newScene = [2];

// }