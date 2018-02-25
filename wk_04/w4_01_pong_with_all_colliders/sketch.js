// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 4
// pong with all colliders

var ball;
var p1, p2;
var p1Score = 0;
var p2Score = 0;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;
var paddleBounceSFX, hitColliderSFX;
var colliders = [];

var colliding;

var sceneState = {
  INTRO: 0,
  TUTORIAL: 1,
  GAME: 2,
  WIN: 3,
  LOSE: 4
};

var currentState = sceneState.INTRO;

var mouseOn = false;
var tutorialTimer;
var gameTimer;
var gameTimePressed;
const timeForTutorial = 3000;
const timeForGame = 5000;



function preload() {

}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  paddleBounceSFX = loadSound('assets/ballCollide.mp3', function() { console.log("loaded"); });
  hitColliderSFX = loadSound('assets/hitCollider.mp3', function() { console.log("loaded"); });
  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  drawCollide(currentCollider);
  checkLevelUP(currentCollider);
  mouseOn = false;
  colliding = false;
}



function drawField() {
  stroke(255);
  noFill();
  line(0, margin, width, margin);
  line(0, height - margin, width, height - margin);
  for (var i = margin; i < height - margin - 15; i += 35) {
    var start = i;
    var finish = start + 15;
    line(width/2, start, width/2, finish);
  }

  fill(255);
  noStroke();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(p1Score, width/2-50, 70);
  text(p2Score, width/2+50, 70);
}




function drawScene(whichScene) {
  switch (currentState) {
    case sceneState.INTRO:
      background(0);
      fill(255);
      textSize(80);
      textAlign(CENTER, CENTER);
      text("Welcome to Pong", width/2, height/2);
      textSize(50);
      text("press the mouse to continue", width/2, height/2 + 120);
      break;
    case sceneState.TUTORIAL:
      if (millis() > tutorialTimer + timeForTutorial) {
        background(0);
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("use the W and S, or the Up and Down Arrows to move", width/2, height/2);

        textSize(24);
        text("win by hitting the ball behind the opposition", width/2, height/2 + 120);
        
      } else {
        background(0);
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("use the W and S, or the Up and Down Arrows to move", width/2, height/2);

        textSize(24);
        text("win by hitting the ball behind the opposition", width/2, height/2 + 120);
      }
      break;
    case sceneState.GAME:
        everything();
      break;
    case sceneState.WIN:
      background(0);
      fill(0);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("You WIN!\n" , width/2, height/2 - 70);
      textSize(24);
      text("Press any key to return to title", width/2, height - 100);
      fill(255);
      textSize(64);
      text("You WIN!\n", width/2 + 5, height/2 - 75);
      textSize(24);
      text("Press mouse to return to title", width/2 + 2, height - 102);
      break; 
    case sceneState.LOSE:
      background(0);
      fill(255);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("You lose...\n" + "result: " + gameTimePressed, width/2, height/2);
      textSize(24);
      text("Press mouse to try again", width/2, height - 100);
    default:
      break;
  }
}

function everything() {
  background(0);
  drawField();

  p1.move(p1Up, p1Down);
  p2.move(p2Up, p2Down);

  ball.update();
  p1.update();
  p2.update();
  for (var i = 0; i < colliders.length; i++) {
    colliders[i].update();
  }

  p1.display();
  p2.display();

  for (var i = 0; i < colliders.length; i++) {
    colliders[i].display();
  }

  ball.display(); 

  checkCollisionWithBall(ball, p1);
  checkCollisionWithBall(ball, p2);

  for (var i = 0; i < colliders.length; i++) {
    checkCollisionWithBall(ball, colliders[i]);
  }

//   if (p1Score >= 5 || p2Score >= 5) {
//     colliders.push(new Bryan());

// }

}



function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      if (mouseOn) {
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneState.TUTORIAL:
        if (mouseOn) {
          currentState++;
          setUpScene(currentState);      
        }
      break;
    case sceneState.GAME:

    //if the ball hits a crtain amount of times, queue another collider
    //if score +1 (aka point lost), some colliders exit
    //idea is that as score increases, as well as paddle hits, colliders increase
      


      if (p1Score >= 10 || p2Score >= 10) {

          currentState = sceneState.WIN;      
        
        setUpScene(currentState);
      }
      break;
    case sceneState.WIN:
      if (mouseOn) {
        p1Score = 0;
        p2Score =0;
        currentState = sceneState.INTRO;
        setUpScene(currentState);
      }
      break;
    case sceneState.LOSE:
      if (mouseOn) {
        currentState = sceneState.GAME;
        setUpScene(currentState);
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
    case sceneState.END:
      break;
    default:
      break;
  }
}

function mousePressed() {
  mouseOn = true;
}






//Colliders State Machine
var currentCollider = collideState.ZERO;

var collideState = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8
};

function drawCollide(whichCollide) {
  switch (currentCollider) {
    case collidetate.ZERO:
      colliders.push(new Bryan());
      break;
    case collideState.ONE:
      colliders.push(new Yizhou());
      break;
    case collideState.TWO:
      colliders.push(new Ellie());
      break;
    case collideState.THREE:
      colliders.push(new Yanwen());
      break; 
    case collideState.FOUR:
      colliders.push(new MaddyRed());
      colliders.push(new MaddyGreen());
      colliders.push(new MaddyBlue());
        break;
    case collideState.FIVE:
      colliders.push(new AlyssaForrest());
        break;
    case collideState.SIX:
      colliders.push(new Sarah());
        break;
    case collideSTATE.SEVEN:
    colliders.push(new Jackie());
        break;
    case collideSTATE.EIGHT:
      colliders,push(new Cat());
    default:
      break;
  }
}

function checkLevelUP(whichCollide) {
  switch (whichCollide) {
      case collidestate.ZERO:
      if (p1Score>=1 || p2Score >=1){
        currentState++;
        setUpCollider(currentCollider);
      }
      break;
    case collideState.ONE:
      if (p1Score>=2 || p2Score >=2){
        currentState++;
        setUpCollider(currentCollider);
      }
      break;
    case collideState.TWO:
      if (p1Score>=3 || p2Score >=3){
        currentState++;
        setUpCollider(currentCollider);
      }
      break;
    case collideState.THREE:
      if (p1Score>=4 || p2Score >=4){
        currentState++;
        setUpCollider(currentCollider);
      }
      break; 
    case collideState.FOUR:
      if (p1Score>=5 || p2Score >=5){
        currentState++;
        setUpCollider(currentCollider);
      }
        break;
    case collideState.FIVE:
      if (p1Score>=6 || p2Score >=6){
        currentState++;
        setUpCollider(currentCollider);
      }
        break;
    case collideState.SIX:
      if (p1Score>=7 || p2Score >=7){
        currentState++;
        setUpCollider(currentCollider);
      }
        break;
    case collideSTATE.SEVEN:
    if (p1Score>=8 || p2Score >=8){
        currentState++;
        setUpCollider(currentCollider);
      }
        break;
    case collideSTATE.EIGHT:
      if (p1Score>=9 || p2Score >=9){
        currentState++;
        setUpCollider(currentCollider);
      }
    default:
      break;
  }
}


function setUpCollider(whichCollide) {
 switch (currentCollider) {
    case collidetate.ZERO:
      
      break;
    case collideState.ONE:
      
      break;
    case collideState.TWO:
      
      break;
    case collideState.THREE:
      
      break; 
    case collideState.FOUR:
     
        break;
    case collideState.FIVE:
      
        break;
    case collideState.SIX:
      
        break;
    case collideSTATE.SEVEN:
    
        break;
    case collideSTATE.EIGHT:
      
    default:
      break;
  }
}









function Yang() {
  this.pos = createVector(width/2, height/2);
  this.speed = 5;
  this.angle = 0;
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 100;
  this.height = 100;
 
  

  this.update = function() {
    this.angle = (this.angle + 0.05) % TWO_PI;
    this.vel.x = cos(this.angle) * this.speed;
    this.vel.y = sin(this.angle) * this.speed;
    this.pos.add(this.vel);


  }

  this.display = function(b,p) {
    stroke(255);
    if(p1Score>10 || p2Score>10){
    fill(255,0,0,50);
  } else {
    fill(255,20);
  }
    
  ellipse(width/2,height/2, b.pos.y-b.size/2, b.pos.y-b.size/2);
  fill(color(map(sin(this.angle), -1, 1, 0, 255), map(cos(this.angle), -1, 1, 0, 255), random(20,40),130));
  triangle(width/2,height/2,p.pos.x+p.width/2, p.pos.y+p.height/2,b.pos.x+b.size/2, b.pos.y+b.size/2);
    // stroke(255);
    // fill(255,10);
    // ellipse(width/2,height/2, b.pos.y+b.height/2, b.pos.y+b.height/2);
    // fill(color(map(sin(this.angle), -1, 1, 0, 255), map(cos(this.angle), -1, 1, 0, 255), 1,100));
    // triangle(width/2,height/2,p.pos.x+p.width, p.pos.y+p.height/2,ball.pos.x+ball.width/2, ball.pos.y+ball.height/2);
  }
  this.collided = function(b) {
    var d = dist(b.pos.x,b.pos.y,width/2,height/2);
     if(d < (b.pos.y-b.size/2)/2){
     

      for (var i =0; i <= b.pos.y-b.size/2; i+=15) {
        background(random(0,255),255-d,d+200,5);
        for(var j =10; j<=255; j+=15){

          stroke(random(0,j),random(255-j,j),i,240);
          noFill();
          ellipse(width/2,height/2,i,i);

        }}

      // var a = b.pos.x;
      // var b = b.pos.y;
      // // ellipse(a,b,50,50);
      
      
     }}


  


    // do something cool here! do something to yourself,
    // and also something to the other thing?
  }