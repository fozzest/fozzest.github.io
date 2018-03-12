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
var ground;
var shark;
var bg;
var gameOver;
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
  //groundImg = loadImage("assets/flappy_ground.png");
  bgImg = loadImage("assets/water.png");
  

  diver = new Diver();

  shark = new Shark();

  
  
  

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
        shark.update();
        shark.display(50);
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





 function Shark() {
  
   this.width = 50;
   this.height = 50;
   this.pos = createVector(width/2, height/2 +200);
  

   this.update = function() {
     this.pos.add(this.vel);
   }

   this.display = function(sharkX) {
    var sharkY = 0;
    //image(sharkImg, 100,height-100, 70,70);
    image(sharkImg, sharkX, this.pos.y + sharkY , this.width, this.height);

    
    if (this.pos.y < height){
      sharkY = 5;
    }
    }
   }
 



  
  



// function keyPressed() {
//   if (keyCode === LEFT_ARROW) {
//     diverMoveLEFT = true;
//   } else if (keyCode === RIGHT_ARROW) {
//     diverMoveRight = true;
//   }
// }


// function keyReleased() {
//   if (keyCode === LEFT_ARROW) {
//     diverMoveLEFT = false;
//   } else if (keyCode === RIGHT_ARROW) {
//     diverMoveRight = false;
//   }
// }

//   if(gameOver && keyWentDown("x"))
//     newGame();

//   if(!gameOver) {

//     if(keyWentDown("x"))
//       bird.velocity.y = FLAP;
    
//     bird.velocity.y += GRAVITY;
    
//     if(bird.position.y<0)
//       bird.position.y = 0;
    
//     if(bird.position.y+bird.height/2 > GROUND_Y)
//       die();

//     if(bird.overlap(pipes))
//       die();

//     //spawn pipes
//     if(frameCount%60 == 0) {
//       var pipeH = random(50, 300);
//       var pipe = createSprite(bird.position.x + width, GROUND_Y-pipeH/2+1+100, 80, pipeH);
//       pipe.addImage(pipeImg);
//       pipes.add(pipe);

//       //top pipe
//       if(pipeH<200) {
//         pipeH = height - (height-GROUND_Y)-(pipeH+MIN_OPENING);
//         pipe = createSprite(bird.position.x + width, pipeH/2-100, 80, pipeH);
//         pipe.mirrorY(-1);
//         pipe.addImage(pipeImg);
//         pipes.add(pipe);
//       }
//     }

//     //get rid of passed pipes
//     for(var i = 0; i<pipes.length; i++)
//       if(pipes[i].position.x < bird.position.x-width/2)
//         pipes[i].remove();
//   }

//   camera.position.x = bird.position.x + width/4;

//   //wrap ground
//   if(camera.position.x > ground.position.x-ground.width+width/2)
//     ground.position.x+=ground.width;

//   background(247, 134, 131); 
//   camera.off();
//   image(bgImg, 0, GROUND_Y-190);
//   camera.on();

//   drawSprites(pipes);
//   drawSprite(ground);
//   drawSprite(bird);
// }

// function die() {
//   updateSprites(false);
//   gameOver = true;   
// }

// function newGame() {
//   pipes.removeSprites();
//   gameOver = false;
//   updateSprites(true);
//   bird.position.x = width/2;
//   bird.position.y = height/2;
//   bird.velocity.y = 0;
//   ground.position.x = 800/2;
//   ground.position.y = GROUND_Y+100;
// }

// function mousePressed() {
//   if(gameOver)
//     newGame();
//   bird.velocity.y = FLAP;
// }