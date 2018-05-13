
//FORREST WHITCOMB

//TRANSLATING PROCESSING PONG TO P5.JS

//FEB 05, 2018

//PLaYER 1 : WASD, F
//PLAYER 2 : ARROWS, K 


var ball;
var p1;
var p2;
var p1Score = 0;
var p2Score = 0;

var p1MoveUp = false;
var p1MoveDown = false;
var p1MoveLeft = false;
var p1MoveRight = false;
var p2MoveUp = false;
var p2MoveDown = false;
var p2MoveLeft = false;
var p2MoveRight = false;

var p1Fire = false;
var p2Fire = false;


function setup() {
   
 createCanvas (1000,700);
 ball = new Ball ();
 p1 = new Paddle1();
 p2 = new Paddle2();

}

function draw() {
  
  background(100);
  
  p1.move();
  p2.move();
  ball.move();
  ball.collideW2();
  ball.collideW1();

  fill(255);
  textSize(200);
  text(p1Score, width/2 - 150, 200);
  
  textSize(200);
  text(p2Score, width/2 + 100, 200);

}

//BALL

class Ball{
	constructor() {
	  this.x = width/2;
    this.y = height/2;
    this.dx = 10;  
    this.dy =  random(5,-5);
	}
	move(){
	noStroke();
    fill((random(255,100)),200,200);
    rectMode(CENTER);
    rect(this.x, this.y, 30, 30);
    this.x += this.dx;

    if (this.x < 0) {
      p2Score++;
      this.x = width/2;
      this.y = height/2;
      //make it shoot back at the winner
      this.dx = -this.dx;  
      //maintain speed
      this.dy = random(5,-5);
    }

    if (this.x > width) {
      p1Score++;
      this.x = width/2;
      this.y = height/2;
      //make it shoot back at the winner
      this.dx = -this.dx;  
      //maintain speed
      this.dy = random(5,-5);
    }

    if (this.y < 0 || this.y > height) {
      this.dy *= -1;
      this.y += this.dy;
    } else { 
      this.y += this.dy;
    }
  }

	collideW1() {
    //if (x > p.x && x < p.x) {
    if (this.x > p1.x && this.x < p1.x + p1.pw) {
      if (this.y > p1.y && this.y < p1.y + p1.ph) {
        this.dx = -this.dx;
      }
    }
  } 	

	collideW2() {
    //if (x > p.x && x < p.x) {
    if (this.x > p2.x && this.x < p2.x + p2.pw) {
      if (this.y > p2.y && this.y < p2.y + p2.ph) {
        this.dx = -this.dx;
      }
    }
  } 
}

//PADDLE 1

class Paddle1{
	constructor() {
		
      this.x = 30;
      this.y = height/2;
      this.pw = 15;
      this.ph = 100;
    } 
    
move(){
rectMode(CORNER);
    //a corner mode makes shaping the paddle and collisions more simple
 fill(255);
 rect(this.x, this.y, this.pw, this.ph);
      if (p1MoveUp) {
        this.y-=7;
      } 
      if (p1MoveDown) {
        this.y+=7;
      }
      if (p1MoveLeft) {
        this.x-=7;
      } 
      if (p1MoveRight) {
        this.x+=7;
      }

      if (p1Fire) {
        stroke(255, 0, 0);
        strokeWeight(3);
        line(p1.x+10, p1.y+50, width, p1.y+50);
        if (p1.y + 50 > p2.y && p1.y +50 < p2.y +p2.ph){
          p2.ph = p2.ph/1.1;
        }
        if (p1.y + 50 > 50 && p1.y +50 < 200 ){
          p2Score= p2Score -1;
        }
      }
	}
}

//PADDLE 2

class Paddle2{
	constructor() {
		
      this.y = height/2;
      this.pw = 15;
      this.ph = 100;
      this.x = width-30-this.pw;
    } 
    
move(){
rectMode(CORNER);
    //a corner mode makes shaping the paddle and collisions more simple
 fill(255);
 rect(this.x, this.y, this.pw, this.ph);

      if (p2MoveUp) {
        this.y-=7;
      } 
      if (p2MoveDown) {
        this.y+=7;
      }
      if (p2MoveLeft) {
        this.x-=7;
      } 
      if (p2MoveRight) {
        this.x+=7;
      } 

      if (p2Fire) {
        stroke(0,0,255);
        strokeWeight(3);
        line(p2.x+10, p2.y+50, 0, p2.y+50);
        if (p2.y + 50 > p1.y && p2.y +50 < p1.y +p1.ph){
          p1.ph = p1.ph/1.1;
        }
        if (p2.y + 50 > 50 && p2.y +50 < 200 ){
          p1Score= p1Score -1;
        }   
      }
	}	
}

//KEYS

function keyPressed() {
  
    if (keyCode == UP_ARROW) {
      p2MoveUp = true;
      print('it works');
    }
    if (keyCode == DOWN_ARROW) {
      p2MoveDown = true;
    }
    if (keyCode == LEFT_ARROW) {
      p2MoveLeft = true;
    }
    if (keyCode == RIGHT_ARROW) {
      p2MoveRight = true;
    }
    if (key === 'W') {
      p1MoveUp = true;
      print('so does this');
    }
    if (key === 'S') {
      p1MoveDown = true;
    }
    if (key === 'A') {
      p1MoveLeft = true;
    }
    if (key === 'D') {
      p1MoveRight = true;
    }
    if (key === 'F') {
      p1Fire = true;
    }
    if (key === 'K') {
      p2Fire = true;
    }
}

function keyReleased() {
  
    if (keyCode == UP_ARROW) {
      p2MoveUp = false;
    }
    
    if (keyCode == DOWN_ARROW) {
      p2MoveDown = false;
    }

    if (keyCode == LEFT_ARROW) {
      p2MoveLeft = false;
    }
    if (keyCode == RIGHT_ARROW) {
      p2MoveLeft = false;
    }

    if (key === 'K') {
      p2Fire = false;
    }
  
    if (key === 'W') {
      p1MoveUp = false;
    }
    
    if (key ==='S') {
      p1MoveDown = false;
    }
    if (key === 'A') {
      p1MoveLeft = false;
    }
    if (key ==='D') {
      p1MoveRight = false;
    }
    if (key === 'F') {
      p1Fire = false;
    }
}
