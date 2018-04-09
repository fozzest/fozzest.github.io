// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 8


var weather;
//referencing Daniel Shiffman 10.6 API Query Vid on breaking down API's 
//https://www.youtube.com/watch?v=4UoUqnjUC2c&list=PLRqwX-V7Uu6a-SQiI4RtIwuOrLJGnel0r&index=6
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=d3e8c610b6cb578b006a0fbd36a54820&units=metric';
var input;

var precip = [];

var wTemp;
var wHumidity;
var wVisibility;


function setup() {
  createCanvas(800,800);

  var button = select('#button');
  button.mousePressed(citySwitch);

  input = select('#city');


  for (var i = 0; i < 1000; i++) {
    precip[i] = new Precip(wTemp,wHumidity,wVisibility);
  }
}

function citySwitch(){
  var url = api + input.value() + apiKey;
  loadJSON(url, gotData);
}

function gotData(data){
  console.log(data);
  weather = data;
}

function draw() {
  //background(255, 242, 188);



  if (weather){

    var temp = weather.main.temp;
    var wind = weather.wind.speed;
    var visibility = weather.visibility;
    var cloud = weather.clouds.all;
    var humidity = weather.main.humidity;
    background(255+cloud, 242+cloud, 188+cloud);
     for (var i = 0; i < precip.length; i++) {
    precip[i].update(temp,humidity,visibility);
    precip[i].display(temp,humidity,visibility);
  }
    noStroke();
    fill(255);
    textSize(32);
    text('lon ' + weather.coord.lon, 10, 30);
    text('lat ' + weather.coord.lat, 10, 70);
    //testing based off of shiffman vid
    //ellipse(50,100,temp,temp);
    //ellipse(150,100,humidity,humidity);
    //ellipse(250,100,wind,wind);
  }
}

function Precip(wTemp,wHumidity,wVisibility) {
  
  this.x = random(10*100);
  this.y = random(-500, -50);
  this.pLength = map(10, 0, 20, 10, 20);
  this.speed = map(10, 0, 20, 1, 20);
  //var opacity = map(wVisibility, 0, 10000, 0, 255);

  this.update = function() {
    this.y = this.y + this.speed;
    var grav = map(random(0,20), 0, 20, 0, 0.2);
    this.speed = this.speed + grav;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.speed = map(10, 0, 20, 4, 10);
    }
  }

  this.display = function() {
    var pWide = map(10, 0, 20, 1, 5);
    strokeWeight(pWide);
    //var opacity = map(wTemp, 0, 10010, 0, 255);
    stroke(116, 167, 247,255);
    line(this.x, this.y, this.x, this.y+this.pLength);
  }
  
}

