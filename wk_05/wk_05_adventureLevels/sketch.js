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

  
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].bg, data[i].options, data[i].rectPos1, data[i].rectPos2, data[i].rectPos3, data[i].rectPos4, data[i].nextScenes))
  }
}

function Scene(sceneText, bg, options, rectPos1, rectPos2, rectPos3, rectPos4, nextScenes) {
  this.sceneText = sceneText;
  this.bg = bg;
  this.options = options;
  this.rectPos1 = rectPos1;
  this.rectPos2 = rectPos2;
  this.rectPos3 = rectPos3;
  this.rectPos4 = rectPos4;
  this.nextScenes = nextScenes;

  this.display = function() {
    fill(0);
    textSize(32);
    text(this.sceneText, 100, 100);

    for (var i = 0; i < options.length; i++) {
      fill(this.bg[i]);
      rect(0,0,width,height);
      fill(255);
      text('OPTION ' + (i + 1) + ': ' + this.options[i], 150, 200 + i * 50);

      fill (201, 118, 197);
      rect(this.rectPos1, this.rectPos2, 40,40);

      fill (244, 119, 66);
      rect(this.rectPos3, this.rectPos4, 40,40);
      



      // fill (201, 118, 197);
      // this.shapes[i](mouseX+5,mouseY+5,30,30);


      // fill (237, 137, 232);
      // this.shapes[i](mouseX,mouseY,30,30);
    }
  }
}

// function keyPressed() {
//   var numberPressed = parseInt(key);
//   var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
//   if (newScene !== undefined) {
//     currentScene = newScene;
//   }
// }

function switchScene() {
  var x = mouseX;
  var y = mouseY;

  
  var newScene = scenes[currentScene].nextScenes[currentScene+1];
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