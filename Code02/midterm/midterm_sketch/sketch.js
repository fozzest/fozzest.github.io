//Forrest Whitcomb

// code 2
// bfa dt
// spring 2018
// w/ bryan ma

// midterm

var sceneState = {
  INTRO: 0,
  LEVEL1: 1,
  LEVEL2: 2,
  LEVEL3: 3,
  LEVEL4: 4,
  END: 5
}

var currentState = sceneState.INTRO;
var sceneData;
var scenesData = [];
var switching = 0;
var keyOn = false;


var sharks;
var bg;
var bgImg;
var diver;
var diverImg;
var gold; 
var goldImg;

var success;
//var millisecond = millis();


function preload(){
  sceneData = loadJSON('scenes.json');
  diverImg = loadImage("assets/diver.png");
  goldImg = loadImage("assets/gold.png");
  bgImg = loadImage("assets/bg.png");
}

function setup() {
createCanvas(800,800);
  //see flappyBird line 25, 
  //http://p5play.molleindustria.org/examples/index.html?fileName=flappyBird.js
  //continuing to gain understanding post-pong project
  diver = new Diver();
  gold = new Group();
  sharks = new Group();

}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false; 
}


function drawScene(scene) {
  switch (currentState){
    case sceneState.INTRO:
        background(0);
        fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Welcome", width/2, height/2-150);
        text("to my hardly working midtern", width/2, height/2-100);
        text("Press Enter to begin", width/2, height/2-50);
        text("Collect the Gold to advance", width/2, height/2);
   
    break;

    case sceneState.LEVEL1:
      image(bgImg, 0,-100, width, height + 100);
      fill(255, 0, 0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(sceneData.scenesData[0].scene, width/2, height - 80);
      //http://p5play.molleindustria.org/examples/index.html?fileName=flappyBird.js
      //flappy bird example helped to show how to spawn objects via for loop 
      if (switching == 0){
        for ( var i = 0; i < sceneData.scenesData[0].sharkNum[0]; i ++){          
          var pos1 = createVector(sceneData.scenesData[0].sharkPos[i].x, 
          sceneData.scenesData[0].sharkPos[i].y);
          createShark(pos1.x , pos1.y, sceneData.scenesData[0].sharkEase[0], sceneData.scenesData[0].sharkSize[0]);
          switching = 1;
        }
      }
      //http://p5play.molleindustria.org/examples/index.html?fileName=sprite4.js
      //struggled to get asset to travel to mouse, currently using an attractionPoint temporarily
      //gold.display(sceneData.scenesData[1].goldX[0], sceneData.scenesData[1].goldY[0]);
      createGold(sceneData.scenesData[0].goldX[0], sceneData.scenesData[0].goldY[0]);
      diver.display();
      diver.attractionPoint(1, mouseX, mouseY); 
      drawSprites(); 

    break;

    case sceneState.LEVEL2:
      image(bgImg, 0,-100, width, height + 100);
      fill(255, 0, 0);
      textSize(30);
      textAlign(CENTER, CENTER);
      text(sceneData.scenesData[1].scene, width/2, height - 80);
      
      if (switching == 1){ 
        for ( var i = 0; i < sceneData.scenesData[1].sharkNum[0]; i ++){
          var pos1 = createVector(sceneData.scenesData[1].sharkPos[i].x, 
          sceneData.scenesData[1].sharkPos[i].y);
          createShark(pos1.x , pos1.y , sceneData.scenesData[1].sharkEase[0], sceneData.scenesData[1].sharkSize[0]);
          switching = 0;
        }
      }
      createGold(sceneData.scenesData[1].goldX[0], sceneData.scenesData[1].goldY[0]);
      diver.display();
      diver.attractionPoint(1, mouseX, mouseY);
      drawSprites(); 

      // if (diver.bounce(gold)) {
      //   success = 2;
      //   }
    
    break;

    case sceneState.LEVEL3:
      image(bgImg, 0,-100, width, height + 100);
      fill(255, 0, 0);
      textSize(40);
      textAlign(CENTER, CENTER);
      text(sceneData.scenesData[2].scene, width/2, height - 80);
      
      if (switching == 0){
        for ( var i = 0; i < sceneData.scenesData[2].sharkNum[0]; i ++){
          var pos1 = createVector(sceneData.scenesData[2].sharkPos[i].x, 
          sceneData.scenesData[2].sharkPos[i].y);
          createShark(pos1.x , pos1.y , sceneData.scenesData[2].sharkEase[0], sceneData.scenesData[2].sharkSize[0]);
          switching = 1;
        }
      }
      createGold(sceneData.scenesData[2].goldX[0], sceneData.scenesData[2].goldY[0]);
      diver.display();
      diver.attractionPoint(1, mouseX, mouseY);
      drawSprites(); 

    
    break;

    case sceneState.LEVEL4:
      image(bgImg, 0,-100, width, height + 100);
      fill(255, 0, 0);
      textSize(50);
      textAlign(CENTER, CENTER);
      text(sceneData.scenesData[3].scene, width/2, height - 80);

      if (switching == 1){
        for ( var i = 0; i < sceneData.scenesData[3].sharkNum[0]; i ++){
          var pos1 = createVector(sceneData.scenesData[3].sharkPos[i].x, 
          sceneData.scenesData[3].sharkPos[i].y);
          createShark(pos1.x , pos1.y , sceneData.scenesData[3].sharkEase[0], sceneData.scenesData[3].sharkSize[0]);
          switching = 0;
        }
      }
      createGold(sceneData.scenesData[3].goldX[0], sceneData.scenesData[3].goldY[0]);
      diver.display();
      diver.attractionPoint(1, mouseX, mouseY);
      drawSprites(); 
      if (diver.bounce(gold)) {
          success ==1;      
        }
        success ==1;
    
    break;

    case sceneState.END:
      background(0);
      fill(255, 0,0);
      textSize(50);
      textAlign(CENTER, CENTER);
      if (success == 1){
      text("You did it, lets play again", width/2, height/2-100);  
      } else{
      text("Let's Go Again", width/2, height/2-100);
      textSize(40);
      text("Press Enter to go again", width/2, height/2+100);
    }

    break;

    default:

    break;
  }
}


function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      if (keyOn) {
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneState.LEVEL1:     
        if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
        if (diver.bounce(gold)) {
          currentState++;
          //found discussion regarding the removal of sprites once state has changed
          //https://github.com/molleindustria/p5.play/issues/7
          gold.removeSprites();
          setUpScene(currentState);      
        }
        //http://p5play.molleindustria.org/docs/classes/Sprite.html#method-bounce
        if (diver.bounce(sharks)) {
          currentState = 5;
          setUpScene(currentState);      
        }
      break;
    case sceneState.LEVEL2:
      if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
         if (diver.bounce(gold)) {
          currentState++;
          gold.removeSprites();
          setUpScene(currentState);      
        }
        if (diver.bounce(sharks)) {
          currentState = 5;
          setUpScene(currentState);      
        }
      break;
    case sceneState.LEVEL3:
      if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
         if (diver.bounce(gold)) {
          currentState++;
          gold.removeSprites();
          setUpScene(currentState);      
        }
        if (diver.bounce(sharks)) {
          currentState = 5;
          setUpScene(currentState);      
        }
      break;
    case sceneState.LEVEL4:
      if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
         if (diver.bounce(gold)) {
          currentState++;
          gold.removeSprites();
          setUpScene(currentState);      
        }
        if (diver.bounce(sharks)) {
          currentState = 5;
          setUpScene(currentState);      
        }
      break;
    case sceneState.END:
      if (keyOn) {
      gold.removeSprites();
      sharks.removeSprites();
       currentState = 0;
          setUpScene(currentState);      
        }
      break;
    default:
      break;
  }
}

function setUpScene(scene){
  switch (scene) {
    case sceneState.INTRO:
      break;
    case sceneState.LEVEL1:
      break;
    case sceneState.LEVEL2:
      break;
    case sceneState.LEVEL3:
      break;
    case sceneState.LEVEL4:
      break;
    case sceneState.END:
      break;
    default:
    break;
  }
}

function keyPressed(){
  if (keyCode === ENTER) {
    keyOn = true;
  }
}
  

function createShark( sharkX, sharkY, sEase, sSize) {

  var newShark = createSprite(sharkX, sharkY);
  var sharkImg  = loadImage("assets/shark.png");

  newShark.addImage(sharkImg);
  //currently broken, need to create update and display functions os this could update iself
  newShark.attractionPoint(sEase, mouseX, mouseY);
  newShark.scale = 0.3 + sSize;
  newShark.setCollider('circle', 0, 0, 50);
  sharks.add(newShark);
  return newShark;
}

//took forever to find a way to move the asset with mouse...
function Diver(){
    this.display = function(){
      diver.posX = width/2;
      diver.posY = height/2;
      diver = createSprite(diver.posY, diver.posX);
      diver.maxSpeed = 10;
      diver.setCollider("circle", 0, 0, 50);
      diver.addImage(diverImg);
      diver.scale = 0.5; 
    }
  }

  function createGold( goldX, goldY) {

  var newGold = createSprite(goldX, goldY);
  var goldImg  = loadImage("assets/gold.png");

  newGold.addImage(goldImg);
  //currently broken, need to create update and display functions os this could update iself
  newGold.scale = 0.5;
  newGold.setCollider('circle', 0, 0, 50);
  gold.add(newGold);
  return newGold;
}

  //   function Gold(){
  //   this.display = function(goldX, goldY){
  //     gold.posX = goldX;
  //     gold.posY = goldY;
  //     gold = createSprite(gold.posY, gold.posX);
  //     gold.setCollider("circle", 0, 0, 60);
  //     gold.addImage(goldImg);
  //     gold.scale = 0.5; 
  //   }
  // }




// function Diver() {
//   diver = createSprite(width/2, height/2);
//   diver.pos = createVector(width/2, height/2);
//   diver.vel = createVector(0, 0);
//   diver.angle = random(TWO_PI);
//   diver.speed = 7;
//   diver.vel.x = 1;
//   diver.vel.y = 1;
//   diver.width = 15;
//   diver.height = 15;
//   diver.setCollider("circle", 0, 0, 30);

//   this.update = function() {

//     diver.pos.add(this.vel);
//   };

//   this.display = function() {

//      diver = createSprite(width/2, height/2);

//      diver.addImage(diverImg, diver.pos + mouseX, diver.pos + mouseY, diver.width, diver.height);
//      diver.scale = 0.5;
//   }
// }

// function Diver() {
   
//   this.width = 50;
//   this.height = 50;
//   this.pos = createVector(width/2,  200);

//   this.update = function() {
//     this.pos.add(this.vel);
//   }

//   this.display = function() {
//     image(diverImg, this.pos.x + mouseX/2, this.pos.y , this.width, this.height);
//   }

// }