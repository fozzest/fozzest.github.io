// code 2
// bfa dt
// spring 2018
// bryan ma

// midterm


var sceneState = {
  INTRO: 0,
  TUTORIAL: 1,
  GAME: 2,
  WIN: 3,
  LOSE: 4
};

var currentState = sceneState.INTRO;

var keyOn = false;


var diver;
var bubble;
var shark = [];
var bg;
var bubbleImg;
var diverImg; 
var sharkImg; 
var groundImg;
var bgImg;
var easing = 0.05;
var diverMove;

var diverMoveLEFT = false;
var diverMoveRIGHT = false;

var airCounter = 0;


function setup() {
  createCanvas(400,600);

  diverImg = loadImage("assets/diver.png");
  sharkImg = loadImage("assets/shark.png");
  bubbleImg = loadImage("assets/bubble.png");
  bgImg = loadImage("assets/water.png");
  

  diver = new Diver();

  shark = new Shark(random(0,width),height);


}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false;
}

  function drawScene(whichScene) {
  switch (currentState) {
    case sceneState.INTRO:
      background(20,20,20);
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("welcome to the\nDiving Game\n\"press SPACE to continue\"", width/2, height/2);
      break;
    case sceneState.DIRECTIONS:
        var millisecond = millis();
        background(150, 200, 200);
        fill(0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("try to hit a key exactly when\nthe counter hits zero", width/2, height/2)
    case sceneState.GAME:





    image(bgImg, 0,0, width, height);

        //image(sharkImg, 100,height-100, 70,70);
        //image(diverImg, width/2 + diverMove, height/2+200, 50, 50);
        //shark.update();
        //shark.display(50);
        diver.update();
        diver.display();
        fill (255,0,0);
        noStroke();
        rect(50, height-50, width-100 + airCounter, 10);

        var millisecond = millis();
      //text('Milliseconds \nrunning: \n' + millisecond, 5, 40);

        if (millisecond % 1000){
            airCounter= airCounter -.07;
          }

          // if (millisecond % 10000){
          //   shark.push(new Shark(random(0,width), height));
          // }

        for (var i = 0; i < shark.length; i++) {
          shark[i].update();
         }
       for (var i = 0; i < shark.length; i++) {
          shark[i].display();
           }






      break;
      default:
      break;

    }

  }

  function newShark() {
  var millisecond = millis();
  if (millisecond % 1000){
        shark.push(new Shark(random(0,width), height/2));
        console.log("new");
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
    case sceneState.TUTORIAL:
      if (keyOn) {
        if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
      }
      break;
    case sceneState.GAME:
      if (airCounter == -50) {
         {
          currentState = sceneState.INTRO;      
        
        setUpScene(currentState);
      }
    }
      break;
    default:
      break;
  }
}


function setUpScene(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      break;
    case sceneState.TUTORIAL:
      break;
    case sceneState.GAME:
      break;
    default:
      break;
  }
}

function keyPressed() {
  keyOn = true;
}



function Diver() {
  
  this.width = 50;
  this.height = 50;
  this.pos = createVector(width/2,  200);
  

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {

    image(diverImg, this.pos.x + mouseX/2, this.pos.y , this.width, this.height);
  }
}

 // function Shark(sharkX, sharkY) {

 //    this.dx;
 //    this.dy = -3;

 //   this.width = 50;
 //   this.height = 50;
 //   this.pos = createVector(width/2, height/2 +200);
  

 //   this.update = function() {
 //     this.sharkY += this.dy;
 //   }

 //   this.display = function() {
    
 //    //image(sharkImg, 100,height-100, 70,70);
 //    image(sharkImg, sharkX, sharkY, this.width, this.height);

    
    
 //    }
 //   }
 

  function Shark(sharkX, sharkY) {
     this.speed = 1;
     this.angle = 0;
     this.vel = 1;

     this.width = 50;
     this.height = 50;
     this.pos = createVector(this.sharkX, this.sharkY);
     this.update = function() {
  
     this.vel.y =  this.speed;
     this.pos.add(this.vel);
   }

     this.display = function() {
     fimage(sharkImg, this.sharkX, this.sharkY, this.width, this.height);
   }
 }



  
  

