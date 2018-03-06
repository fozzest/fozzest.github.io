//code 02
//wk_05_01

//forrest_whitcomb

//paint w/ data



var paintmarks = [];
var paintDataFile = 'paintData.json';
var co;
var time;

function setup() {
  createCanvas(800, 800);
   img = loadImage("assets/palm.jpg"); 

  image(img, 0, 0);
  image(img, 0, height, img.width, img.height);
  fill(255);
  rect(0,0,width,height);
}

function draw() {
  background(255);
  time = millis();
  time = (time * .001) ; 
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }

}


function PaintMark(position, time, co) {
  this.position = position;
  this.time = time;
  this.co = co;
  this.display = function() {
    noStroke();

    
    var co = img.get(mouseX,mouseY);
    fill(co);
    ellipse(this.position.x, this.position.y, this.time, this.time);
  }

}


function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY), time, co));
}

//html to load

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

//old way of save and loaad
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
        m: paintmarks[i].co, 
        n: paintmarks[i].time        
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}

function loadPaintData() {
  loadJSON(paintDataFile, parsePaintData);
}



function parsePaintData(data) {
  paintmarks = [];
  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y),data[i].co, data[i].time));
  }
}

window.addEventListener("load", onWindowLoaded);