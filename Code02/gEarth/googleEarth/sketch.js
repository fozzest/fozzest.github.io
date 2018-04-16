
//Forrest Whitcomb
//Code 02 Spring 2018
//wk 09

var map;
var home;
var journal = '<input id="textarea" type="text" name="fname">Write about this place<br>';
var myLatlng = {lat: -34.397, lng: 150.644};
var newLat = 55.749792;
var newLng = 37.632495;
var sceneData;

var canvas;

function setup() {
sceneData = loadJSON('markers.json');
  initMap();
  head = createElement('h1', 'Google Maps Exploration: See where I have lived, and click to add your own homes');
  tStyles();
  button = createButton('visit a home');
  button1 = createButton('visit a home');
  bStyles();
  button.mousePressed(on);
  button1.mousePressed(on);
  canvas = createCanvas(2000, 2000); 
}

function update() {

}

function tStyles(){
    head.style('font-family', 'Arial','Heavy', 'sans-serif');
    head.style('text-align', 'center');
    head.style('padding', '50px');
    head.style('color', '#2f3b4f');
}

function bStyles(){
	button.style('font-family', 'Arial Black','Heavy', 'sans-serif');
  	button.style('padding', '10px');
  	button.style('background-color', '#ffffff');
  	button.style('text-align', 'center');
  	button.style('font-size', '10px');
  	button.style('color', '#2f3b4f');
  	button1.style('font-family', 'Arial Black','Heavy', 'sans-serif');
  	button1.style('padding', '10px');
  	button1.style('text-align', 'center');
  	button1.style('font-size', '10px');
  	button1.style('color', '#2f3b4f');
  	button1.style('background-color', '#ffffff');
}



function initMap() {
var myLatlng = {lat: -34.397, lng: 150.644};
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(-34.397,150.644),
    zoom: 8,
  });


//used geoJSON.io to quickly make geoJSON that could be imported to the map in one line of code
//http://geojson.io/#map=16/-37.8287/-214.9433
  map.data.loadGeoJson('markers.json');

  map.addListener('click', function(e) {
    newMarker(e.latLng, map);
  });
}

//Animation, Marker via https://developers.google.com/maps/documentation/javascript/markers
function newMarker(latLng, map) {
var houseImg  = "assets/house.png"; 		
  var marker = new google.maps.Marker({
    position: latLng,
    animation: google.maps.Animation.DROP,
    map: map,
    icon: houseImg
  });

  //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
  //"infoWindown google map"
 var infowindow = new google.maps.InfoWindow({
          content: journal
  });

  marker.addListener('click', function() {
  infowindow.open(map, marker);
  });
}

function bounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}





//https://stackoverflow.com/questions/28499141/how-to-change-google-map-center-by-clicking-a-button

function newLocation(newLat,newLng){
	map.setCenter({
		lat : newLat,
		lng : newLng
	});
}


function on(){
	var r = random(0,7);
	map.setCenter(sceneData.features[r].geometry.coordinates[0], sceneData.features[r].geometry.coordinates[1]);
	//newLocation(sceneData.features[random].geometry.coordinates[0], sceneData.features[random].geometry.coordinates[1]);
}

//sceneData.features.geometry.coordinates[0], features.geometry.coordinates[1]

function onGOOD(){
	newLocation(-55.749792,-37.632495);
}

// function onClick01(){
// 	newLocation(55.749792,37.632495);
// }


//go to new location
//random length in the JSON (1,5)
//select the specific coordinate part of the geoJSON
// new location are these coordinates, called randomly every time button pressed



//   function buttonPressed(newLat,newLng){
// 	home = random(1,5);
// 	map.setCenter({
// 		lat : newLat,
// 		lng : newLng
// 	});
// 	console.log ('click');
// }


