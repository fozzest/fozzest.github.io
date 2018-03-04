//code 02
//wk_05_01

//forrest_whitcomb

//paint w/ data



var paintmarks = [];
var paintDataFile = 'paintData.json';
var time;
var mouseSize;

function setup() {
  createCanvas(800, 800);
}

function draw() {

  time = millis();
  time = (time * .05) % 200; 
  mouseSizeize = random(5, 30);
  background(255);
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }

  //fill(0);
  //textSize(24);
  //text("drag the mouse across the canvas to draw.", 50, 570);
  //text("press 'S' to save a json file with the current paint data.", 50, 600);
  //text("press 'L' to load a json file from your computer.", 50, 630);
}

function PaintMark(position, time, mouseSize) {
  this.position = position;
  this.time = time;
  this.mouseSize = mouseSize;

  this.display = function() {
    noStroke();
    for (var k = 0; k <= width; k+=20) {
    for (var j = 0; j <= height; j+=20) {
      
      var r = map(k, 0, width, 0, 255);
      var g = map(j, 0, height, 0, 255);
      
    
    
  }

	}
	}

	fill(r, g, 125);
	stroke(time, time, 0);
    strokeSize(time);
    ellipse(this.position.x, this.position.y, this.mouseSize, this.mouseSize);
}

function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY), time, mouseSize));
}

function onWindowLoaded (event){

	var myButtonSave = document.getElementById("myButtonSave");
	myButtonSave.addEventListener("click", onButtonClickSave);

	var myButtonLoad = document.getElementById("myButtonLoad");
	myButtonLoad.addEventListener("click", onButtonClickLoad);
}



function onButtonClickSave(event){
	savePaintData();
}

function onButtonClickLoad(event){
	loadPaintData();
}

function keyPressed() {
  if (key === 'S') {
    savePaintData();
  }
  if (key === 'L') {
    loadPaintData();
  }
}

function savePaintData() {
  positionsToSave = [];
  for (var i = 0; i < paintmarks.length; i++) {
    positionsToSave.push(
      { 
        x: paintmarks[i].position.x, 
        y: paintmarks[i].position.y, 
        t: paintmarks[i].time,
        s: paintmarks[i].mouseSize
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}

function loadPaintData() {
  loadJSON(paintDataFile, parsePaintData);
}


// creates the new form of the drawing

function parsePaintData(data) {
  paintmarks = [];
  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y),data[i].time, data[i].mouseSize));
  }
}


window.addEventListener("load", onWindowLoaded);