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
      text(this.options[i]), 100, 100;
      //text( this.options[i], 150, 200 + i * 50);

      fill (201, 118, 197);
      rect(this.rectPos1, this.rectPos2, 40,40);

      fill (244, 119, 66);
      rect(this.rectPos3, this.rectPos4, 40,40);

  //       if (mouseIsPressed && mouseX > this.rectPos1 && mouseX < this.rectPos1 +40 && mouseY > this.rectPos2 && mouseY < this.rectPos1 +40){
  //   console.log("click");
  //   this.nextScenes;
  // }
      
    }
  }
}

 function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed];
   // if (newScene !== undefined) {
   //   currentScene = newScene;
   // }
 }

 function mousePressed() {
  if ( mouseX > scenes[currentScene].rectPos1[0] &&
       mouseX < (scenes[currentScene].rectPos1[0] + 40) && 
       mouseY > scenes[currentScene].rectPos2[0] && 
       mouseY < (scenes[currentScene].rectPos2[0] + 40)) {
    var newScene = scenes[currentScene].nextScenes[0];
   if (newScene !== undefined) {
     currentScene = newScene;
   }
 }

 if ( mouseX > scenes[currentScene].rectPos3[0] &&
       mouseX < (scenes[currentScene].rectPos3[0] + 40) && 
       mouseY > scenes[currentScene].rectPos4[0] && 
       mouseY < (scenes[currentScene].rectPos4[0] + 40)) {
    var newScene = scenes[currentScene].nextScenes[1];
   if (newScene !== undefined) {
     currentScene = newScene;
   }
 }

 }


//new scene is equal to the current i's next scene which is a number
//if mouse over pink
// var newScene = scenes[i].nextScene[1];
 //nextScenes means clicking a number and it 

//function mouseClicked() {
  //var x = mouseX;
  //var y = mouseY;

  //if (mouseIsPressed && mouseX > rectPos1 && mouseX < rectPos1 +40 && mouseY > rectPos2 && mouseY < rectPos1 +40){
    //console.log("click");
  // var newScene = scenes[currentScene].nextScene[i];
  // console.log(scenes[i]);
  // if (newScene !== undefined) {
  //   currentScene = newScene;
  // }
//}
//}
