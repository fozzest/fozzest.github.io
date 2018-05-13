//Forrest Whitcomb

// code 2
// bfa dt
// spring 2018
// w/ bryan ma

// final

var sceneState = {
  START: 0,
  LEVEL1: 1,
  LEVEL2: 2,
  LEVEL3: 3,
  LEVEL4: 4,
  END: 5
}

var currentState = sceneState.START;
var sceneData;
var scenesData = [];
var switching = 0;
var keyOn = false;


var titleImg;

var success;


var xspacing = 16;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  

google.load('visualization', '1', {packages: ['columnchart']});

      function initMap() {
        
        var path = [
            {lat: 36.579, lng: -118.292},  
            {lat: 36.606, lng: -118.0638},  
            {lat: 36.433, lng: -117.951},  
            {lat: 36.588, lng: -116.943},  
            {lat: 36.34, lng: -117.468},  
            {lat: 36.24, lng: -116.832}];  

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: path[1],
          mapTypeId: 'terrain'
        });

        
        var elevator = new google.maps.ElevationService;

        
        displayPathElevation(path, elevator, map);
      }

      function displayPathElevation(path, elevator, map) {
        // Display a polyline of the elevation path.
        new google.maps.Polyline({
          path: path,
          strokeColor: '#0000CC',
          strokeOpacity: 1,
          map: map
        });


        elevator.getElevationAlongPath({
          'path': path,
          'samples': 256 //defines how many data pointts will be held
        }, plotElevation);
      }

      function plotElevation(elevations, status) {
        var chartDiv = document.getElementById('elevation_chart');
        

        var chart = new google.visualization.ColumnChart(chartDiv);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < elevations.length; i++) {
          data.addRow(['', elevations[i].elevation]);
        }

        chart.draw(data, {
          height: 150,
          legend: 'none',
          titleY: 'Elevation (m)'
        });
      }


function setup() {


  var doc = document.body;
  createCanvas(800,500);
  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  var buttonSteep = document.createElement('button');
            buttonSteep.innerHTML = "Mountains";
            buttonSteep.id = 'buttonSteep';
            buttonSteep.style = "width: 100px; height: 55px; text-align: center;  font-size:12px; color: black; background-color: white; border: 2px solid #7a7a7a;";
            doc.appendChild(buttonSteep);


}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false; 
}


function drawScene(scene) {
  switch (currentState){
    case sceneState.START:
    background(0,255,0);
    calcWave();
    renderWave();

 
        
        ////
 
   
    break;

    case sceneState.LEVEL1:
    background(0);
    calcWave();
    renderWave();

    

    

    break;

    case sceneState.LEVEL2:
      
    background(255);
    calcWave();
    renderWave();
    
    break;

    case sceneState.LEVEL3:
    
    ////
    
    break;

    case sceneState.LEVEL4:
     
        ////
    
    break;

    case sceneState.END:
      /////

    break;

    default:

    break;
  }
}


function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.START:
    
    buttonSteep.onclick = function() {
        console.log("pressed");
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneState.LEVEL1:     
       
       ///certain button pressed

      break;
    case sceneState.LEVEL2:
      
        ///certain button pressed

      break;
    case sceneState.LEVEL3:
      
        ///certain button pressed

      break;
    case sceneState.LEVEL4:
     
        ///certain button pressed

      break;
    case sceneState.END:
      
///button for more info?

      break;
    default:
      break;
  }
}

function setUpScene(scene){
  switch (scene) {
    case sceneState.START:
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


function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*xspacing, height/2+yvalues[x], 16, 16);
  }
}

